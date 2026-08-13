## 2024-08-13 - [Dashboard ARIA Labels]
**Learning:** Found multiple icon-only buttons across the dashboard (`<button>` tags) that were missing `aria-label` attributes. This breaks accessibility for screen reader users who cannot see the icon. Added labels dynamically to password toggles and error close buttons.
**Action:** In future, immediately check any icon-only button implementations for `aria-label` or `.sr-only` text alternatives. Make sure focus indicators (`focus-visible`) are correctly implemented on interactive elements.
