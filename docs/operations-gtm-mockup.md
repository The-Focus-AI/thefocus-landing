# Org Age of AI website review

A complete eighteen-page concept based on the campaign branch `gtm/org-age-landing-pages`. All review routes are under `/preview/operations/`; existing site routes remain unchanged.

The primary framing is helping organizations turn AI into business capability and value, with responsibility for getting valuable operations working reliably. Engagements start around $20K per month, with a roughly two-month first build as an illustrative entry. Team delivery is emphasized; knowledge, software, and cooperation explain the approach.

Pages: homepage, engagements, approach, work index, Fountain Creek case, Steering House case, anonymized media case, Perplexity on Samsung TVs, Trinity Hunt, about, book, three chapter excerpts, hour-value companion, book download, interactive project brief, and contact.

Cases distinguish delivered work from proposed expansion. The media case describes partner delivery while keeping both partner and client anonymous. Detailed internal commercial evidence is maintained separately in the private book repository.

## Review behavior

Navigation, FAQ disclosures, mobile menu, form previews, and project-brief download are implemented. Forms do not send, subscribe, store, or schedule. The new routes contain no analytics. The book page presents the current working edition, actual contents, and three excerpts. The owner-only preview includes its PDF; the public source repository does not.

## Build and preview

Run `mise run lint` and `mise run test`. Then run `mise exec -- node scripts/build-operations-preview.mjs` (with the book settings below for a private download build) to produce `dist-operations-preview/` containing only the new review pages and their assets. This excludes the rest of the site, CNAME, and internal documentation. Preview exports are marked noindex.

The current review uses owner-only Sites hosting. Update that existing preview from the isolated export; do not publish its client-case content publicly or replace production.

Production enquiry handling, scheduling, consented email delivery, and conversion tracking remain subsequent integration work. Confirm commercial terms and case wording before moving the concept into production.

## Swiss design and conversion priorities — September 6

The campaign uses the existing Swiss/editorial direction from `consultancy-landing-v11.html`: paper, ink, Inter with Sorts Mill Goudy, strong grids, and red/blue/yellow section treatments. Preserve this while iterating on the offer.

Priority order: consulting revenue; book-led email acquisition; useful email content that creates future sales. The Org Age framing remains central. Consulting is prominent in navigation and the homepage hero, with engagements from $20K/month. Book signup is a clear second path, supported by actual content.

The review now has 18 pages, including three chapter-excerpt pages, an original hour-value companion, and a download page. The excerpts preserve selected prose from public source parts I, II, and V, exported from the book repo by `editorial/operations-edition/export-web-excerpts.mjs`. These are book acquisition pages requested for the campaign, not a new blog. Original publication links and authorship are retained.

Book forms validate an email and demonstrate the acquisition journey; no email is saved, sent, or subscribed. The private preview provides a real download of the current 133-page working edition. This is distinct from the next editorial revision. The public source repository contains no PDF.

For the owner-only preview, build with `PUBLIC_BOOK_DOWNLOAD_URL=/assets/the-org-age-of-ai-current-draft.pdf`, then export with `REVIEW_BOOK_PDF` set to the local book PDF. Without the download URL, the page explicitly indicates that this build does not contain the file. Do not copy the current manuscript into `public/` or commit it here.

Production list integration must confirm signup, deliver the book, and start the agreed welcome sequence before the site claims to collect subscribers. Preserve entry-point attribution and provider consent/suppression state. Draft welcome/nurture copy is kept in the private book repo. No email automation has been activated by this mockup work.

The homepage now connects the Org Age argument to “What is an hour saved worth?” and features Perplexity on Samsung TVs, Steering House, and anonymous enterprise media work. The work index also includes Trinity Hunt and Fountain Creek. The value article links these ideas to actual projects, a commercial conversation, and the book download. No measured ROI is inferred from a scope or shipped feature.


## Client experience and social proof — September 8

Restore the original twelve-organization wall immediately after the hero, keeping the qualification that it spans the team’s product, studio, and consulting history. Project links say “See selected work,” so the examples do not imply a total portfolio count. After the featured projects, a client-conversation section demonstrates space for client voices with clearly labeled editorial interview concepts. Approved client quotations or recordings can fill that layout when supplied. Existing generic legacy testimonials are not treated as authenticated statements.
