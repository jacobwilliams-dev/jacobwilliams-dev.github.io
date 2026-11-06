# Feature Specification — Project Layout

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Project Layout
- **Related Area:** Front-end: shared layout, header navigation, footer, narrow-viewport navigation, site-wide visual base

---

## 1. Feature Goal

Every page of the site sits inside one shared frame and one visual style, so the site reads as one thing rather than several. A header that stays visible while the visitor scrolls carries the AI-generated logo and links to every public page, and a footer carries the site owner's contact details and a copyright notice, all over a still starfield whose orbit lines turn as the visitor moves between pages. Visitors always see which page they are on and can move between pages at any screen size; on a phone the navigation folds into a compact menu that leaves the page content clear.

---

## 2. Feature Scope

### In Scope

- A shared layout component that renders the backdrop, the header, the current route's content and the footer.
- The header: the AI-generated logo linking to Home, and links to the four public pages.
- Marking the link of the page being viewed as the current page, and showing that page's name in the header bar on narrow viewports.
- The AI-generated logo image and the documentation of the tool that generated it.
- The footer: the logo with the site owner's name, the email address, the LinkedIn and GitHub profile links with their icons, and a copyright notice.
- The compact menu that replaces the link row on narrow viewports.
- The backdrop behind every page: the AI-generated starfield and the orbit drawing that rotates when the page changes.
- The site-wide visual base in `src/index.css`: colour variables, theme, fonts, text sizes, hover and focus styles, scrolling and section snapping, reduced motion.
- Wrapping the existing route table in the layout.

**Files this feature may change**

- `src/components/Layout.jsx`, `src/components/Layout.css` (new)
- `src/components/Header.jsx`, `src/components/Header.css` (new)
- `src/components/Footer.jsx`, `src/components/Footer.css` (new)
- `src/components/Backdrop.jsx`, `src/components/Backdrop.css` (new)
- `src/assets/logo.png`, `src/assets/starfield.png` (new)
- `src/App.jsx` (existing, shared with other features; change approved by the site owner on 2026-11-05)
- `src/index.css` (existing, shared with other features; change approved by the site owner on 2026-11-05)

### Out of Scope

- The routes and content of Portfolio, Links, Contact, the login route and `/backoffice`: each page's own feature specification adds its route to `src/App.jsx`.
- Removing the Vite demo content from the root route, from `src/App.css`, and the demo-only rules this feature keeps in `src/index.css`: `home-page.feature.md`.
- The `Frame` and `GoldButton` components, full-screen page sections, the "Scroll down" hint and glyph lines: built by the first page feature that uses them (`ai-spec.md` section 5, Visual Design).
- `src/main.jsx`: stays unchanged.
- Moving the orbit drawing up and down between pages, as the design reference does between chapters: only its rotation follows the page.
- The favicon (`public/favicon.svg`) and the page title in `index.html`: no source ties them to the layout.
- The optional secret keyboard event that opens the login route: `login-page.feature.md`.
- A light/dark theme switch or a language switcher in the header: the extra-mile features `light-dark-mode.feature.md` and `languages.feature.md`.
- Closing the menu with the Escape key or a click outside it: no source asks for it.
- A "not found" page for unknown paths: no source asks for one.

### Feature-Specific Constraints

- **Exception to the Global Definition of Done (implementation completeness):** this feature touches `src/App.jsx`, but the root route keeps the Vite demo content, now shown inside the layout and on the dark theme. `home-page.feature.md` removes it. Decided by the site owner on 2026-11-04 and confirmed on 2026-11-05.
- **Dependencies:** this feature builds on `setup-deploy.feature.md`: the `react-router` dependency, `HashRouter` and the route table in `src/App.jsx`. Every other feature renders its page inside this layout and styles it with the variables this feature defines in `src/index.css`.
- **Link targets owned by other features:** the header links to `/portfolio`, `/links` and `/contact` before those routes exist. `portfolio-page.feature.md`, `link-page.feature.md` and `contact-page.feature.md` add their routes at exactly these paths.

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
On `/#/portfolio`, only the Portfolio link shows in `--text` with a `--peach` line under it and carries `aria-current="page"`; the other links stay `--text-muted`. On `/#/`, only Home is marked. On a path that matches none of the four links, no link is marked.

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
The tool that generated the logo is named in a code comment beside each logo import.

**Expected Result:**
`src/components/Header.jsx` and `src/components/Footer.jsx` each hold a comment next to their `logo.png` import stating that the logo was generated with ChatGPT.

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

### FR-11 — Copyright notice

**Requirement:**
The footer shows a copyright notice made of the © symbol, the current year and the site owner's full name, followed by "All rights reserved."

**Expected Result:**
In 2026 the footer reads `© 2026 Jacob Williams. All rights reserved.`; the year follows the visitor's clock.

### FR-12 — Compact navigation on narrow viewports

**Requirement:**
At a viewport width of 760px or less, the four links are hidden behind a menu button; above 760px, the links show in a row and the menu button is hidden.

**Expected Result:**
At 1280px and at 761px wide, the header shows the logo and the four links, and no menu button. At 760px and at 320px wide, the header shows the logo, the current page name and a "Menu" button, and the links are hidden.

### FR-13 — Menu button toggles the links

**Requirement:**
On narrow viewports, the menu button shows and hides the list of links, and reports its state to assistive technology.

**Expected Result:**
Pressing "Menu" shows the four links as a list under the header bar; the button then reads "Close" and has `aria-expanded="true"`. Pressing "Close" hides the list; the button reads "Menu" and has `aria-expanded="false"`. The button's `aria-controls` matches the `id` of the link list.

### FR-14 — Menu closes after a link is chosen

**Requirement:**
Choosing any header link (one of the four links or the logo) while the menu is open closes the menu.

**Expected Result:**
With the menu open, tapping "Portfolio" shows the Portfolio page with the menu closed. Tapping the logo shows Home with the menu closed.

### FR-15 — Keyboard access to the navigation

**Requirement:**
The logo, the menu button and every header link can be reached and used with the keyboard alone, and show a visible focus outline.

**Expected Result:**
At 320px wide, Tab reaches the logo and then the menu button; Enter or Space opens the menu; Tab then reaches each link, and Enter follows it. Each control shows an outline while it has keyboard focus.

### FR-16 — Navigation does not cover the page content

**Requirement:**
The header stays in the page flow, so it never covers the start of the page content, and the closed narrow-viewport menu takes no space beyond the header bar.

**Expected Result:**
At the top of any page, at 320px and at 1280px wide, the first line of the page content shows in full below the header. At 320px wide with the menu closed, the header is a single bar holding only the logo, the current page name (FR-17) and the "Menu" button.

### FR-17 — Current page name on narrow viewports

**Requirement:**
At a viewport width of 760px or less, the header bar shows the name of the current page between the logo and the menu button, whether the menu is open or closed. Above 760px the name is hidden, because the link row already marks the current page.

**Expected Result:**
At 320px wide, the bar reads "Portfolio" on `/#/portfolio` and "Home" on `/#/`, and shows no name on a path that matches none of the four links. At 1280px wide, the header shows no separate page name.

### FR-18 — Site-wide visual base

**Requirement:**
Every page uses the colour variables, dark theme, fonts, text sizes, and hover and focus styles that `ai-spec.md` section 5 (Visual Design) defines.

**Expected Result:**
On any page, the background is `#020304`, body text is Arial at 16px, headings use Trebuchet MS, links turn `--gold` on hover, and keyboard focus shows a 2px `--gold` outline offset by 6px.

### FR-19 — Section snapping below the header

**Requirement:**
Wider than 760px, the page snaps to the start of each full-screen section, with the section's top just below the header. At 760px or less, the page does not snap.

**Expected Result:**
At 1280px wide, the page has `scroll-snap-type: y proximity` and a `scroll-padding-top` equal to the header's height. At 760px wide, `scroll-snap-type` is `none`.

### FR-20 — Starfield behind every page

**Requirement:**
An AI-generated starfield image fills the window behind every page and stays still while the page scrolls.

**Expected Result:**
On every page the starfield shows behind the header, content and footer. Scrolling moves the content but not the stars.

### FR-21 — Orbit drawing behind every page

**Requirement:**
A faint orbit-line drawing stays fixed behind the content of every page and never blocks a click.

**Expected Result:**
The drawing shows at low opacity behind the content on every page, and a link or button the drawing overlaps still responds to a click.

### FR-22 — Orbit turns when the page changes

**Requirement:**
When the visitor changes page, the orbit drawing rotates to that page's angle over 1.8 seconds.

**Expected Result:**
Going from Home to Portfolio turns the drawing smoothly from −15° to 27° over 1.8 seconds, and going back turns it back. A path that matches none of the four links uses Home's angle. With reduced motion on, the angle changes with no animation.

---

## 4. Decisions Already Taken

- **D-01:** The `Layout` component receives the route table as its children inside `HashRouter` (`HashRouter` > `Layout` > `Routes`), so the header and footer render on every path, including paths with no route yet - site owner approval, 2026-11-05; business doc (The Shared Layout: every page renders inside a shared layout component).
- **D-02:** `Header`, `Footer` and `Backdrop` are separate components that `Layout` composes - project-wide spec (section 5: one component per file, small components).
- **D-03:** The four components live in `src/components/`, each with a stylesheet of the same name - project-wide spec (sections 3 and 5).
- **D-04:** The four navigation links use `NavLink` from `react-router`, which adds the `active` class and `aria-current="page"` to the link matching the current path; the Home link sets `end` so it matches `/` only - existing code (`react-router` 8.5.1 in `package.json`, already used by `src/App.jsx`).
- **D-05:** The link labels and their order are Home, Portfolio, Links, Contact - portal slides (Slide #7, What You Will Build); business doc (page names).
- **D-06:** The link paths are `/`, `/portfolio`, `/links` and `/contact` - business doc (Home is mounted at the root path); project-wide spec (section 5: lowercase route paths).
- **D-07:** The header uses `position: sticky` at the top of the window, not `position: fixed`, so it keeps its place in the page flow and never covers the top of the content - business doc (The Shared Layout: the header stays visible while the page scrolls; the navigation does not obstruct the content).
- **D-08:** The narrow-viewport styles apply at `max-width: 760px` - project-wide spec (section 5, Visual Design: breakpoint).
- **D-09:** On narrow viewports the navigation is a toggle button at the right of the header bar, labelled "Menu" when closed and "Close" when open, that shows the links as a vertical list inside the header, under the bar - site owner decision, 2026-11-05.
- **D-10:** The logo is generated with ChatGPT and saved as `src/assets/logo.png` (480 × 195 px), imported by `Header.jsx` and `Footer.jsx`. Its starfield background was removed with a Python script (Pillow), keeping only the letters, the orbit arcs and the dot - site owner decision, 2026-11-05; project-wide spec (section 5: images imported by components go in `src/assets/`).
- **D-11:** The logo's generating tool is documented in a code comment beside each of its imports, in `Header.jsx` and `Footer.jsx` - site owner decision, 2026-11-05.
- **D-12:** The footer's contact information is the email address `jacobwilliams2156@gmail.com`, the LinkedIn profile `https://www.linkedin.com/in/jacob-williams-profile/` and the GitHub profile `https://github.com/jacobwilliams-dev`. The footer has no Contact page link, because the header already links to Contact - site owner decision, 2026-11-05.
- **D-13:** The LinkedIn and GitHub links open in a new tab with `rel="noopener noreferrer"`; the email link opens the visitor's mail app - site owner decision, 2026-11-05.
- **D-14:** `src/index.css` replaces the Vite starter styles with the visual base: the eight colour variables, a `--header-height` variable, `color-scheme: dark`, the body background, text colour, fonts and size, the `h1`, `h2` and `p` styles, the global hover and focus styles, smooth scrolling, section snapping above 760px with `scroll-padding-top: var(--header-height)`, and the reduced-motion rule. `#root` keeps its full-height flex column but loses the 1126px width, the side borders and the centred text - project-wide spec (section 5, Visual Design); site owner approval of the `src/index.css` change, 2026-11-05.
- **D-15:** The root route keeps the Vite demo content until `home-page.feature.md` replaces it - site owner decision, 2026-11-04 (recorded in `setup-deploy.feature.md`), confirmed 2026-11-05.
- **D-16:** `Layout` holds the list of four links and reads the current path once with `useLocation` (`react-router`). It passes the list and the matching entry to `Header` (navigation and narrow-viewport page name), and the entry's position in the list to `Backdrop` (orbit angle) - site owner decision, 2026-11-05 (page name); project-wide spec (section 5: reuse one source instead of a second copy).
- **D-17:** `Layout` renders `Backdrop` as a fixed layer behind the header, content and footer. Its starfield and orbit drawing are decorative: the starfield `<img>` has `alt=""` and the drawing has `aria-hidden="true"` - site owner decision, 2026-11-05.
- **D-18:** The starfield is generated with ChatGPT, saved as `src/assets/starfield.png`, and its tool is named in a comment beside its import in `Backdrop.jsx` - site owner decision, 2026-11-05.
- **D-19:** The orbit drawing is the inline SVG of circles, an ellipse, two arcs and dots from the site owner's design reference, drawn in `--text-faint` at 0.45 opacity, 66vw wide and partly off the top-left of the window (130vw wide at 760px or less) - site owner's design reference; site owner decision, 2026-11-05 (opacity, chosen in the layout preview).
- **D-20:** The orbit angle is the page's position in the link list (Home 0 to Contact 3) × 42°, minus 15°: Home −15°, Portfolio 27°, Links 69°, Contact 111°. A path with no match uses Home's angle - site owner's design reference, 2026-11-05 (42° per chapter, starting at −15°).
- **D-21:** The header is a plain full-width bar with an `--ink` background at 80% opacity and a 1px `--line` bottom border. Above 760px the logo sits at the left of the bar and the link row at the right. The links and the narrow-viewport page name are 12px bold capitals with 1.8px letter-spacing, made capital by CSS so the link text stays "Home", "Portfolio", "Links" and "Contact". Inactive links are `--text-muted`; the current link is `--text` with a 1px `--peach` line under it. The menu button uses the same capitals inside a 1px `--line` outline, and the open menu has an `--ink` background - project-wide spec (section 5, Visual Design); site owner's design reference; site owner decision, 2026-11-05 (plain bar and links at the right, chosen in the layout preview).
- **D-22:** The logo PNG has a transparent background, so it sits directly on the header bar with no blend mode - site owner decision, 2026-11-05.
- **D-23:** The footer has a 1px `--line` top border and three groups in one row, spread apart with space between them: at the left, the logo (`alt=""`, because the name beside it already says who it is) grouped with the name "Jacob Williams" in the heading font, bold, in `--text`; in the middle, a "Get in touch" column holding the email link and a "Find me online" column holding the LinkedIn and GitHub links; at the right, the copyright notice. When the window is too narrow for one row, the groups wrap, and at 760px or less they stack and line up at the left. The column labels are 12px bold capitals with 1.8px letter-spacing in `--text-faint`, made capital by CSS. The links are `--text-muted` with no underline and turn `--gold` on hover; the copyright is at least 12px in `--text-faint`. The footer has `scroll-snap-align: end`, so on wide viewports, where the page snaps to section starts, scrolling to the bottom still shows the whole footer instead of snapping back to the last section - site owner decision, 2026-11-05 (footer layout and reference image); site owner's design reference.
- **D-24:** The LinkedIn and GitHub links each show the brand's icon before the label. Each icon is an inline SVG in `Footer.jsx` with `aria-hidden="true"` and `fill: currentColor`, so it takes the link's colour and the visible label stays the link's name. No icon package is added - site owner decision, 2026-11-05; project-wide spec (section 5, Visual Design: brand icon exception; section 4: ask before adding a dependency).

---

## 5. Task Breakdown

Order: the two images come first because the header, the footer and the backdrop import them; then the visual base in `src/index.css`, because every component uses its variables; then the header (link row first, then the narrow-viewport menu), the footer, the backdrop, and the layout that composes them. `src/App.jsx` changes last, so the app keeps working at every commit until the layout is ready. Verification ends the feature.

1. **T-01 (FR-05, D-10):** Generate the logo with ChatGPT and save it as `src/assets/logo.png`. - `src/assets/logo.png`
2. **T-02 (FR-20, D-18):** Generate the starfield with ChatGPT and save it as `src/assets/starfield.png`. - `src/assets/starfield.png`
3. **T-03 (FR-18, FR-19, D-14):** Replace the Vite starter styles in `src/index.css` with the visual base listed in D-14. Keep the rules and variables only the Vite demo uses (`code`, `.counter`, `#social .button-icon`, and the variables they and `src/App.css` read) at their existing dark-mode values, until `home-page.feature.md` removes the demo. - `src/index.css`
4. **T-04 (FR-02, FR-03, FR-04, FR-05, FR-06, FR-07, FR-08, FR-15, FR-16, D-02 to D-07, D-11, D-21, D-22):** Create `Header`: a `<header>` holding a `Link` to `/` around the logo image (alt text from FR-07, with a comment naming ChatGPT beside the logo import), and a `<nav aria-label="Main">` holding a `NavLink` for each entry of the link list it receives, with `end` on Home. Style the header sticky at the top, with the bar, link and current-link styles in D-21; the logo needs no blend mode (D-22). - `src/components/Header.jsx`, `src/components/Header.css`
5. **T-05 (FR-04, FR-12, FR-13, FR-14, FR-15, FR-16, FR-17, D-08, D-09, D-16, D-21):** Add the narrow-viewport menu to `Header`: an open/closed state that starts closed; a `type="button"` toggle reading "Menu" or "Close" with `aria-expanded` and `aria-controls` pointing to the link list's `id`; clicking any header link or the logo closes the menu. Between the logo and the button, show the label of the matching link entry it receives, or nothing when there is none. At `max-width: 760px`, show the button and the page name, and hide the links unless the menu is open; above it, hide the button and the page name, and always show the links in a row. - `src/components/Header.jsx`, `src/components/Header.css`
6. **T-06 (FR-08, FR-09, FR-10, FR-11, D-02, D-03, D-10 to D-13, D-23, D-24):** Create `Footer`: a `<footer>` holding three groups: the logo `<img alt="">` (with a comment naming ChatGPT beside the `logo.png` import) and the name "Jacob Williams"; a "Get in touch" column with the email `mailto:` link and a "Find me online" column with the LinkedIn and GitHub links (icons from D-24, new tab, `rel="noopener noreferrer"`); and the copyright notice built from the current year, followed by "All rights reserved.". Lay the groups out and style them as D-23 describes, including `scroll-snap-align: end`. - `src/components/Footer.jsx`, `src/components/Footer.css`
7. **T-07 (FR-20, FR-21, FR-22, D-17, D-18, D-19, D-20):** Create `Backdrop`: a fixed layer behind the page holding the starfield `<img alt="">` (with a comment naming ChatGPT beside its import) and the orbit SVG with `aria-hidden="true"` and no pointer events. Rotate the SVG to the angle in D-20 for the page position it receives, with a 1.8s ease transition on `transform`. - `src/components/Backdrop.jsx`, `src/components/Backdrop.css`
8. **T-08 (FR-01, FR-17, FR-22, D-01, D-02, D-03, D-16, D-17):** Create `Layout`: hold the list of four links, read the current path with `useLocation`, and find the matching entry. Render `Backdrop` with the entry's position, then `Header` with the list and the entry, a `<main>` holding its `children`, and `Footer`. Let `<main>` fill the free height of `#root`, so the footer sits at the bottom of the window on short pages. - `src/components/Layout.jsx`, `src/components/Layout.css`
9. **T-09 (FR-01, D-01, D-15):** In `src/App.jsx`, import `Layout` and place the existing `Routes` inside it, inside `HashRouter`. Leave the demo markup, its counter state, its imports and `App.css` unchanged. - `src/App.jsx`
10. **T-10 (FR-01 to FR-22):** Run `npm run lint`, `npm run build` and `npm run preview`, then check every criterion in section 11 at 320px, 760px, 761px and 1280px wide, and once with reduced motion turned on. - no file

---

## 6. User Flow

**Main flow**

1. A visitor opens any page of the site.
2. The starfield and the orbit drawing fill the window. The header shows the logo and the four links, with the current page's link marked. The page content follows, then the footer.
3. The visitor scrolls down; the header and the starfield stay where they are while the content moves.
4. The visitor clicks another link; that page renders between the same header and footer, the mark moves to its link, and the orbit drawing turns to the new page's angle.
5. The visitor clicks the logo; the Home page renders and the orbit drawing turns back.
6. At the bottom of the page, the visitor uses the footer to email the site owner, or open the LinkedIn or GitHub profile in a new tab.

**Alternate / failure flow**

1. A visitor opens the site on a phone (760px wide or less); the header shows the logo, the current page name and a "Menu" button, and the links are hidden.
2. The visitor taps "Menu"; the links appear as a list under the header bar, the current page is marked, and the button reads "Close".
3. The visitor taps a link; the menu closes, the chosen page renders, and the header bar shows its name.
4. Or the visitor taps "Close"; the menu closes and the page stays the same.

---

## 7. Interfaces Involved

### Pages

- `/` (`/#/`) - existing route: shows the Vite demo content inside the layout until `home-page.feature.md` replaces it.
- `/portfolio`, `/links`, `/contact` - new link targets: the header links to them; their routes are added by their own features.
- The login route and `/backoffice` - render inside the layout once their features add them; never linked from the header or footer.

### Components

- `Layout` (`src/components/Layout.jsx`) - new: holds the link list, reads the current path, and renders the backdrop, the header, the route content in `<main>`, and the footer.
- `Header` (`src/components/Header.jsx`) - new: logo link to Home, the four navigation links, the narrow-viewport current page name, the menu button and its open/closed state.
- `Footer` (`src/components/Footer.jsx`) - new: the logo with the site owner's name, the contact links with the LinkedIn and GitHub icons, and the copyright notice.
- `Backdrop` (`src/components/Backdrop.jsx`) - new: fixed starfield and orbit drawing behind every page.
- `App` (`src/App.jsx`) - existing, changed: wraps the route table in `Layout`.
- `NavLink`, `Link`, `useLocation` (`react-router`) - existing dependency, first used here: navigation links, current-page marking, and the current path.
- `src/assets/logo.png`, `src/assets/starfield.png` - new: the AI-generated logo and starfield.
- `src/index.css` - existing, changed: the visual base every page uses.

### Endpoints

N/A - this feature calls no Supabase or other endpoint.

---

## 8. Data

### Inputs

- Current path (text, the part of the URL after `#`) - read from the router by each `NavLink` to decide whether it is the current page, and by `Layout` through `useLocation` to find the matching link entry.
- Link list (four entries, each a label and a path) - fixed in `Layout`, passed to `Header`.
- Page position (number 0 to 3, or none) - the matching entry's place in the link list, passed from `Layout` to `Backdrop`.
- Menu state (boolean, starts closed) - local state in `Header`, changed by the menu button and by the header links.
- Current year (four-digit number) - read from the visitor's clock when the footer renders.

### Outputs / Returned Data

- Header: the logo link to `/`, the four links with `aria-current="page"` on the current one, the current page name on narrow viewports, and the menu button with `aria-expanded` set to `true` or `false`.
- Footer: the logo and name, the "Get in touch" and "Find me online" labels, the email link, the LinkedIn and GitHub links with their icons, and the copyright text.
- Backdrop: the orbit drawing's rotation angle in degrees (−15, 27, 69 or 111).

### Stored / Modified Data

N/A - this feature stores nothing.

---

## 9. Validation

N/A - this feature has no form and takes no user input to check.

---

## 10. Expected Behavior

### Success Behavior

- Every page shows the dark visual base, the starfield and the orbit drawing, the same header above its content and the same footer below it.
- The header and the starfield stay still while the page content scrolls.
- The link of the current page shows in `--text` with a `--peach` line under it and is announced as the current page.
- Clicking a header link shows that page and turns the orbit drawing to its angle over 1.8 seconds; clicking the logo shows Home.
- The footer's email link opens the visitor's mail app; the LinkedIn and GitHub links open in a new tab.
- On a narrow viewport, the header bar shows the current page name, the menu button shows and hides the links, and choosing a link closes the menu.

### Error / Invalid Behavior

- The logo image fails to load: the header shows its alt text in its place, and the link still returns to Home; the footer shows only the name, because its logo has empty alt text.
- The starfield image fails to load: the `--bg` background shows instead, and the page stays readable.

### Empty / Edge Cases

- A header link points to a page whose route does not exist yet: the layout renders with an empty content area, and the matching header link is marked as current.
- A hidden route or an unknown path is open: the layout renders, no header link is marked as current, the narrow-viewport header bar shows no page name, and the orbit drawing uses Home's angle.
- A page is shorter than the window: the footer sits at the bottom of the window, not in the middle of the page.
- Reduced motion is turned on: the orbit drawing jumps to its new angle and no hover transition animates.

---

## 11. Acceptance Criteria

- [ ] On `/#/`, `/#/portfolio` and `/#/does-not-exist`, the same header appears above the content area and the same footer below it. (FR-01)
- [ ] On `/#/does-not-exist`, where the content area is empty, the footer sits at the bottom edge of the window. (FR-01)
- [ ] At 320px wide, after scrolling `/#/` to the bottom, the header is still fully visible at the top of the window. (FR-02)
- [ ] The header navigation holds exactly four links, in the order Home, Portfolio, Links, Contact, with the targets `#/`, `#/portfolio`, `#/links` and `#/contact`. (FR-03)
- [ ] No link in the header or footer points to an internal path other than `/`, `/portfolio`, `/links` and `/contact`. (FR-03)
- [ ] On `/#/portfolio`, only the Portfolio link shows in `--text` with a `--peach` line under it and has `aria-current="page"`, while the other links are `--text-muted`; on `/#/`, only Home is marked; on `/#/does-not-exist`, no link is marked. (FR-04)
- [ ] At 320px wide on `/#/portfolio`, the open menu marks the Portfolio link the same way. (FR-04)
- [ ] The header shows the image from `src/assets/logo.png` on every page checked for FR-01. (FR-05)
- [ ] From `/#/portfolio`, clicking the logo shows `/#/`. (FR-06)
- [ ] The logo `<img>` has `alt="Jacob Williams logo, back to Home"`. (FR-07)
- [ ] `src/components/Header.jsx` and `src/components/Footer.jsx` each have a comment beside their `logo.png` import naming ChatGPT as the generating tool. (FR-08)
- [ ] The footer shows `jacobwilliams2156@gmail.com` as a link whose `href` is `mailto:jacobwilliams2156@gmail.com`, under the label "Get in touch". (FR-09)
- [ ] The footer's "LinkedIn" link has `href="https://www.linkedin.com/in/jacob-williams-profile/"` and the "GitHub" link has `href="https://github.com/jacobwilliams-dev"`; both have `target="_blank"` and `rel="noopener noreferrer"`, and clicking each opens a new tab while the site stays open. (FR-10)
- [ ] The LinkedIn and GitHub links sit under the label "Find me online", each with its icon before the label; each icon's `<svg>` has `aria-hidden="true"`, so a screen reader reads only "LinkedIn" and "GitHub". (FR-10)
- [ ] The footer reads `© 2026 Jacob Williams. All rights reserved.` (FR-11)
- [ ] At 1280px and at 761px wide, the header shows the logo and the four links and no menu button; at 760px and at 320px wide, it shows the logo, the current page name and a "Menu" button, and the links are hidden. (FR-12)
- [ ] At 320px wide, pressing "Menu" shows the four links as a list under the header bar, the button reads "Close" with `aria-expanded="true"`; pressing "Close" hides the list, and the button reads "Menu" with `aria-expanded="false"`. The button's `aria-controls` equals the `id` of the link list. (FR-13)
- [ ] At 320px wide with the menu open, tapping "Portfolio" shows `/#/portfolio` with the menu closed, and tapping the logo shows `/#/` with the menu closed. (FR-14)
- [ ] At 320px wide, using only the keyboard: Tab reaches the logo and then the menu button, Enter and Space each open the menu, Tab then reaches each of the four links, and Enter follows the focused link; every focused control shows a visible outline. (FR-15)
- [ ] At 1280px wide, using only the keyboard, Tab reaches the logo and each of the four links with a visible outline, and Enter follows the focused link. (FR-15)
- [ ] At the top of `/#/`, at 320px and at 1280px wide, the first line of the page content shows in full below the header. (FR-16)
- [ ] At 320px wide with the menu closed, the header is a single bar holding only the logo, the current page name and the "Menu" button. (FR-16)
- [ ] At 320px wide with the menu closed, the bar reads "Portfolio" between the logo and the "Menu" button on `/#/portfolio`, and "Home" on `/#/`. (FR-17)
- [ ] At 320px wide, opening the menu and tapping "Links" changes the bar's page name to "Links". (FR-17)
- [ ] At 320px wide on `/#/does-not-exist`, the bar shows no page name. (FR-17)
- [ ] At 1280px wide on `/#/portfolio`, the header shows no page name apart from the marked link in the link row. (FR-17)
- [ ] `src/index.css` defines the eight colour variables from `ai-spec.md` section 5 with exactly those values, and no Vite light/dark colour switch remains. (FR-18)
- [ ] On `/#/`, the browser's computed styles show a body background of `rgb(2, 3, 4)`, a body font family starting with Arial at 16px, and an `h1` font family starting with "Trebuchet MS". (FR-18)
- [ ] Hovering a header or footer link turns it `rgb(180, 154, 99)` (`--gold`), and focusing it with Tab shows a 2px solid outline in the same colour. (FR-18)
- [ ] At 1280px wide, the `html` element's computed styles show `scroll-snap-type: y proximity` and a `scroll-padding-top` equal to the header's height; at 760px wide, `scroll-snap-type` is `none`. (FR-19)
- [ ] At 1280px wide, the footer's computed styles show `scroll-snap-align: end`, and scrolling to the bottom of a page leaves the whole footer in view. (FR-19)
- [ ] The starfield shows behind the content on `/#/`, `/#/portfolio` and `/#/does-not-exist`, and after scrolling `/#/` to the bottom the stars sit where they started. (FR-20)
- [ ] The starfield `<img>` has `alt=""`, and `src/components/Backdrop.jsx` has a comment beside the `starfield.png` import naming ChatGPT as the generating tool. (FR-20)
- [ ] The orbit drawing shows faintly behind the content on every page checked for FR-20, and every header and footer link it overlaps still opens when clicked. (FR-21)
- [ ] Going from `/#/` to `/#/portfolio` turns the orbit drawing from −15° to 27° in a visible 1.8-second rotation; `/#/links` shows 69°, `/#/contact` 111°, and `/#/does-not-exist` −15°. (FR-22)
- [ ] With reduced motion emulated in the browser's developer tools, changing page moves the orbit drawing to its new angle with no animation. (FR-22)
