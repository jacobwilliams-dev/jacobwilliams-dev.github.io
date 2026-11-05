# Feature Specification — Project Layout

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Project Layout
- **Related Area:** Front-end: shared layout, header navigation, footer, narrow-viewport navigation

---

## 1. Feature Goal

Every page of the site sits inside one shared frame, so the site reads as one thing rather than several. A header that stays visible while the visitor scrolls carries the AI-generated logo and links to every public page, and a footer carries the site owner's contact details and a copyright notice. Visitors always see which page they are on and can move between pages at any screen size; on a phone the navigation folds into a compact menu that leaves the page content clear.

---

## 2. Feature Scope

### In Scope

- A shared layout component that renders the header, the current route's content and the footer.
- The header: the AI-generated logo linking to Home, and links to the four public pages.
- Marking the link of the page being viewed as the current page, and showing that page's name in the header bar on narrow viewports.
- The AI-generated logo image and the documentation of the tool that generated it.
- The footer: email address, LinkedIn and GitHub profile links, a link to the Contact page, and a copyright notice.
- The compact menu that replaces the link row on narrow viewports.
- Wrapping the existing route table in the layout.

**Files this feature may change**

- `src/components/Layout.jsx`, `src/components/Layout.css` (new)
- `src/components/Header.jsx`, `src/components/Header.css` (new)
- `src/components/Footer.jsx`, `src/components/Footer.css` (new)
- `src/assets/logo.png` (new)
- `src/App.jsx` (existing, shared with other features; change approved by the site owner on 2026-11-05)

### Out of Scope

- The routes and content of Portfolio, Links, Contact, the login route and `/backoffice`: each page's own feature specification adds its route to `src/App.jsx`.
- Removing the Vite demo content from the root route and from `src/App.css`: `home-page.feature.md`.
- `src/index.css` and `src/main.jsx`: stay unchanged. The layout reuses the colour variables `src/index.css` already defines.
- The favicon (`public/favicon.svg`) and the page title in `index.html`: no source ties them to the layout.
- The optional secret keyboard event that opens the login route: `login-page.feature.md`.
- A light/dark theme switch or a language switcher in the header: the extra-mile features `light-dark-mode.feature.md` and `languages.feature.md`.
- Closing the menu with the Escape key or a click outside it: no source asks for it.
- A "not found" page for unknown paths: no source asks for one.

### Feature-Specific Constraints

- **Exception to the Global Definition of Done (implementation completeness):** this feature touches `src/App.jsx`, but the root route keeps the Vite demo content, now shown inside the layout. `home-page.feature.md` removes it. Decided by the site owner on 2026-11-04 and confirmed on 2026-11-05.
- **Dependencies:** this feature builds on `setup-deploy.feature.md`: the `react-router` dependency, `HashRouter` and the route table in `src/App.jsx`. Every other feature renders its page inside this layout.
- **Link targets owned by other features:** the header and footer link to `/portfolio`, `/links` and `/contact` before those routes exist. `portfolio-page.feature.md`, `link-page.feature.md` and `contact-page.feature.md` add their routes at exactly these paths.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Every route inside the shared layout

**Requirement:**
Every path renders inside the shared layout: the header first, then the route's content, then the footer. This includes the hidden routes and paths that have no route.

**Expected Result:**
On `/#/`, on `/#/portfolio` and on `/#/does-not-exist`, the same header appears above the content area and the same footer below it.

### FR-02 — Header stays visible while scrolling

**Requirement:**
The header stays at the top of the window while the page scrolls.

**Expected Result:**
After scrolling to the bottom of a page taller than the window, the header is still fully visible at the top of the window.

### FR-03 — Header links to every public page

**Requirement:**
The header navigation holds exactly four links, in this order: Home (`/`), Portfolio (`/portfolio`), Links (`/links`), Contact (`/contact`).

**Expected Result:**
The header shows the four links in that order. Neither the header nor the footer links to any internal path other than `/`, `/portfolio`, `/links` and `/contact`, so the login route and `/backoffice` never appear.

### FR-04 — Current page marked

**Requirement:**
The navigation link of the page being viewed is marked as the current page, visually and for assistive technology, in the link row and in the open narrow-viewport menu.

**Expected Result:**
On `/#/portfolio`, only the Portfolio link is underlined in the accent colour and carries `aria-current="page"`. On `/#/`, only Home is marked. On a path that matches none of the four links, no link is marked.

### FR-05 — Logo in the header

**Requirement:**
The header shows the AI-generated logo image.

**Expected Result:**
The logo image appears in the header on every page.

### FR-06 — Logo returns to Home

**Requirement:**
Clicking the logo takes the visitor to the Home page.

**Expected Result:**
From any page, clicking the logo shows `/#/`.

### FR-07 — Logo alt text

**Requirement:**
The logo image has the alt text `Jacob Williams logo, back to Home`.

**Expected Result:**
The logo `<img>` element's `alt` attribute is `Jacob Williams logo, back to Home`, and a screen reader announces it as the name of the Home link.

### FR-08 — Logo generating tool documented

**Requirement:**
The tool that generated the logo is named in a code comment beside the logo import.

**Expected Result:**
`src/components/Header.jsx` holds a comment next to the `logo.png` import stating that the logo was generated with ChatGPT.

### FR-09 — Footer email address

**Requirement:**
The footer shows the site owner's email address as a link that opens the visitor's mail app.

**Expected Result:**
The footer shows `jacobwilliams2156@gmail.com` as a link to `mailto:jacobwilliams2156@gmail.com`.

### FR-10 — Footer profile links

**Requirement:**
The footer links to the site owner's LinkedIn and GitHub profiles, each opening in a new tab.

**Expected Result:**
The footer shows a "LinkedIn" link to `https://www.linkedin.com/in/jacob-williams-profile/` and a "GitHub" link to `https://github.com/jacobwilliams-dev`; clicking either opens the profile in a new tab and leaves the site open.

### FR-11 — Footer link to the Contact page

**Requirement:**
The footer links to the Contact page.

**Expected Result:**
The footer shows a "Contact page" link; clicking it shows `/#/contact` in the same tab.

### FR-12 — Copyright notice

**Requirement:**
The footer shows a copyright notice made of the © symbol, the current year and the site owner's full name.

**Expected Result:**
In 2026 the footer reads `© 2026 Jacob Williams`; the year follows the visitor's clock.

### FR-13 — Compact navigation on narrow viewports

**Requirement:**
At a viewport width of 1024px or less, the four links are hidden behind a menu button; above 1024px, the links show in a row and the menu button is hidden.

**Expected Result:**
At 1280px wide, the header shows the logo and the four links, and no menu button. At 1024px and at 320px wide, the header shows the logo, the current page name and a "Menu" button, and the links are hidden.

### FR-14 — Menu button toggles the links

**Requirement:**
On narrow viewports, the menu button shows and hides the list of links, and reports its state to assistive technology.

**Expected Result:**
Pressing "Menu" shows the four links as a list under the header bar; the button then reads "Close" and has `aria-expanded="true"`. Pressing "Close" hides the list; the button reads "Menu" and has `aria-expanded="false"`. The button's `aria-controls` matches the `id` of the link list.

### FR-15 — Menu closes after a link is chosen

**Requirement:**
Choosing any header link (one of the four links or the logo) while the menu is open closes the menu.

**Expected Result:**
With the menu open, tapping "Portfolio" shows the Portfolio page with the menu closed. Tapping the logo shows Home with the menu closed.

### FR-16 — Keyboard access to the navigation

**Requirement:**
The logo, the menu button and every header link can be reached and used with the keyboard alone, and show a visible focus outline.

**Expected Result:**
At 320px wide, Tab reaches the logo and then the menu button; Enter or Space opens the menu; Tab then reaches each link, and Enter follows it. Each control shows an outline while it has keyboard focus.

### FR-17 — Navigation does not cover the page content

**Requirement:**
The header stays in the page flow, so it never covers the start of the page content, and the closed narrow-viewport menu takes no space beyond the header bar.

**Expected Result:**
At the top of any page, at 320px and at 1280px wide, the first line of the page content shows in full below the header. At 320px wide with the menu closed, the header is a single bar holding only the logo, the current page name (FR-18) and the "Menu" button.

### FR-18 — Current page name on narrow viewports

**Requirement:**
At a viewport width of 1024px or less, the header bar shows the name of the current page between the logo and the menu button, whether the menu is open or closed. Above 1024px the name is hidden, because the link row already marks the current page.

**Expected Result:**
At 320px wide, the bar reads "Portfolio" on `/#/portfolio` and "Home" on `/#/`, and shows no name on a path that matches none of the four links. At 1280px wide, the header shows no separate page name.

---

## 4. Decisions Already Taken

- **D-01:** The `Layout` component receives the route table as its children inside `HashRouter` (`HashRouter` > `Layout` > `Routes`), so the header and footer render on every path, including paths with no route yet - site owner approval, 2026-11-05; business doc (The Shared Layout: every page renders inside a shared layout component).
- **D-02:** `Header` and `Footer` are separate components that `Layout` composes - project-wide spec (section 5: one component per file, small components).
- **D-03:** The three components live in `src/components/`, each with a stylesheet of the same name - project-wide spec (sections 3 and 5).
- **D-04:** The four navigation links use `NavLink` from `react-router`, which adds the `active` class and `aria-current="page"` to the link matching the current path; the Home link sets `end` so it matches `/` only - existing code (`react-router` 8.5.1 in `package.json`, already used by `src/App.jsx`).
- **D-05:** The link labels and their order are Home, Portfolio, Links, Contact - portal slides (Slide #7, What You Will Build); business doc (page names).
- **D-06:** The link paths are `/`, `/portfolio`, `/links` and `/contact` - business doc (Home is mounted at the root path); project-wide spec (section 5: lowercase route paths).
- **D-07:** The header uses `position: sticky` at the top of the window, not `position: fixed`, so it keeps its place in the page flow and never covers the top of the content - business doc (The Shared Layout: the header stays visible while the page scrolls; the navigation does not obstruct the content).
- **D-08:** The narrow-viewport styles apply at `max-width: 1024px`, the breakpoint `src/index.css` and `src/App.css` already use - existing code.
- **D-09:** On narrow viewports the navigation is a toggle button at the right of the header bar, labelled "Menu" when closed and "Close" when open, that shows the links as a vertical list inside the header, under the bar - site owner decision, 2026-11-05.
- **D-10:** The logo is generated with ChatGPT and saved as `src/assets/logo.png`, imported by `Header.jsx` - site owner decision, 2026-11-05; project-wide spec (section 5: images imported by components go in `src/assets/`).
- **D-11:** The logo's generating tool is documented in a code comment beside its import in `Header.jsx` - site owner decision, 2026-11-05.
- **D-12:** The footer's contact information is the email address `jacobwilliams2156@gmail.com`, the LinkedIn profile `https://www.linkedin.com/in/jacob-williams-profile/`, the GitHub profile `https://github.com/jacobwilliams-dev`, and a link to the Contact page - site owner decision, 2026-11-05.
- **D-13:** The LinkedIn and GitHub links open in a new tab with `rel="noopener noreferrer"`; the email and Contact page links open in the same tab - site owner decision, 2026-11-05.
- **D-14:** The layout's styles use the colour variables `src/index.css` already defines (`--bg`, `--border`, `--text-h`, `--accent`), so `src/index.css` stays unchanged - existing code.
- **D-15:** The root route keeps the Vite demo content until `home-page.feature.md` replaces it - site owner decision, 2026-11-04 (recorded in `setup-deploy.feature.md`), confirmed 2026-11-05.
- **D-16:** On narrow viewports, the header bar shows the label of the current page's link, found by matching the path from `useLocation` (`react-router`) against the same list of four links the navigation uses - site owner decision, 2026-11-05.

---

## 5. Task Breakdown

Order: the logo comes first because the header imports it; then the header (link row first, then the narrow-viewport menu), the footer, and the layout that composes them. `src/App.jsx`, the shared file, changes last, so the app keeps working at every commit until the layout is ready. Verification ends the feature.

1. **T-01 (FR-05, D-10):** Generate the logo with ChatGPT and save it as `src/assets/logo.png`. - `src/assets/logo.png`
2. **T-02 (FR-02, FR-03, FR-04, FR-05, FR-06, FR-07, FR-08, FR-16, FR-17, D-02 to D-07, D-11, D-14):** Create `Header`: a `<header>` holding a `Link` to `/` around the logo image (alt text from FR-07, with a comment naming ChatGPT beside the logo import), and a `<nav aria-label="Main">` holding the four `NavLink`s in order, with `end` on Home. Style the header sticky at the top with the page background and a bottom border, mark the `active` link with the accent colour and an underline, and give the logo and links a visible focus outline. - `src/components/Header.jsx`, `src/components/Header.css`
3. **T-03 (FR-04, FR-13, FR-14, FR-15, FR-16, FR-17, FR-18, D-08, D-09, D-16):** Add the narrow-viewport menu to `Header`: an open/closed state that starts closed; a `type="button"` toggle reading "Menu" or "Close" with `aria-expanded` and `aria-controls` pointing to the link list's `id`; clicking any header link or the logo closes the menu. Between the logo and the button, show the label of the link whose path matches the current path, or nothing when none matches. At `max-width: 1024px`, show the button and the page name, and hide the links unless the menu is open; above it, hide the button and the page name, and always show the links in a row. - `src/components/Header.jsx`, `src/components/Header.css`
4. **T-04 (FR-09, FR-10, FR-11, FR-12, D-02, D-03, D-12, D-13, D-14):** Create `Footer`: a `<footer>` with the email `mailto:` link, the LinkedIn and GitHub links (new tab, `rel="noopener noreferrer"`), a `Link` to `/contact` reading "Contact page", and the copyright notice built from the current year. Let the items wrap on narrow viewports. - `src/components/Footer.jsx`, `src/components/Footer.css`
5. **T-05 (FR-01, D-01, D-02, D-03):** Create `Layout`: render `Header`, then a `<main>` holding its `children`, then `Footer`. Let `<main>` fill the free height of `#root`, so the footer sits at the bottom of the window on short pages. - `src/components/Layout.jsx`, `src/components/Layout.css`
6. **T-06 (FR-01, D-01, D-15):** In `src/App.jsx`, import `Layout` and place the existing `Routes` inside it, inside `HashRouter`. Leave the demo markup, its counter state, its imports and `App.css` unchanged. - `src/App.jsx`
7. **T-07 (FR-01 to FR-18):** Run `npm run lint`, `npm run build` and `npm run preview`, then check every criterion in section 11 at 320px, 1024px and 1280px wide. - no file

---

## 6. User Flow

**Main flow**

1. A visitor opens any page of the site.
2. The header shows the logo and the four links; the link of the current page is marked. The page content follows, then the footer.
3. The visitor scrolls down; the header stays at the top of the window.
4. The visitor clicks another link; that page renders between the same header and footer, and the mark moves to its link.
5. The visitor clicks the logo; the Home page renders.
6. At the bottom of the page, the visitor uses the footer to email the site owner, open the LinkedIn or GitHub profile in a new tab, or go to the Contact page.

**Alternate / failure flow**

1. A visitor opens the site on a phone (1024px wide or less); the header shows the logo, the current page name and a "Menu" button, and the links are hidden.
2. The visitor taps "Menu"; the links appear as a list under the header bar, the current page is marked, and the button reads "Close".
3. The visitor taps a link; the menu closes, the chosen page renders, and the header bar shows its name.
4. Or the visitor taps "Close"; the menu closes and the page stays the same.

---

## 7. Interfaces Involved

### Pages

- `/` (`/#/`) - existing route: shows the Vite demo content inside the layout until `home-page.feature.md` replaces it.
- `/portfolio`, `/links`, `/contact` - new link targets: the header and footer link to them; their routes are added by their own features.
- The login route and `/backoffice` - render inside the layout once their features add them; never linked from the header or footer.

### Components

- `Layout` (`src/components/Layout.jsx`) - new: renders the header, the route content in `<main>`, and the footer.
- `Header` (`src/components/Header.jsx`) - new: logo link to Home, the four navigation links, the narrow-viewport current page name, the menu button and its open/closed state.
- `Footer` (`src/components/Footer.jsx`) - new: contact links and copyright notice.
- `App` (`src/App.jsx`) - existing, changed: wraps the route table in `Layout`.
- `NavLink`, `Link`, `useLocation` (`react-router`) - existing dependency, first used here: navigation links, current-page marking, and the current path for the narrow-viewport page name.
- `src/assets/logo.png` - new: the AI-generated logo.
- `src/index.css` - existing, unchanged: provides the colour variables and the full-height flex column on `#root` that the layout relies on.

### Endpoints

N/A - this feature calls no Supabase or other endpoint.

---

## 8. Data

### Inputs

- Current path (text, the part of the URL after `#`) - read from the router by each `NavLink` to decide whether it is the current page, and by `Header` through `useLocation` to pick the page name shown on narrow viewports.
- Menu state (boolean, starts closed) - local state in `Header`, changed by the menu button and by the header links.
- Current year (four-digit number) - read from the visitor's clock when the footer renders.

### Outputs / Returned Data

- Header: the logo link to `/`, the four links with `aria-current="page"` on the current one, the current page name on narrow viewports, and the menu button with `aria-expanded` set to `true` or `false`.
- Footer: the email link, the LinkedIn and GitHub links, the Contact page link, and the copyright text.

### Stored / Modified Data

N/A - this feature stores nothing.

---

## 9. Validation

N/A - this feature has no form and takes no user input to check.

---

## 10. Expected Behavior

### Success Behavior

- Every page shows the same header above its content and the same footer below it.
- The header stays visible at the top of the window while the page scrolls.
- The link of the current page is underlined in the accent colour and announced as the current page.
- Clicking a header link shows that page; clicking the logo shows Home.
- The footer's email link opens the visitor's mail app; the LinkedIn and GitHub links open in a new tab; the Contact page link shows the Contact page.
- On a narrow viewport, the header bar shows the current page name, the menu button shows and hides the links, and choosing a link closes the menu.

### Error / Invalid Behavior

- The logo image fails to load: the browser shows its alt text in its place, and the link still returns to Home.

### Empty / Edge Cases

- A header or footer link points to a page whose route does not exist yet: the layout renders with an empty content area, and the matching header link is marked as current.
- A hidden route or an unknown path is open: the layout renders, no header link is marked as current, and the narrow-viewport header bar shows no page name.
- A page is shorter than the window: the footer sits at the bottom of the window, not in the middle of the page.

---

## 11. Acceptance Criteria

- [ ] On `/#/`, `/#/portfolio` and `/#/does-not-exist`, the same header appears above the content area and the same footer below it. (FR-01)
- [ ] On `/#/does-not-exist`, where the content area is empty, the footer sits at the bottom edge of the window. (FR-01)
- [ ] At 320px wide, after scrolling `/#/` to the bottom, the header is still fully visible at the top of the window. (FR-02)
- [ ] The header navigation holds exactly four links, in the order Home, Portfolio, Links, Contact, with the targets `#/`, `#/portfolio`, `#/links` and `#/contact`. (FR-03)
- [ ] No link in the header or footer points to an internal path other than `/`, `/portfolio`, `/links` and `/contact`. (FR-03)
- [ ] On `/#/portfolio`, only the Portfolio link is underlined in the accent colour and has `aria-current="page"`; on `/#/`, only Home is marked; on `/#/does-not-exist`, no link is marked. (FR-04)
- [ ] At 320px wide on `/#/portfolio`, the open menu marks the Portfolio link the same way. (FR-04)
- [ ] The header shows the image from `src/assets/logo.png` on every page checked for FR-01. (FR-05)
- [ ] From `/#/portfolio`, clicking the logo shows `/#/`. (FR-06)
- [ ] The logo `<img>` has `alt="Jacob Williams logo, back to Home"`. (FR-07)
- [ ] `src/components/Header.jsx` has a comment beside the `logo.png` import naming ChatGPT as the generating tool. (FR-08)
- [ ] The footer shows `jacobwilliams2156@gmail.com` as a link whose `href` is `mailto:jacobwilliams2156@gmail.com`. (FR-09)
- [ ] The footer's "LinkedIn" link has `href="https://www.linkedin.com/in/jacob-williams-profile/"` and the "GitHub" link has `href="https://github.com/jacobwilliams-dev"`; both have `target="_blank"` and `rel="noopener noreferrer"`, and clicking each opens a new tab while the site stays open. (FR-10)
- [ ] Clicking the footer's "Contact page" link shows `/#/contact` in the same tab. (FR-11)
- [ ] The footer reads `© 2026 Jacob Williams`. (FR-12)
- [ ] At 1280px wide, the header shows the logo and the four links and no menu button; at 1024px and at 320px wide, it shows the logo, the current page name and a "Menu" button, and the links are hidden. (FR-13)
- [ ] At 320px wide, pressing "Menu" shows the four links as a list under the header bar, the button reads "Close" with `aria-expanded="true"`; pressing "Close" hides the list, and the button reads "Menu" with `aria-expanded="false"`. The button's `aria-controls` equals the `id` of the link list. (FR-14)
- [ ] At 320px wide with the menu open, tapping "Portfolio" shows `/#/portfolio` with the menu closed, and tapping the logo shows `/#/` with the menu closed. (FR-15)
- [ ] At 320px wide, using only the keyboard: Tab reaches the logo and then the menu button, Enter and Space each open the menu, Tab then reaches each of the four links, and Enter follows the focused link; every focused control shows a visible outline. (FR-16)
- [ ] At 1280px wide, using only the keyboard, Tab reaches the logo and each of the four links with a visible outline, and Enter follows the focused link. (FR-16)
- [ ] At the top of `/#/`, at 320px and at 1280px wide, the first line of the page content shows in full below the header. (FR-17)
- [ ] At 320px wide with the menu closed, the header is a single bar holding only the logo, the current page name and the "Menu" button. (FR-17)
- [ ] At 320px wide with the menu closed, the bar reads "Portfolio" between the logo and the "Menu" button on `/#/portfolio`, and "Home" on `/#/`. (FR-18)
- [ ] At 320px wide, opening the menu and tapping "Links" changes the bar's page name to "Links". (FR-18)
- [ ] At 320px wide on `/#/does-not-exist`, the bar shows no page name. (FR-18)
- [ ] At 1280px wide on `/#/portfolio`, the header shows no page name apart from the marked link in the link row. (FR-18)
