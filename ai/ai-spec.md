# Project-Wide AI Specification

**This is the project-wide specification. Read it before any feature specification.**

- The rules in this document apply to **every feature** of the project, unless a feature specification explicitly states an exception.
- Feature specifications (`*.feature.md`) describe requirements that are **unique to a single feature**. They must not repeat what is already defined here.
- Any implementation must satisfy **both** this document and the relevant feature specification.
- If the two documents conflict, resolve the conflict explicitly instead of guessing: update the feature specification, or this one.

---

## 1. Project Identity

- **Project Name:** jacobwilliams-dev.github.io (personal portfolio website)
- **Short Description:** Jacob Williams's public portfolio site, presenting skills, education, experience and projects, with a contact form employers can use to get in touch and a private back office where the site owner reads those messages.
- **Project Type:** Static front-end web app (React + Vite single-page app) using Supabase as a backend-as-a-service, deployed to GitHub Pages.
- **Primary Users:**
  - **Visitors** (employers, recruiters, peers): browse the public pages, download the résumé, send a message through the contact form.
  - **Site owner** (the single admin): logs in through a hidden route, reads and deletes contact messages in the back office.

---

## 2. Project Scope

### In Scope

- A shared layout (header with navigation and logo, footer) wrapping every page.
- Public pages: Home, Portfolio, Links, Contact.
- Contact form that validates input in the browser and stores messages in Supabase.
- Hidden admin login using Supabase email/password authentication.
- Back office for the admin to view and delete contact messages.
- Responsive design across all pages, including a compact mobile navigation.
- AI-generated imagery (logo and page images).
- Automated build and deployment to GitHub Pages on every push to `main`.
- Optional extra miles, only after the main features are complete: light/dark mode, multi-language support.

### Out of Scope

- Any custom backend server or API (Supabase is the only backend).
- Server-side rendering.
- User registration, sign-up or password-reset flows in the app. The one admin account is created in the Supabase dashboard.
- More than one admin account, or user roles.
- Public read access to stored contact messages.
- Back-office features beyond viewing and deleting contact messages.
- Any feature not described in this file or a feature specification.

### Feature Index

- `setup-deploy.feature.md` - scaffold, routing, Supabase setup, environment variables and GitHub Pages deployment
- `header-footer.feature.md` - shared project layout: header, navigation, logo, footer
- `home-page.feature.md` - landing page at the root path
- `portfolio-page.feature.md` - education, work experience, projects and résumé download
- `link-page.feature.md` - curated external links
- `contact-page.feature.md` - contact form stored in Supabase
- `login-page.feature.md` - hidden admin login
- `back-office.feature.md` - protected admin view of contact messages

Optional (extra miles):

- `light-dark-mode.feature.md` - light/dark theme switch
- `languages.feature.md` - multi-language support

All feature specifications live in `ai/features/`.

---

## 3. Architecture

### Architecture Overview

The project is a client-side React single-page app built by Vite into static files and served by GitHub Pages. There is no backend server. Dynamic features talk directly from the browser to Supabase through one shared Supabase JavaScript client:

Browser (React app) → Supabase client (`src/lib/supabaseClient.js`) → Supabase (PostgreSQL database + Auth)

Access to data is controlled by Supabase Row Level Security (RLS) policies, not by application code alone. A GitHub Actions workflow builds the site on every push to `main`, injects environment variables from repository secrets, and deploys the output to GitHub Pages.

The repository started as an `npm create vite@latest` React scaffold. `setup-deploy.feature.md` added React Router (`HashRouter` in `src/App.jsx`), the shared Supabase client in `src/lib/supabaseClient.js` and the deploy workflow. Folders marked (planned) below do not exist yet; the first feature that needs each one creates it.

### Repository / Project Structure

- `/ai/ai-spec.md` - this project-wide specification
- `/ai/features/` - one `*.feature.md` specification per feature
- `/src/` - application source code
  - `main.jsx` - entry point that mounts the app
  - `App.jsx` - root component (routes and shared layout)
  - `/src/lib/` - shared service modules; holds `supabaseClient.js`
  - `/src/assets/` - images and other assets imported by components
  - `/src/pages/` (planned) - one component per routed page
  - `/src/components/` (planned) - shared and reusable components, including the layout and the `Frame` and `GoldButton` visual components
- `/public/` - static files served as-is at the site root (favicon, downloadable files)
- `/.github/workflows/deploy.yml` - build-and-deploy workflow for GitHub Pages
- Root - config files only: `index.html`, `vite.config.js`, `eslint.config.js`, `package.json`, `package-lock.json`, `.gitignore`
- `/dist/` - build output; generated, gitignored, never edited by hand

### Component Responsibilities

- **Shared layout:** renders the header and footer around every page / does not hold page-specific content.
- **Pages:** render one route's content inside the layout / do not create their own Supabase client or duplicate layout elements.
- **Shared components:** reusable UI pieces / no direct Supabase calls unless that is their stated purpose in a feature spec.
- **`src/lib/supabaseClient.js`:** the one place the Supabase client is created from environment variables / handles a missing configuration without throwing.
- **Supabase:** stores contact messages and authenticates the admin; RLS decides who may insert, read and delete / no business logic is assumed to run there beyond auth and RLS.
- **GitHub Actions workflow:** builds with secrets injected and deploys to GitHub Pages / never prints or commits secret values.

### Running the Project

- **Install:** `npm install`
- **Run:** `npm run dev` (local dev server); `npm run build` then `npm run preview` to check the production build
- **Test:** no automated test suite. Checks are `npm run lint` and `npm run build`, plus manual testing in the browser.
- **Environment variables:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (local `.env` file, gitignored; repository secrets for deployment)

---

## 4. Allowed Technologies & Constraints

### Required / Allowed Technologies

- **Language:** JavaScript (ES modules, JSX). The project was scaffolded with the JavaScript variant.
- **Front-end framework:** React 19 (`react`, `react-dom`).
- **Build tool:** Vite 8 with `@vitejs/plugin-react`.
- **Routing:** React Router (`react-router` package).
- **Backend-as-a-service:** Supabase (PostgreSQL database, Auth, RLS) through the `@supabase/supabase-js` client.
- **Styling:** hand-written CSS, following the visual design in section 5. No CSS framework or animation library.
- **Linting:** ESLint 10 with `@eslint/js`, `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- **CI/CD and hosting:** GitHub Actions, GitHub Pages.
- **Static data:** content may come from static files (JSON) in the repository or from Supabase.

Ask before adding any dependency not listed here. Reason: every package adds bundle size and something to explain in a code review.

### Restricted / Prohibited Technologies

- Custom backend servers or server code (Node/Express APIs, serverless functions) - Supabase is the only backend.
- Server-side rendering frameworks - the site must be static and client-side only.
- Supabase `service_role` or secret keys in client code - only the publishable (anon) key may be used in the browser.

### Technical Constraints

- **Static hosting:** the site is served from the root of `https://jacobwilliams-dev.github.io/`. `vite.config.js` sets `base: '/'` so assets and routes resolve from the domain root.
- **Environment variables:** must use the `VITE_` prefix, must never be committed (`.env` is gitignored), and are injected from repository secrets at build time.
- **No credentials in the repository:** never commit keys, passwords or tokens of any kind. Name config keys only.
- **Graceful degradation:** the app must not crash when Supabase is unconfigured. Public pages still render; Supabase-backed features show a clear message instead.
- **Admin account:** provisioned in the Supabase dashboard. The app provides no registration flow.
- **Hidden routes:** the login route and `/backoffice` must never appear in any public navigation (header, footer, mobile navigation).
- **Specification first:** no feature is implemented before its feature specification exists in `ai/features/` and this file has been read.
- **Single Supabase client:** all Supabase access goes through `src/lib/supabaseClient.js`.
- **Responsive:** every page works on narrow (phone) and wide (desktop) viewports.

---

## 5. Coding Standards & Conventions

### Naming Conventions

- React component files and components: PascalCase, `.jsx` (e.g. `App.jsx`).
- Non-component modules: camelCase, `.js` (e.g. `supabaseClient.js`).
- Variables and functions: camelCase. State setters follow `[value, setValue]`.
- Constants for fixed config values: UPPER_SNAKE_CASE.
- Component stylesheets: same name as the component (e.g. `App.css` for `App.jsx`).
- Route paths: lowercase (e.g. `/backoffice`).
- Feature specifications: kebab-case, `<feature-name>.feature.md`.
- Environment variables: UPPER_SNAKE_CASE with the `VITE_` prefix.

### File & Folder Conventions

- One component per file.
- New source files go under `src/`, in the folder that matches their role (see section 3). Do not add files to the repository root except config files.
- Images imported by components go in `src/assets/`; files that must keep a fixed public URL (favicon, résumé PDF) go in `public/`.
- Never edit `dist/` or `package-lock.json` by hand.

### Code Organization

- Imports: external packages first, then local modules and assets, then the component's CSS import last.
- Pages compose shared components; logic used by more than one feature lives in a shared module, not copied.
- Supabase calls import the client from `src/lib/supabaseClient.js`.
- Keep components small enough to read in one screen where practical; split out a child component when one grows past that.

### Formatting / Style

- Follow the scaffold's style: 2-space indentation, single quotes, no semicolons, trailing commas in multi-line lists.
- ESLint (`eslint.config.js`) enforces code rules; `npm run lint` should report no errors.

### Visual Design

One dark, sci-fi style applies to every page. The values come from the site owner's design reference (2026-11-05). To change the design, update this section first, then the code.

- **Theme:** dark only (`color-scheme: dark`). A light palette belongs to `light-dark-mode.feature.md`.
- **Colour variables:** defined once in `src/index.css`. Components use these variables instead of introducing new colour values.
  - `--bg` `#020304` - page background
  - `--ink` `#050708` - dark fills (header bar, open menu, panels)
  - `--text` `#f5f6f4` - headings and primary text
  - `--text-muted` `#b7b9b8` - paragraphs and inactive links
  - `--text-faint` `#828685` - glyph lines, footer text, background line art
  - `--gold` `#b49a63` - buttons, hover colour, focus outline
  - `--peach` `#d9b4a2` - accent lines and current-state marks
  - `--line` `rgba(230, 229, 220, 0.65)` - frame outlines and dividers
- **Fonts:** body `Arial, Helvetica, sans-serif`; headings `Orbitron` in bold, falling back to `'Trebuchet MS', Arial, sans-serif`. Orbitron is the only web font: it is self-hosted from `src/assets/fonts/`, unmodified, with its SIL Open Font License file beside it. Every other font is a system font.
- **Text sizes:** body text 16px with a 1.6 line height; labels in spaced-out bold capitals (letter-spacing 1.5px to 2px) are never smaller than 12px; `h1` is `clamp(38px, 4.05vw, 70px)`; `h2` is `clamp(23px, 2.2vw, 38px)`.
- **Hover and focus:** links and buttons turn `--gold` on hover; keyboard focus shows a 2px `--gold` outline offset by 6px.
- **Glyph line:** a section heading may carry, under it, a short decorative row of Unicode symbols in `--text-faint` with 5px letter-spacing and `aria-hidden="true"`. It uses plain Unicode characters, not an alphabet font.
- **Frame panel:** page sections sit inside a `Frame` component: a 1px `--line` outline drawn in SVG with a non-scaling stroke, the top-right and bottom-left corners cut at 45°, the bottom-right corner rounded, and a small square marker on the top-left corner.
- **Gold button:** call-to-action buttons and links use a `GoldButton` component: a `--gold` fill with the top-left and bottom-right corners cut, an inner 1px light border, a white label in spaced-out capitals, and a soft gold glow.
- **Full-screen sections:** page sections are at least one window tall (`min-height: 100svh`) and keep their content in normal flow, never placed by percentage with absolute positioning. Wider than 760px, the page snaps to section starts just below the header; at 760px or less, snapping is off. The first section of a page with several sections shows a pulsing "Scroll down" hint.
- **Breakpoint:** narrow-viewport styles apply at `max-width: 760px`.
- **Motion:** CSS transitions and keyframes only. Hover and focus changes take 0.2s; the gold button lifts 2px and brightens on hover; the background orbit drawing rotates over 1.8s; the scroll hint pulses on a 2.5s loop; in-page scrolling is smooth. Under `prefers-reduced-motion: reduce`, every animation and transition is off and scrolling jumps.
- **Where the pieces are built:** `Frame` and `GoldButton` live in `src/components/` and are created by the first feature that uses them; later features reuse them.
- **No franchise material:** no names, logos, characters or artwork from games, films or other brands. One exception: the LinkedIn and GitHub icons on the links to the site owner's own profiles.

### Maintainability Rules

- Build only what this file and the relevant feature specification describe.
- Do not refactor or restyle unrelated code while working on a feature.
- Comments explain why, not what. Keep comments short.
- Remove dead code and unused files instead of commenting them out.
- When an existing pattern fits, reuse it instead of introducing a second way to do the same thing.

---

## 6. Global Definition of Done

- [ ] **Implementation completeness:** every acceptance criterion in the feature's specification is met, and no scaffold demo content or placeholder text remains on the pages it touches.
- [ ] **Compliance with this specification:** no rule in this file is broken, or the exception is written down in the feature specification.
- [ ] **Testing:** `npm run lint` reports no errors, `npm run build` succeeds, and the feature has been checked by hand in the browser at phone and desktop widths. Supabase-backed features are also checked with Supabase unconfigured.
- [ ] **Input validation:** every form validates in the browser before anything is sent to Supabase, and every failed rule shows a descriptive message.
- [ ] **Error handling:** every failed Supabase call shows a visible message to the user; nothing fails silently or only in the console.
- [ ] **Documentation:** the feature specification matches what was built, and every AI-generated image added has its generating tool documented.
- [ ] **Integration:** the feature renders inside the shared layout, works with the router on the built site (`npm run preview`), and adds no link to the login route or `/backoffice` in public navigation.
- [ ] **Cleanup of temporary and debugging code:** no leftover `console.log` debugging, commented-out code or unused imports/assets, and no `.env` file or secret staged for commit.
- [ ] **Accessibility:** every image has appropriate alt text, and every form field has a visible label or placeholder.

---

## 7. Cross-Feature Rules

- **Routing:** use React Router with `HashRouter` by default, with `base: '/'` in `vite.config.js`. Reason: GitHub Pages serves static files only and cannot fall back to `index.html` for unknown paths, so hash routes keep deep links and page refreshes working. Home is mounted at the root path.
- **Shared layout:** every page renders inside the shared layout, so the header and footer appear everywhere.
- **Hidden admin routes:** the login route and `/backoffice` are reached only by typing their URL (or an optional, documented secret keyboard event). Never link to them from the header, footer or mobile navigation.
- **Supabase access:** use only the client exported by `src/lib/supabaseClient.js`, and only the anon (publishable) key. If the client is not configured, features that need it show a clear message instead of crashing.
- **Messages data:** contact messages are stored in the Supabase `messages` table with the fields `name`, `email`, `message` and `created_at` (plus the table's primary key `id`). RLS allows public users to insert only; reading and deleting require an authenticated session.
- **User feedback:** results of Supabase operations (form submission, login, loading or deleting messages) are shown on screen. Success and error states are visually distinct from each other.
- **AI-generated imagery:** every AI-generated image is relevant to the page it sits on, has appropriate alt text, and has its generating tool documented in a code comment, in `RESEARCH.md`, or in the feature specification.
- **Responsive behaviour:** layouts adapt to narrow viewports without horizontal scrolling or content hidden behind navigation.
- **In-page jumps:** jump to a section of the same page with `element.scrollIntoView()`, never with an `href="#id"` link. Reason: `HashRouter` reads every `#` link as a route, so `#story` would open the route `/story`.
- **Blocking rules:** if a rule here blocks needed work, stop and ask. Don't build a workaround.

---

## 8. Development Workflow

- **Branches:** all work happens on the `dev` branch through small, incremental commits. Optional `feature/*` branches are created from `dev` and merged back into `dev` when complete.
- **`main` is production:** never commit directly to `main`. Every push to `main` triggers a deployment, so a broken `main` is a broken live site.
- **Release:** before submission, merge `dev` into `main`. History should show the flow feature → `dev` → `main`, and `main` holds the final, stable version.
- **Before merging to `main`:** run `npm run lint` and `npm run build` on `dev` and check the site with `npm run preview`. Reason: a failure caught on `dev` never reaches the live site.
- **After deploying:** open the live GitHub Pages URL and confirm the changed pages load.
- **Specification first:** for each feature, write or update its specification in `ai/features/` before implementing it, and read this file first.
- **Working with AI tools:** reference this file as the global specification and the relevant `*.feature.md` as the feature requirements in every implementation prompt.
