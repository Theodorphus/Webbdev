# Conversion measurement

Events are sent through the existing `@vercel/analytics` installation. Live collection must be checked in the deployed project's analytics account; local development logs are not evidence of production collection.

| Event | Trigger |
| --- | --- |
| `demo_started` | First manual design change or forward step, once per builder session |
| `demo_step_completed` | Valid forward navigation, once for each step 1–3 |
| `demo_shared` | Design link successfully copied to clipboard |
| `demo_submitted` | Demo endpoint returns success |
| `demo_error` | Demo request fails |
| `contact_started` | First focus in the contact form |
| `contact_submitted` | Contact endpoint returns success |
| `contact_error` | Contact request fails |
| `calculator_started` | First calculation change or quote CTA click |
| `calculator_quote_clicked` | Quote link clicked, with current type, page count and selected feature count |
| `case_cta_clicked` | Case study's demo or contact CTA clicked |
| `chat_lead_submitted` / `chat_lead_error` | Chat contact request succeeds / fails |

Use demo starts, steps and submissions to compare drop-off. Calculator CTA clicks indicate interest, not completed enquiries. Submission events count successful responses from the mail endpoint, not confirmed inbox delivery or signed customers. A page reload starts a new session; these are event counts, not unique people. Browser blocking can reduce counts.

Only categorical choices and counts are sent. Never include names, email addresses, company names, free text, chat transcripts or shared design URLs in event properties. `SiteAnalytics` removes query strings and fragments from analytics event URLs.

Manual verification: use a mocked `/api/contact` or `/api/lead` response, inspect development events, and confirm one start and one success per flow. Verify failed requests do not emit successful submissions. Do not send test enquiries to the real mailbox.
