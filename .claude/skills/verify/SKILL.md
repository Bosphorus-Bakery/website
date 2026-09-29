---
name: verify
description: Build, run, and visually verify changes to the Bosphorus Bakery Next.js site.
---

# Verifying changes in this repo

## Run the app

A dev server is often already running on port 3000 (`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`). It hot-reloads, so just use it. If not running: `npm run dev` in the background (it falls back to 3001 if 3000 is taken but another `next dev` instance makes it exit — check the port in its output).

## Screenshot / drive pages (headless Chromium)

No test framework exists; verification is visual via Playwright:

1. In the session scratchpad: `npm init -y && npm install playwright && npx playwright install chromium` (do NOT use `--with-deps` — no passwordless sudo on this machine).
2. Chromium fails to launch with missing `libnspr4.so` etc. Fix without root:
   ```bash
   mkdir -p libs && cd libs
   apt-get download libnspr4 libnss3 libasound2t64
   for f in *.deb; do dpkg -x "$f" extracted/; done
   ```
   Then run node scripts with
   `LD_LIBRARY_PATH="$PWD/libs/extracted/usr/lib/x86_64-linux-gnu:$PWD/libs/extracted/usr/lib/x86_64-linux-gnu/nss:$LD_LIBRARY_PATH"`.
3. Screenshot at 1440×900 (desktop), 390×844 (mobile), and optionally 1024×640 (short laptop). Wait ~1.2s after `networkidle` for CSS entrance animations before capturing. Collect `console`/`pageerror` events.

## Worth checking on this site

- Routes: `/`, `/baklava`, `/about`, `/locations`, `/contact`.
- Horizontal overflow probe: `document.documentElement.scrollWidth > clientWidth`.
- Type-check with `npx tsc --noEmit` (that's CI hygiene, not verification).
