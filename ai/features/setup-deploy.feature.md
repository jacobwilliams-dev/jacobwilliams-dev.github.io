# Feature Specification — Setup & Deploy

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Setup & Deploy
- **Related Area:** Project foundation: build configuration, client-side routing, Supabase backend setup, CI/CD deployment

---

## 1. Feature Goal

The empty project scaffold becomes a site that builds to static files, routes on the client, and publishes itself to the public GitHub Pages domain every time `main` changes. The site owner gets a live URL and a backend ready for the contact form and the admin area: email/password sign-in with one admin account, and a private message store that visitors can write to but not read. Later features get a route table to add their pages to, and one shared backend connection that leaves the site running when it is not configured.

---

## 2. Feature Scope

### In Scope

- Build configuration so assets and routes resolve from the root of `https://jacobwilliams-dev.github.io/`.
- React Router and the Supabase JavaScript client added as dependencies.
- A hash-based route table holding the root route.
- The shared Supabase client module, with a fallback when it is not configured.
- The Supabase project: email/password authentication, new sign-ups turned off, the admin account.
- The `messages` table and its Row Level Security (RLS) policies.
- The local `.env` file and the two repository secrets.
- GitHub Pages source set to GitHub Actions.
- The build-and-deploy workflow.

**Files this feature may change**

- `vite.config.js` (existing)
- `package.json`, `package-lock.json` (existing, shared with other features; change approved by the site owner on 2026-11-04; the lockfile changes through `npm install` only)
- `src/App.jsx` (existing, shared with other features; change approved by the site owner on 2026-11-04)
- `src/lib/supabaseClient.js` (new)
- `.github/workflows/deploy.yml` (new)
- `.env` (new, local only, never committed)

### Out of Scope

- Routes and pages for Portfolio, Links, Contact, the login route and `/backoffice`: each page's own feature specification adds its route to `src/App.jsx`.
- Removing the Vite demo content and building the Home page: `home-page.feature.md`.
- The shared layout (header, footer) and the global styles in `src/index.css`: `header-footer.feature.md`.
- Every Supabase call (insert, sign-in, fetch, delete, sign-out) and the "not configured" messages visitors see: `contact-page.feature.md`, `login-page.feature.md`, `back-office.feature.md`.
- `src/main.jsx`: stays unchanged.
- A catch-all or "not found" route, a `404.html` page, a custom domain, and a manual-run trigger for the workflow: no source asks for them.
- Running lint or other checks inside the workflow: they run on `dev` before merging (`ai-spec.md` section 8).
- Documenting the environment variables in `README.md`: part of the README deliverable, not of a feature specification.

### Feature-Specific Constraints

- **Exception to the Global Definition of Done (implementation completeness):** the root route keeps the Vite demo content unchanged, although this feature touches `src/App.jsx`. `home-page.feature.md` removes it. Decided by the site owner on 2026-11-04.
- **Exception to the Global Definition of Done (integration):** the shared layout does not exist yet, so the root route renders without it. `header-footer.feature.md` wraps the route table in the layout.
- **Dependencies:** this feature depends on no other feature. Every other feature builds on its route table. The contact form, the login page and the Back Office also build on its `supabase` client, its admin account and its `messages` table.
- **Work outside the repository:** the Supabase tasks happen in the Supabase dashboard, and the Pages and secrets tasks in the GitHub repository settings. They leave no file in the repository and are verified where they are made.
- **Live checks wait for `main`:** the workflow runs only on `main`, so the live-site criteria in section 11 can be checked only after the site owner merges `dev` into `main`.
- **Admin credentials:** taken from the course material and typed only into the Supabase dashboard.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Vite + React project

**Requirement:**
The project is a Vite + React app in the JavaScript variant, named after the GitHub Pages domain.

**Expected Result:**
`package.json` is named `jacobwilliams-dev.github.io`, and `npm install` followed by `npm run dev` serves the app locally.

### FR-02 — Static build

**Requirement:**
`npm run build` outputs the whole site as static files in `dist/`.

**Expected Result:**
`dist/` holds `index.html` and every JS, CSS and image file it references, and `npm run preview` serves it with no other process running.

### FR-03 — Root-relative asset paths

**Requirement:**
The build references every asset from the root of the domain.

**Expected Result:**
`dist/index.html` loads its script and stylesheet from paths starting with `/assets/`, and no asset request on the live site returns 404.

### FR-04 — Hash-based routes

**Requirement:**
The app resolves its client-side routes from the part of the URL after `#`.

**Expected Result:**
The root route renders at `/#/`, and the path after `#` is never requested from the server.

### FR-05 — Root route

**Requirement:**
The root path `/` is a route that renders the existing Vite demo content unchanged.

**Expected Result:**
`/` and `/#/` both show the Vite demo page, and its counter button still increments.

### FR-06 — Deep links and refresh on the live site

**Requirement:**
On the deployed site, any hash URL loads the app, including after a page refresh.

**Expected Result:**
Opening or refreshing `https://jacobwilliams-dev.github.io/#/` shows the root route, and no hash URL produces a GitHub Pages 404.

### FR-07 — Deploy on push to main

**Requirement:**
A workflow runs on every push to `main`, and on no other branch.

**Expected Result:**
The Actions tab shows one run per push to `main`; pushes to `dev` or `feature/*` start none.

### FR-08 — Publish to GitHub Pages

**Requirement:**
Each workflow run builds the site and publishes `dist/` to GitHub Pages.

**Expected Result:**
A successful run ends with a deployment to the `github-pages` environment that links to `https://jacobwilliams-dev.github.io/`.

### FR-09 — Pages source

**Requirement:**
The repository's GitHub Pages source is GitHub Actions.

**Expected Result:**
Settings → Pages → Build and deployment → Source shows "GitHub Actions".

### FR-10 — Public site

**Requirement:**
The deployed site is publicly reachable at `https://jacobwilliams-dev.github.io/`.

**Expected Result:**
A private browser window with no GitHub session loads the site.

### FR-11 — Repository secrets

**Requirement:**
The repository holds `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Actions secrets, set to the Supabase project URL and publishable (anon) key.

**Expected Result:**
Settings → Secrets and variables → Actions lists both names.

### FR-12 — Build-time injection

**Requirement:**
The workflow's build step receives both secrets as environment variables with the same names.

**Expected Result:**
The run log lists both variables in the build step with their values masked, and the workflow file holds no value, only references to the secrets.

### FR-13 — Local environment file

**Requirement:**
Local development reads the two variables from a `.env` file at the repository root that git ignores.

**Expected Result:**
With `.env` filled in, the dev server creates the client, and `git status` never lists `.env`.

### FR-14 — Supabase project with email/password sign-in

**Requirement:**
A Supabase project exists with the Email provider (email and password sign-in) enabled.

**Expected Result:**
The project's Authentication providers page shows Email enabled.

### FR-15 — No new sign-ups

**Requirement:**
Supabase refuses to create new user accounts through sign-up.

**Expected Result:**
The Authentication settings show "Allow new users to sign up" turned off.

### FR-16 — Admin account

**Requirement:**
Exactly one user exists in Supabase Auth: the admin account given in the course material, created manually in the dashboard and confirmed.

**Expected Result:**
Authentication → Users lists one user, with a confirmed status.

### FR-17 — Messages table

**Requirement:**
A `messages` table stores contact messages with the columns listed in section 8.

**Expected Result:**
A row inserted with only `name`, `email` and `message` is stored with `id` and `created_at` filled in by the database.

### FR-18 — RLS enabled

**Requirement:**
Row Level Security is enabled on `messages`.

**Expected Result:**
The Table Editor shows RLS enabled for `messages`.

### FR-19 — Visitors can insert

**Requirement:**
A request made with the anon key and no session can insert a message.

**Expected Result:**
The insert succeeds and the row appears in the Table Editor.

### FR-20 — Visitors cannot read or change messages

**Requirement:**
A request made with the anon key and no session cannot read, update or delete messages.

**Expected Result:**
A read returns zero rows while the table holds rows, and an update or delete changes zero rows.

### FR-21 — Authenticated read and delete

**Requirement:**
A request made with an authenticated session can read and delete messages.

**Expected Result:**
A read returns every row, and a delete removes the row it targets.

### FR-22 — Shared Supabase client

**Requirement:**
`src/lib/supabaseClient.js` creates one Supabase client from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` and exports it as `supabase`.

**Expected Result:**
With both variables set, `supabase` is a client object, and no other file creates a Supabase client.

### FR-23 — Unconfigured fallback

**Requirement:**
When either variable is missing or empty, the module exports `supabase` as `null` and throws nothing.

**Expected Result:**
With no `.env`, the app loads and renders the root route with no uncaught error.

---

## 4. Decisions Already Taken

- **D-01:** The project was scaffolded with `npm create vite@latest`, React, JavaScript variant, and named `jacobwilliams-dev.github.io` - existing code (initial commit).
- **D-02:** Routing uses the `react-router` package, which includes `HashRouter`; `react-router-dom` is not added - project-wide spec (section 4, React Router).
- **D-03:** `HashRouter` wraps the route table inside `src/App.jsx`, so `src/main.jsx` stays unchanged - project-wide spec (section 3, `App.jsx` holds the routes); site owner approval, 2026-11-04.
- **D-04:** The root route's element is the unchanged Vite demo content until `home-page.feature.md` replaces it - site owner decision, 2026-11-04.
- **D-05:** `base: '/'` is written explicitly in `vite.config.js`, although it is Vite's default - portal slides (Slide #7).
- **D-06:** The Pages source is GitHub Actions, and the workflow uses GitHub's Pages actions to upload `dist/` as the Pages artifact and deploy it, as in the Vite static-deploy guide linked from the slides, without its manual-run trigger - portal slides (Slide #7).
- **D-07:** The workflow's only trigger is a push to `main` - business doc (Scaffolding and Deployment).
- **D-08:** The workflow installs dependencies with `npm ci` from the committed `package-lock.json` - existing code.
- **D-09:** The workflow uses a Node.js LTS version inside Vite 8's `engines` range (`^20.19.0 || >=22.12.0`) - existing code (Vite 8 in `package.json`).
- **D-10:** The secrets reach only the build step, as environment variables with the same names - business doc (Scaffolding and Deployment: injected from repository secrets at build time).
- **D-11:** The table is named `messages`, not `contact_messages` - business doc (overrides portal slides, Slide #8).
- **D-12:** `created_at` is filled in by a database default, so the contact form sends only `name`, `email` and `message` - business doc (The Contact Experience).
- **D-13:** `name`, `email` and `message` are required text columns - business doc (a schema appropriate to what the contact form collects; all three fields are required).
- **D-14:** There is one policy per operation the app performs (insert, select, delete) and no update policy - business doc (Scaffolding and Deployment).
- **D-15:** The insert policy targets all roles, so a visitor without a session can insert - portal slides (Slide #8, INSERT allowed for public users).
- **D-16:** The select and delete policies target the `authenticated` role - project-wide spec (section 7, Messages data).
- **D-17:** New sign-ups are turned off, so the manually created admin is the only account the `authenticated` policies can match - site owner decision, 2026-11-04; business doc (exactly one administrator).
- **D-18:** The admin user is created through Dashboard → Authentication → Users → Create user manually, with auto-confirm on so it can sign in without an email link - portal slides (Slide #8); business doc (Constraints, Admin Account).
- **D-19:** The client module exports a single binding named `supabase` - business doc (Secure Administration, `supabase.auth.signInWithPassword()`).
- **D-20:** `supabase` is `null` when either variable is missing or empty - site owner decision, 2026-11-04.
- **D-21:** `.gitignore` already ignores `.env` (and `*.local`), so it needs no change - existing code.

---

## 5. Task Breakdown

Order: code that runs locally without Supabase comes first, so the unconfigured fallback is tested before any value exists; then the Supabase and GitHub setup that produces those values; then the workflow that needs the secrets; then verification, locally before the merge into `main` and on the live site after it.

1. **T-01 (FR-03, D-05):** Add `base: '/'` to the Vite config. - `vite.config.js`
2. **T-02 (FR-04, FR-22, D-02):** Install `react-router` and `@supabase/supabase-js` with `npm install`. - `package.json`, `package-lock.json`
3. **T-03 (FR-22, FR-23, D-19, D-20):** Create the client module: read `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; when both are non-empty, create the client and export it as `supabase`; otherwise export `supabase` as `null`. - `src/lib/supabaseClient.js`
4. **T-04 (FR-04, FR-05, D-03, D-04):** Wrap the existing demo markup in `HashRouter` and `Routes`, as the element of a single `Route` at `/`. Keep the demo markup, its counter state, its imports and `App.css` unchanged. - `src/App.jsx`
5. **T-05 (FR-01, FR-02, FR-05, FR-23):** With no `.env` file, run `npm run lint`, `npm run build` and `npm run preview`, and check that the root route renders with no uncaught error. - no file
6. **T-06 (FR-14, FR-15, D-17):** Create the Supabase project, confirm the Email provider is enabled, and turn off "Allow new users to sign up". - Supabase dashboard
7. **T-07 (FR-16, D-18):** Create the admin user under Authentication → Users → Create user manually, with auto-confirm on. - Supabase dashboard
8. **T-08 (FR-17, D-11, D-12, D-13):** Create the `messages` table with the columns in section 8. - Supabase dashboard
9. **T-09 (FR-18, FR-19, FR-20, FR-21, D-14, D-15, D-16):** Enable RLS on `messages` and add the three policies in section 8. - Supabase dashboard
10. **T-10 (FR-13, FR-22, D-21):** Copy the project URL and the publishable (anon) key into a local `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then confirm `git status` does not list `.env`. - `.env` (local only)
11. **T-11 (FR-09, FR-11, D-06):** In the GitHub repository settings, set Pages → Source to GitHub Actions and add the two repository secrets. - GitHub repository settings
12. **T-12 (FR-07, FR-08, FR-12, D-06, D-07, D-08, D-09, D-10):** Create the workflow: trigger on push to `main`; check out the code, set up Node.js, install with `npm ci`, run `npm run build` with the two secrets as environment variables, upload `dist/` and deploy it to GitHub Pages. - `.github/workflows/deploy.yml`
13. **T-13 (FR-01, FR-02, FR-03, FR-04, FR-05, FR-13 to FR-23):** Before the merge into `main`, verify every local and Supabase criterion in section 11. - no file
14. **T-14 (FR-03, FR-06 to FR-12):** After the site owner merges `dev` into `main`, verify the workflow run and the live-site criteria in section 11. - no file

---

## 6. User Flow

**Main flow**

1. The site owner merges `dev` into `main` and pushes.
2. GitHub starts the deploy workflow.
3. The workflow installs the dependencies, builds the site with the two secrets as environment variables, and publishes `dist/` to GitHub Pages.
4. A visitor opens `https://jacobwilliams-dev.github.io/`.
5. GitHub Pages serves `index.html`; the app loads its files from `/assets/` and creates the Supabase client.
6. The router reads the part of the URL after `#` and renders the root route.
7. The visitor refreshes the page or opens `/#/` directly, and the same page loads again.

**Alternate / failure flow**

1. A repository secret is missing: the build still succeeds, `supabase` is `null`, the site loads, and features that need Supabase show their own message.
2. The install or the build fails: the run stops, nothing is deployed, and the previous live version stays online.
3. A developer clones the repository and runs it with no `.env`: the app loads, and `supabase` is `null`.

---

## 7. Interfaces Involved

### Pages

- `/` (reached as `https://jacobwilliams-dev.github.io/` or `/#/`) - new route, existing content: shows the unchanged Vite demo and proves that routing works on the live site.

### Components

- `App` (`src/App.jsx`) - existing, changed: holds `HashRouter` and the route table.
- `HashRouter`, `Routes`, `Route` (`react-router`) - new dependency: hash-based routing.
- `supabase` (`src/lib/supabaseClient.js`) - new: the one Supabase client, or `null` when unconfigured.
- `src/main.jsx` - existing, unchanged: still mounts `App`.
- `vite.config.js` - existing, changed: sets the base path.
- Deploy workflow (`.github/workflows/deploy.yml`) - new: builds and publishes the site on every push to `main`.

### Endpoints

- Supabase Data API for `messages` - new, generated by Supabase when the table is created. This feature calls nothing; the contact form and the Back Office reach it through `supabase`.
- Supabase Auth email/password sign-in - new, enabled by this feature. The login page and the Back Office reach it through `supabase.auth`.

---

## 8. Data

### Inputs

- `VITE_SUPABASE_URL` (text, the project's `https://` API URL) - local `.env`; repository secret of the same name during the workflow build.
- `VITE_SUPABASE_ANON_KEY` (text, the project's publishable (anon) key, never the secret or `service_role` key) - local `.env`; repository secret of the same name during the workflow build.

### Outputs / Returned Data

- `supabase` (Supabase client object, or `null`) - exported by `src/lib/supabaseClient.js`; imported by the contact form, the login page and the Back Office.
- `dist/` (static `index.html` plus hashed JS, CSS and image files under `/assets/`) - uploaded by the workflow as the Pages artifact.
- The live site at `https://jacobwilliams-dev.github.io/` - served by GitHub Pages.

### Stored / Modified Data

- **`messages` table (Supabase, `public` schema):**
  - `id` - primary key generated by the database (Supabase's default for a new table).
  - `name` - text, required.
  - `email` - text, required.
  - `message` - text, required.
  - `created_at` - timestamp with time zone, required, defaults to the time of the insert.
- **RLS policies on `messages`:**
  - INSERT - all roles (target role `public`), so visitors without a session can write.
  - SELECT - `authenticated` only.
  - DELETE - `authenticated` only.
  - No UPDATE policy.
- **Supabase Auth:** Email provider enabled; new sign-ups turned off; one admin user, created manually and confirmed.
- **GitHub repository settings:** Pages source set to GitHub Actions; Actions secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Local only:** `.env` at the repository root holding the two variables, ignored by git.

---

## 9. Validation

- **Client configuration:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must both be non-empty - checked on the client when `src/lib/supabaseClient.js` loads - on failure: `supabase` is `null`, nothing is thrown, and the app renders.
- **Required columns:** every insert into `messages` must carry `name`, `email` and `message` - checked on the server (database constraints) - on failure: the insert is rejected with an error and no row is stored. Browser validation of the form belongs to `contact-page.feature.md`.
- **Access rules:** every request to `messages` is checked against its RLS policies - checked on the server - on failure: a read returns zero rows and an update or delete changes zero rows, with no error.
- **Sign-ups:** new accounts are refused - checked on the server (Supabase Auth) - on failure: the sign-up request returns an error and no user is created.
- **Workflow build:** `npm ci` and `npm run build` must succeed - checked in the workflow - on failure: the run stops before deploying and the previous version stays live.

---

## 10. Expected Behavior

### Success Behavior

- After each push to `main`, the workflow finishes and the live site shows the new version.
- `https://jacobwilliams-dev.github.io/` and `/#/` both show the root route, and a refresh keeps it.
- With both variables set, `supabase` is a working client.
- A visitor's insert stores a row whose `id` and `created_at` the database fills in.
- The admin's session reads every row and deletes the row it targets.

### Error / Invalid Behavior

- A variable is missing locally or as a secret: the build still succeeds, `supabase` is `null`, the site loads, and features that need Supabase show their own message.
- The install or the build fails in the workflow: nothing is deployed and the previous live version stays online.
- A visitor tries to read, update or delete messages: zero rows are returned or changed, and no error is raised.
- An insert is missing `name`, `email` or `message`: the database rejects it and stores nothing.
- Someone attempts to sign up: Supabase refuses and creates no user.

### Empty / Edge Cases

- An unknown hash path (for example `/#/does-not-exist`): the app loads with no route content, never a GitHub Pages 404.
- A visitor's insert that also asks for the stored row back is rejected, because visitors cannot read `messages`.
- The `messages` table is empty: an authenticated read returns an empty list, not an error.

---

## 11. Acceptance Criteria

- [ ] `package.json` is named `jacobwilliams-dev.github.io` and lists `react`, `react-dom`, `vite` and `@vitejs/plugin-react`; the source files are `.js` and `.jsx`; `npm run dev` serves the app. (FR-01)
- [ ] `npm run build` exits with no error and creates `dist/index.html` plus the files it references, and `npm run preview` serves the built site with no other server running. (FR-02)
- [ ] `vite.config.js` contains `base: '/'`, and `dist/index.html` loads its script and stylesheet from paths starting with `/assets/`. (FR-03)
- [ ] On the live site, the browser's Network tab shows no 404 for any JS, CSS or image file. (FR-03)
- [ ] `package.json` lists `react-router`, and in `npm run preview` the root route renders at `/#/`. (FR-04)
- [ ] In the Network tab, opening `/#/` requests the document at `/` only; no request contains the part after `#`. (FR-04)
- [ ] `/` and `/#/` show the Vite demo page, in `npm run preview` and on the live site, and the counter button increments when clicked. (FR-05)
- [ ] On the live site, refreshing `https://jacobwilliams-dev.github.io/#/` reloads the same page, and opening `https://jacobwilliams-dev.github.io/#/does-not-exist` loads the app instead of a GitHub Pages 404. (FR-06)
- [ ] A push to `main` starts one run of the deploy workflow in the Actions tab, and a push to `dev` starts none. (FR-07)
- [ ] A successful run ends with a deployment to the `github-pages` environment that links to `https://jacobwilliams-dev.github.io/`. (FR-08)
- [ ] Settings → Pages → Build and deployment → Source shows "GitHub Actions". (FR-09)
- [ ] A private browser window with no GitHub session loads `https://jacobwilliams-dev.github.io/`. (FR-10)
- [ ] Settings → Secrets and variables → Actions lists `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. (FR-11)
- [ ] The build step in the workflow run log lists both variables with their values shown as `***`, and `.github/workflows/deploy.yml` contains no URL or key value, only references to the two secrets. (FR-12)
- [ ] `git check-ignore .env` prints `.env`, and `git status` does not list `.env` after it is created. (FR-13)
- [ ] The Supabase project's Authentication providers page shows Email enabled. (FR-14)
- [ ] The Supabase Authentication settings show "Allow new users to sign up" turned off. (FR-15)
- [ ] Authentication → Users lists exactly one user, the admin account, with a confirmed status. (FR-16)
- [ ] The Table Editor shows `messages` with the columns `id`, `name`, `email`, `message` and `created_at` and the types in section 8, and a row inserted with only `name`, `email` and `message` gets `id` and `created_at` filled in. (FR-17)
- [ ] The Table Editor shows RLS enabled on `messages`, with exactly three policies: one INSERT, one SELECT and one DELETE. (FR-18)
- [ ] With the SQL Editor's role set to `anon`, inserting a row with `name`, `email` and `message` succeeds. (FR-19)
- [ ] With the SQL Editor's role set to `anon`, selecting from `messages` returns zero rows while the table holds rows, and an update or a delete reports zero rows changed. (FR-20)
- [ ] With the SQL Editor's role set to `authenticated` as the admin user, selecting from `messages` returns every row, and deleting one row removes it. (FR-21)
- [ ] Searching `src/` for `createClient` finds only `src/lib/supabaseClient.js`, and with `.env` filled in, running `(await import('/src/lib/supabaseClient.js')).supabase !== null` in the browser console of `npm run dev` returns `true`. (FR-22)
- [ ] With no `.env`, or with one of the two variables empty, the same console check returns `false`, and `npm run dev` and `npm run preview` both render the root route with no uncaught error in the console. (FR-23)
