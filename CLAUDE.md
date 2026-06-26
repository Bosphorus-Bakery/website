# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Marketing/storefront website for **Bosphorus Bakery** (baklava). Next.js 16 App Router + React 19 + TypeScript (strict) with Redux Toolkit for state. No backend yet — the contact/order form is built but does not submit anywhere (see `handleSubmit` TODO in `ContactForm.tsx`).

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint (eslint extends next/core-web-vitals)
npx tsc --noEmit # type-check only (tsconfig has noEmit)
```

There is **no test framework** configured — there are no unit/integration tests in the repo. Verification is done by running the dev server and checking pages manually.

Prettier config: single quotes, semicolons, trailing commas (`all`).

## Architecture

### Routing (App Router, `src/app/`)
Pages are **thin wrappers**: each `app/<route>/page.tsx` exports a `metadata` object (title/description) and renders a single feature component imported from `@/components`. Real markup/logic lives in `src/components/`, not in the page files. The site-wide chrome (`Navbar`, `StoreProvider`, `Footer`) is mounted once in `app/layout.tsx`. `error.tsx` and `not-found.tsx` exist but are currently identical placeholder stubs.

Routes: `/` (Home), `/baklava`, `/about`, `/locations`, `/contact`.

### State (Redux Toolkit, `src/lib/`)
- `store.ts` — `makeStore()` factory wires two reducers: `app` and `contactForm`. Exports `RootState`, `AppDispatch`, `AppStore` types.
- `StoreProvider.tsx` — a **per-request store** created lazily in a `useRef` (Next.js SSR-safe pattern). Wraps `children` in layout. Seed initial data here if needed.
- `hooks.ts` — always use the typed hooks `useAppSelector` / `useAppDispatch` (never the raw react-redux hooks).
- `features/appSlice.ts` — global UI state (`isDark`, `theme`); reducer exported as `app`.
- `features/contactFormSlice.ts` — the bulk of app state. Holds per-field contact-info objects and a cart. See "Contact form" below.

### Import conventions
- Path alias **`@/*` → `./src/*`** (configured in `tsconfig.json`). Always import via `@/...`, not relative paths across folders.
- **Barrel files** are the public entry points — import from the folder, not the inner file:
  - `@/lib` re-exports store, features, hooks.
  - `@/lib/constants` re-exports all constant modules.
  - `@/components` re-exports feature components as named (e.g. `import { Home, Contact } from '@/components'`).
  - `@/styles` re-exports CSS-module objects as named: `formStyles`, `contactStyles`, `HomeStyles`.
  - `@/types` re-exports everything from `sliceTypes.ts`.

### Styling — two coexisting systems
1. **Global CSS** (`src/styles/globals.css`, imported once in layout). Defines the design-token palette as CSS custom properties on `:root` (an amber/brown bakery theme — `--color-amber-main`, `--color-text-deep-brown`, etc.) plus plain global class names used directly as string literals: `nav-bar`, `footer`, `home-page-*`, `.button`. Fonts: Cormorant Garamond + Montserrat via Google Fonts `@import`; Inter is also loaded via `next/font` in layout.
2. **CSS Modules** (`*.module.css`) for page-scoped styles, imported through the `@/styles` barrel and applied with **bracket notation** because class names are kebab-case, e.g. `formStyles['error-border']`, `formStyles['quantity-button']`.

When styling, prefer the existing CSS variables for colors. Mobile breakpoint convention is `@media (max-width: 768px)`.

### Components (`src/components/`)
Feature folders (`Home/`, `Contact/`, `Baklava/`, `Locations/`, `About/`) hold a same-named component as the entry (`Home/Home.tsx`); `Home/` additionally splits into sub-sections (`Hero`, `Locations`, `Reviews`, `About`, `Baklava`). `Navbar.tsx` and `Footer.tsx` sit at the root. Components that use hooks/Redux/browser APIs are marked `'use client'`; page wrappers and pure-presentational components are server components.

`Navbar.tsx` is the reference for client-interactivity patterns: scroll-state via `useState` + scroll listener, mobile hamburger menu, active-link highlighting via `usePathname()`.

### Contact form (most complex component: `Contact/ContactForm.tsx`)
The validation model is the thing to understand before editing:
- Each contact field is a `ContactField` `{ hasValue, value, isValid, errorMessage, counter? }` (see `types/sliceTypes.ts`).
- Validation regexes live in `lib/constants/regexPatterns.ts`; user-facing messages in `errorMessages.ts`; length caps in `formLimits.ts`.
- Flow: `handleOnChange` validates against the field's regex and updates `hasValue`/`isValid`/`value` in the store; `handleOnBlur` reads that state and sets `errorMessage` + toggles the `error-border` class. Native validation is disabled (`noValidate`).
- A radio toggle (`subject` = `general` | `order`) switches the form between a description textarea and an order UI (location select, item checkboxes with +/- quantity steppers, live subtotal).
- The cart's product catalog is the `itemDetails` constant; `setQuantity` (INCREMENT/DECREMENT/SET_TO_ONE/SET_TO_ZERO) + `updateSubtotal` reducers drive cart state.

## Known rough edges (don't treat as intentional patterns)
The codebase is early-stage. There are leftover debug `console.log`s in `contactFormSlice` reducers, unused throwaway vars in `hooks.ts`, an unused `stringify` import in `appSlice.ts`, stub components (`About/About.tsx` returns "Hello About"), and the duplicated error/not-found pages. Clean these up rather than copying them.
