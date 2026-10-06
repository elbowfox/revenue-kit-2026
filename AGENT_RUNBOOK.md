# Agent runbook

Run this weekly. Do not invent customers or fake reviews.

1. Check the payment-link dashboard (Stripe or Lemon Squeezy) for new orders.
2. If a ProposalForge buyer emails for a key, reply with a key shaped `PF-XXXX-XXXX` and tell them to paste it in the app. Log the email locally, not in git.
3. Draft 10 outreach notes to freelancers or detailers who publicly complain about no-shows or slow proposals. Send only if the human owner approves.
4. Read support mail. If two people ask for the same missing field, add it in `proposalforge/app.js` and push to `main`.
5. Do not buy ads until 5 strangers have paid.
6. Stop any automation that messages people who did not ask to be contacted.

Chrome Web Store, Stripe, and email each need the owner's login. An agent cannot finish those steps alone.
