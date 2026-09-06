# Operations-led website review

A complete eleven-page concept based on the campaign branch `gtm/org-age-landing-pages`. All review routes are under `/preview/operations/`; existing site routes remain unchanged.

The primary promise is responsibility for getting a valuable operation working reliably. Engagements start around $20K per month, with a roughly two-month first build as an illustrative entry. Team delivery is emphasized; intelligent data, software, and organization explain the approach.

Pages: homepage, engagements, approach, work index, Fountain Creek case, Steering House case, anonymized media case, about, forthcoming book, interactive project brief, and contact.

Cases distinguish delivered work from proposed expansion. The media case attributes partner delivery and keeps the client anonymous. Detailed internal commercial evidence is maintained separately in the private book repository.

## Review behavior

Navigation, FAQ disclosures, mobile menu, form previews, and project-brief download are implemented. Forms do not send, subscribe, store, or schedule. The new routes contain no analytics. The book page describes a proposed reading journey and does not host the manuscript.

## Build and preview

Run `mise run lint` and `mise run test`. Then run `mise exec -- node scripts/build-operations-preview.mjs` to produce `dist-operations-preview/` containing only the new review pages and their assets. This excludes the rest of the site, CNAME, and internal documentation. Preview exports are marked noindex.

The current review uses owner-only Sites hosting. Update that existing preview from the isolated export; do not publish its client-case content publicly or replace production.

Production enquiry handling, scheduling, consented email delivery, and conversion tracking remain subsequent integration work. Confirm commercial terms and case wording before moving the concept into production.

## Swiss design and conversion priorities — September 6

The campaign uses the existing Swiss/editorial direction from `consultancy-landing-v11.html`: paper, ink, Inter with Sorts Mill Goudy, strong grids, and red/blue/yellow section treatments. Preserve this while iterating on the offer.

Priority order: consulting revenue; book-led email acquisition; useful email content that creates future sales. The Org Age framing remains central. Consulting is prominent in navigation and the homepage hero, with engagements from $20K/month. Book signup is a clear second path, supported by actual content.

The review now has 15 pages, including three chapter-excerpt pages and a download page. The excerpts preserve selected prose from public source parts I, II, and V, exported from the book repo by `editorial/operations-edition/export-web-excerpts.mjs`. These are book acquisition pages requested for the campaign, not a new blog. Original publication links and authorship are retained.

Book forms validate an email and demonstrate the acquisition journey; no email is saved, sent, or subscribed. The private preview provides a real download of the current 133-page working edition. This is distinct from the next editorial revision. The public source repository contains no PDF.

For the owner-only preview, build with `PUBLIC_BOOK_DOWNLOAD_URL=/assets/the-org-age-of-ai-current-draft.pdf`, then export with `REVIEW_BOOK_PDF` set to the local book PDF. Without the download URL, the page explicitly indicates that this build does not contain the file. Do not copy the current manuscript into `public/` or commit it here.

Production list integration must confirm signup, deliver the book, and start the agreed welcome sequence before the site claims to collect subscribers. Preserve entry-point attribution and provider consent/suppression state. Draft welcome/nurture copy is kept in the private book repo. No email automation has been activated by this mockup work.
