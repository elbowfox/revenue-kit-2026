# Revenue Kit

Three products you can host and charge for. None of them produce revenue by themselves.

| Product | Buyer | Price to test | Where |
| --- | --- | --- | --- |
| ProposalForge | Freelancers | $29 once | `proposalforge/` |
| TradeDesk | Mobile detailers, cleaners | $19/month per shop | `tradedesk/` |
| ScopeBrief | Same freelancers | Free, upsell to ProposalForge | `extension/` |

## Deploy

1. This repo is public: https://github.com/elbowfox/revenue-kit-2026
2. Settings → Pages → Branch `main` → root. Site will be `https://elbowfox.github.io/revenue-kit-2026/`
3. In `proposalforge/config.js`, set `checkoutUrl` to a Lemon Squeezy or Stripe Payment Link and set `supportEmail`.
4. Remove `demoKeys` before you advertise the paid tier.
5. Chrome: `chrome://extensions` → Developer mode → Load unpacked → `extension/`. Publishing to the Chrome Web Store needs a $5 developer account and a privacy policy.

## Honest limits

- Client-side license checks can be bypassed. Fine for a $29 tool. Do not use them for high-ticket access.
- No card data is collected. Do not add a form that asks for card numbers.
- “Passive” still needs distribution: 20 personal outreach messages beat another feature.
- Expect $0 until someone pays. A realistic first month for a solo launch is $0–$300, not a salary.

## Agent loop

See `AGENT_RUNBOOK.md`.
