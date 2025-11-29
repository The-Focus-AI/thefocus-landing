---
title: "Search 10,000 Images in Under 100ms: Vector-Powered Visual Discovery"
industry: Media / Content Management
client: Internal Platform
year: "2025"
timeline: "4 weeks"
services: "Development"
description: We built Image Browser — a natural language image search system that lets users find images by describing what they're looking for. Instead of manually tagging thousands of photos, CLIP embeddings understand visual content automatically, enabling instant semantic search across entire image libraries.
results: |-
  - Sub-100ms search latency across 10,000+ images
  - Zero manual tagging required — AI understands image content
  - Multi-collection architecture supports unlimited datasets
  - 768-dimensional vectors capture visual semantics
tech_stack: "Node.js, TypeScript, Express, PostgreSQL + pgvector, Cloudflare R2, Replicate CLIP API, Docker"
testimonial: "I uploaded 8,000 photos and could immediately search for 'sunset over water' or 'people laughing at a party' — no tagging, no organization, it just works. Finding the right image went from 10 minutes of scrolling to 2 seconds of typing."
testimonial_person: "Internal User"
testimonial_company: "Focus.AI"
published: true
image: image-browser_wide.png
---

### The Challenge

Image libraries grow faster than anyone can organize them. A photographer shoots 500 photos at an event. A marketing team accumulates thousands of product shots. A researcher collects tens of thousands of reference images. The collection grows, but findability collapses.

**The traditional approaches fail at scale:**

1. **Manual tagging** — Works for 100 images. Becomes a full-time job at 10,000. And tags are only as good as the person who added them — search for "happy" and miss the image tagged "joyful."

2. **Folder organization** — Forces single-hierarchy thinking. An image of a red car at sunset belongs in Cars? Sunsets? Red things? The answer is all three, but folders demand a choice.

3. **Filename search** — Requires disciplined naming conventions that nobody maintains. "IMG_4523.jpg" tells you nothing.

**What we needed:** A system that understands what's *in* the image, not what someone decided to call it. Search for "dog playing in snow" and find it — whether it was tagged, named, or just uploaded and forgotten.

### Our Approach

We built on **CLIP** (Contrastive Language-Image Pre-training), OpenAI's model that learns visual concepts from natural language descriptions. CLIP maps both images and text into the same 768-dimensional vector space — if an image and a text description are semantically similar, their vectors are close together.

**The key insight:** Instead of making users describe images in the system's vocabulary (tags), let the system understand the user's vocabulary (natural language).

The architecture splits into two independent components:

1. **Syncer** — Uploads images to cloud storage and generates CLIP embeddings via Replicate's API
2. **Server** — Provides a web interface for browsing and searching using vector similarity

This separation means ingestion can run on a local machine, cron job, or scheduled container — while the search server runs on any web platform. Different scaling concerns, different deployment patterns.

### Technical Implementation

#### Vector Storage with pgvector

PostgreSQL's pgvector extension stores 768-dimensional vectors as a native column type and enables similarity search using specialized indexes:

```sql
CREATE TABLE photos_embeddings (
  id SERIAL PRIMARY KEY,
  r2_key TEXT UNIQUE NOT NULL,
  embedding vector(768),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- HNSW index for approximate nearest neighbor search
CREATE INDEX ON photos_embeddings
  USING hnsw (embedding vector_ip_ops)
  WHERE embedding IS NOT NULL;
```

**Why HNSW?** Hierarchical Navigable Small World graphs provide logarithmic search complexity. For 10,000 images, that's the difference between checking every vector (slow) and navigating a graph structure (fast). Search latency stays under 100ms regardless of collection size.

**Inner product distance:** We use `<#>` (negative inner product) rather than cosine distance. For normalized CLIP vectors, this is mathematically equivalent but faster to compute.

#### Multi-Bucket Architecture

Each image collection gets its own database table, automatically namespaced by the R2 bucket name:

```
R2 Bucket: "product-photos"  → Table: "product_photos_embeddings"
R2 Bucket: "event-gallery"   → Table: "event_gallery_embeddings"
R2 Bucket: "training-data"   → Table: "training_data_embeddings"
```

This enables:
- **Multi-tenant deployments** — Multiple clients in one database
- **Independent lifecycle** — Delete a collection without affecting others
- **Selective syncing** — Run syncers for specific buckets on different schedules

The server accepts a query parameter to switch collections, serving multiple datasets from a single deployment.

#### Embedding Pipeline

The syncer runs in two phases:

**Phase 1: Upload**
```
Local directory scan
    ↓
Filter: .jpg, .jpeg, .png, .gif, .webp (skip already-uploaded)
    ↓
Parallel upload to R2 (8 concurrent by default)
    ↓
Insert DB rows with NULL embedding
```

**Phase 2: Embed**
```
Query: SELECT * FROM embeddings WHERE embedding IS NULL LIMIT 100
    ↓
Download images from R2
    ↓
Call Replicate CLIP API (3 concurrent, with retry/backoff)
    ↓
UPDATE embeddings SET embedding = $1 WHERE id = $2
    ↓
Repeat until no NULL embeddings remain
```

The separation means interrupted jobs resume gracefully — uploads don't re-upload, embeddings pick up where they left off.

#### Resilience Patterns

**API rate limiting:** Replicate returns 429 when overloaded. We implement exponential backoff:

```typescript
const RETRY_DELAYS = [500, 1000, 2000, 4000]; // ms

async function embedWithRetry(imageUrl: string): Promise<number[]> {
  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    try {
      return await replicate.embed(imageUrl);
    } catch (err) {
      if (isRetryable(err) && attempt < RETRY_DELAYS.length) {
        await sleep(RETRY_DELAYS[attempt]);
        continue;
      }
      throw err;
    }
  }
}
```

**Database connection recovery:** PostgreSQL connections drop during deployments or network blips. We detect termination codes (`57P01`, `08006`) and reconnect automatically.

#### Search Interface

The web UI provides three discovery modes:

1. **Text Search** — Type a description, get matching images
   ```
   User: "mountains at golden hour"
       ↓
   CLIP text encoder → 768D query vector
       ↓
   SELECT * FROM embeddings
   ORDER BY embedding <#> $query_vector
   LIMIT 30
   ```

2. **Visual Neighbors** — Click any image to find similar ones
   ```
   Click image with ID 4523
       ↓
   SELECT embedding FROM embeddings WHERE id = 4523
       ↓
   SELECT * FROM embeddings
   ORDER BY embedding <#> $image_vector
   LIMIT 30
   ```

3. **Browse Recent** — Scroll through latest uploads
   ```
   SELECT * FROM embeddings
   ORDER BY created_at DESC
   LIMIT 30 OFFSET $page
   ```

The frontend uses a responsive masonry layout that works on desktop and mobile, with lazy loading for smooth scrolling through large result sets.

### What Made This Work

**1. CLIP's semantic understanding.** The model captures abstract concepts, not just objects. Search for "cozy" and find warm-lit interiors. Search for "energetic" and find action shots. This semantic richness is impossible with manual tags.

**2. Approximate nearest neighbor indexes.** Without HNSW, vector search is O(n) — every query scans every row. With HNSW, it's O(log n). This is the difference between "works for demos" and "works in production."

**3. Cloud-native simplicity.** No GPU servers to manage. Replicate handles CLIP inference. R2 handles storage. Supabase handles PostgreSQL + pgvector. The entire system runs on serverless-friendly platforms.

**4. Separation of sync and serve.** The syncer can run locally during development, on a cron job in production, or as a one-time batch job for imports. The server is a stateless web service that scales horizontally.

**5. Progressive enhancement.** Images are browsable immediately after upload (null embeddings). Search becomes available as embeddings complete. A real-time stats widget shows progress — users know the system is working.

### Results

The system now powers internal image discovery:

| Metric | Value |
|--------|-------|
| Search latency | <100ms (10k images) |
| Embedding throughput | ~60 images/minute (Replicate API) |
| Storage cost | ~$0.015/GB/month (R2) |
| Database overhead | ~3KB per image (metadata + vector) |
| Index build time | ~30 seconds for 10k vectors |

**The user experience transformation:**

| Before | After |
|--------|-------|
| Scroll through folders hoping to spot the right image | Type what you're looking for |
| Maintain tagging discipline across team | Zero tagging required |
| "I know I have a photo of..." → 10 minutes searching | 2 seconds |
| Find one good image, miss the similar alternatives | Click "find similar" to see neighbors |

### Technical Summary

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Storage** | Cloudflare R2 | S3-compatible object storage for images |
| **Database** | PostgreSQL + pgvector | Vector storage and similarity search |
| **Embeddings** | Replicate CLIP API | Text and image encoding to 768D vectors |
| **Server** | Express.js, TypeScript | Web interface and search API |
| **Syncer** | Node.js CLI | Upload and embedding pipeline |
| **Indexing** | HNSW | Approximate nearest neighbor search |
| **Deployment** | Docker, Fly.io | Container-based hosting |

### Use Cases Beyond Photo Search

The same architecture applies wherever visual similarity matters:

- **E-commerce** — "Show me dresses like this one" without manual style tagging
- **Design systems** — Find components that look similar across a UI library
- **Medical imaging** — Surface similar cases from historical scans
- **Quality control** — Detect anomalies by finding images that don't match expected patterns
- **Content moderation** — Flag images similar to known problematic content

The core insight — that CLIP embeddings capture semantic similarity, not just pixel similarity — makes this approach powerful across domains.
