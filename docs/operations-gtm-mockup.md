# Operations-led website review

A complete eleven-page concept based on the campaign branch `gtm/org-age-landing-pages`. All review routes are under `/preview/operations/`; existing site routes remain unchanged.

The primary promise is responsibility for getting a valuable operation working reliably. Engagements start around $20K per month, with a roughly two-month first build as an illustrative entry. Team delivery is emphasized; intelligent data, software, and organization explain the approach.

Pages: homepage, engagements, approach, work index, Fountain Creek case, Steering House case, anonymized media case, about, forthcoming book, interactive project brief, and contact.

Cases distinguish delivered work from proposed expansion. The media case attributes partner delivery and keeps the client anonymous. Detailed internal commercial evidence is maintained separately in the private book repository.

## Review behavior

Navigation, FAQ disclosures, mobile menu, form previews, and project-brief download are implemented. Forms do not send, subscribe, store, or schedule. The new routes contain no analytics. The book page describes a proposed reading journey and does not host the manuscript.

## Build and preview

Run `mise run lint` and `mise run test`. Then run `mise exec -- node scripts/build-operations-preview.mjs` to produce `dist-operations-preview/` containing only the new review pages and their assets. This excludes the rest of the site, CNAME, and internal documentation. Preview exports are marked noindex.

Publish this isolated output to a separate pgs.sh project using the repository's established rsync deployment method. Do not use the production project or the existing shared preview name for this review.

Production enquiry handling, scheduling, consented email delivery, and conversion tracking remain subsequent integration work. Confirm commercial terms and case wording before moving the concept into production.
