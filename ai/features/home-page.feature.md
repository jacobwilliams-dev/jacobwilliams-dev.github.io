# Feature Specification — Home Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Home Page
- **Related Area:** Front-end: landing page, reusable page-section components, AI-generated imagery

---

## 1. Feature Goal

The site opens on a landing page that tells an employer who the site owner is and what they can do. A prominent introduction gives the owner's name, role and a short summary, and two parallel sections below it set out their technical skills and soft skills, each skill with an icon and a description. Three AI-generated images and clearly separated sections make the page read as a designed presentation rather than a list.

---

## 2. Feature Scope

### In Scope

- The Home page at the root path, replacing the Vite demo content.
- The introduction section: full name, tagline and short paragraph.
- The Technical Skills section: 21 entries in five labelled groups.
- The Soft Skills section: six entries.
- Three AI-generated images, one per section, with alt text and the generating tool documented.
- The first reusable page pieces from `ai-spec.md` section 5 that Home uses: `Frame`, full-screen page sections and the "Scroll down" hint.
- Removing the Vite demo: its markup and state in `src/App.jsx`, `src/App.css`, its assets, and its rules and variables in `src/index.css`.

**Files this feature may change**

- `src/pages/Home.jsx`, `src/pages/Home.css` (new)
- `src/components/Frame.jsx`, `src/components/Frame.css` (new)
- `src/components/PageSection.jsx`, `src/components/PageSection.css` (new)
- `src/components/ScrollHint.jsx`, `src/components/ScrollHint.css` (new)
- `src/components/SkillGrid.jsx`, `src/components/SkillGrid.css` (new)
- `src/lib/skillIcons.js` (new)
- `src/assets/homeContent.json` (new)
- `src/assets/home-intro.png`, `src/assets/home-technical.png`, `src/assets/home-soft.png` (new)
- `src/App.jsx` (existing, shared with other features; change approved by the site owner on 2026-11-06)
- `src/index.css` (existing, shared with other features; change approved by the site owner on 2026-11-06)
- `package.json`, `package-lock.json` (existing, shared with other features; adding `lucide-react` approved by the site owner on 2026-11-06)

**Files this feature deletes** (demo only; approved by the site owner on 2026-11-06)

- `src/App.css`
- `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`
- `public/icons.svg`

### Out of Scope

- The header, footer, backdrop and shared layout: `header-footer.feature.md`.
- Changing the logo or the tool documented for it: `header-footer.feature.md`.
- The routes and content of Portfolio, Links, Contact, the login route and `/backoffice`: each page's own feature specification.
- The `GoldButton` component and any call-to-action on Home: no source asks for one. The first feature that uses `GoldButton` builds it.
- Glyph lines: `ai-spec.md` section 5 makes them optional and no source asks for them on Home. The first feature that uses one builds it.
- Making the "Scroll down" hint clickable: no source asks for a jump.
- The page title in `index.html` and the favicon: no source ties them to Home.
- Any Supabase use: Home shows static content only.
- Translated text and a light theme: the extra-mile features `languages.feature.md` and `light-dark-mode.feature.md`.

### Feature-Specific Constraints

- **Exception to `ai-spec.md` section 4 (Allowed Technologies):** this feature adds the `lucide-react` package for the skill icons. Approved by the site owner on 2026-11-06.
- **Dependencies:** this feature builds on `setup-deploy.feature.md` (the route table in `src/App.jsx`) and `header-footer.feature.md` (the layout Home renders inside, and the variables and section snapping in `src/index.css`).
- **Reuse by later features:** `Frame`, `PageSection` and `ScrollHint` take no Home-specific content, because `portfolio-page.feature.md` and other page features reuse them.
- **Images come from the site owner:** Google Gemini is used outside this repository, so the three image files must exist before `src/pages/Home.jsx` can import them.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Home at the root path

**Requirement:**
The root path shows the Home page, which is the site's landing page.

**Expected Result:**
Opening the site at its root URL shows Home at `/#/`, and none of the Vite demo content appears.

### FR-02 — Page opens with the introduction

**Requirement:**
The introduction is the first section of the page and is styled more prominently than the sections below it.

**Expected Result:**
The first content below the header is the introduction, and its name is the largest text on the page.

### FR-03 — Full name

**Requirement:**
The introduction shows the site owner's full name.

**Expected Result:**
The page's only `h1` reads `Jacob Williams`.

### FR-04 — Role tagline

**Requirement:**
The introduction shows a role tagline.

**Expected Result:**
The text `Full-Stack Developer` appears directly under the name.

### FR-05 — Introduction paragraph

**Requirement:**
The introduction shows a short paragraph on who the site owner is and what they bring.

**Expected Result:**
The paragraph under the tagline matches the text in section 8.

### FR-06 — Technical skills

**Requirement:**
A Technical Skills section lists at least three technical skills.

**Expected Result:**
The section shows the 21 entries from section 8 under their five group headings, in that order.

### FR-07 — Soft skills

**Requirement:**
A Soft Skills section lists at least three soft skills or personal talents.

**Expected Result:**
The section shows the six entries from section 8, in that order.

### FR-08 — Parallel structured layout

**Requirement:**
The two skill sections sit below the introduction and present their entries in the same structured layout.

**Expected Result:**
Technical Skills follows the introduction and Soft Skills follows Technical Skills, and an entry in either section has the same parts in the same order and style.

### FR-09 — Representative icon on every entry

**Requirement:**
Every skill entry carries a representative icon.

**Expected Result:**
All 27 entries show the icon named for them in section 8.

### FR-10 — Supporting description on every entry

**Requirement:**
Every skill entry carries a supporting description of more than a single word.

**Expected Result:**
All 27 entries show the description from section 8 under their name.

### FR-11 — Three visually distinct sections

**Requirement:**
The page is divided into at least three visually distinct sections, separated by spacing, background contrast or dividers.

**Expected Result:**
The Intro, Technical Skills and Soft Skills sections each sit in their own outlined panel, with space between the panels.

### FR-12 — AI-generated images

**Requirement:**
The page carries at least two AI-generated images.

**Expected Result:**
Three AI-generated images appear on the page, one in each section.

### FR-13 — Images relevant to the page

**Requirement:**
Every AI-generated image is contextually relevant to the page it sits on.

**Expected Result:**
Each image shows the subject listed for it in section 8.

### FR-14 — Image alt text

**Requirement:**
Every AI-generated image has appropriate alt text.

**Expected Result:**
Each `<img>` element's `alt` attribute matches the text listed for it in section 8.

### FR-15 — Image generating tool documented

**Requirement:**
The tool that generated each image is documented.

**Expected Result:**
`src/pages/Home.jsx` holds a comment beside each image import stating that the image was generated with Google Gemini.

---

## 4. Decisions Already Taken

- **D-01:** The page has three stacked sections in this order: Intro, Technical Skills, Soft Skills. "Alongside" in the business doc is met by the same layout in both skill sections, not by placing them side by side - business doc (The Public Pages: at least three distinct sections, two parallel sections); project-wide spec (section 5: full-screen sections); site owner decision, 2026-11-06.
- **D-02:** `Home` lives in `src/pages/Home.jsx` and replaces `demoContent` as the element of the existing `Route` at `/` - project-wide spec (section 3); `setup-deploy.feature.md` D-04; `header-footer.feature.md` D-15.
- **D-03:** The full name is `Jacob Williams` - project-wide spec (section 1); existing code (`src/components/Footer.jsx`).
- **D-04:** The tagline is `Full-Stack Developer`, shown in spaced-out bold capitals in `--peach` and made capital by CSS, so the text stays as written - site owner decision, 2026-11-06; project-wide spec (section 5: labels).
- **D-05:** The introduction paragraph was drafted from the site owner's two skill content files and is reviewed with this specification - site owner decision, 2026-11-06.
- **D-06:** All 21 technical skills are shown in one section, under their five group headings, with their wording unchanged - site owner decision, 2026-11-06; site owner's content file `home-page-technical-skills.md`.
- **D-07:** All six recommended soft skills are shown, with their wording unchanged, so the grid is even - site owner's content file `home-page-soft-skills.md`.
- **D-08:** The name, tagline, paragraph and skill entries live in `src/assets/homeContent.json`, which `Home` imports - portal slides (Slide #7: data comes from static JSON files); project-wide spec (section 3: `src/assets/` holds assets imported by components).
- **D-09:** The icons come from the `lucide-react` package - site owner decision, 2026-11-06.
- **D-10:** Every icon is a generic symbol, never a technology's logo - project-wide spec (section 5: no franchise material).
- **D-11:** Each entry in `homeContent.json` names its icon as text, and `src/lib/skillIcons.js` maps that text to the imported `lucide-react` component, because JSON cannot hold a component - portal slides (Slide #7: static JSON files); project-wide spec (section 5: non-component modules).
- **D-12:** The icons are decorative: each has `aria-hidden="true"` and takes `--gold` through `currentColor`, because the entry's visible name already says what it is - existing code (`src/components/Footer.jsx`, the same approach for its icons).
- **D-13:** `SkillGrid` renders every entry on the page, in both sections, so the two layouts cannot drift apart. An entry shows its icon, then its name in `--text`, then its description in the default paragraph colour - business doc (The Public Pages: consistent structured layout); project-wide spec (section 5: reuse one source).
- **D-14:** Above 760px, `SkillGrid` uses four columns for four entries and three columns for five or six, so a row never holds one lone card. At 760px or less it uses one column - site owner's content file `home-page-soft-skills.md` (even grid); project-wide spec (section 5: breakpoint).
- **D-15:** The five group headings in Technical Skills are `h3` elements in spaced-out bold capitals. The section headings are `h2` elements - project-wide spec (section 5: labels, text sizes).
- **D-16:** `PageSection` renders a `<section>` holding a `Frame`, with `min-height: 100svh` and `scroll-snap-align: start`. Its content stays in normal flow - project-wide spec (section 5: full-screen sections, Frame panel).
- **D-17:** `PageSection` keeps at least `--header-height` of padding at its bottom. The header takes that height from the window, so without it the end of a one-window section would start below the fold - project-wide spec (section 5: full-screen sections); existing code (`src/index.css`, `src/components/Header.css`).
- **D-18:** `Frame` measures its own size with a `ResizeObserver` and draws its outline in pixels, because stretching a fixed drawing would bend the 45° corners on sections of different heights - project-wide spec (section 5: Frame panel).
- **D-19:** `ScrollHint` is plain text reading `Scroll down` with `aria-hidden="true"`, not a link or a button, shown at the end of the Intro section. It is decorative, and screen reader users do not need it - project-wide spec (section 5: full-screen sections).
- **D-20:** The three images are generated with Google Gemini by the site owner and saved as 16:9 PNG files in `src/assets/`. They use a dark sci-fi look with gold and peach light accents, and contain no text, logos or franchise material - site owner decision, 2026-11-06; project-wide spec (section 5: no franchise material).
- **D-21:** Above 760px, the Intro section shows its text at the left and its image at the right. Each skill section shows its heading at the left and its image at the right, above its entries, in the same way. At 760px or less each section stacks in one column - site owner decision, 2026-11-06 (one image per section, skill sections kept parallel).
- **D-22:** The generating tool is documented in a code comment beside each image import, the way the logo's tool is documented - business doc (The Public Pages); existing code (`src/components/Header.jsx`).
- **D-23:** The demo cleanup removes these `src/index.css` variables: `--text-h`, `--border`, `--code-bg`, `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow`, `--mono`. It also removes the `code`, `.counter` and `#social .button-icon` rules. No other file reads them - existing code; `header-footer.feature.md` (section 2); site owner decision, 2026-11-06.

---

## 5. Task Breakdown

Order: the images and the package come first because `Home` and `skillIcons.js` import them. The shared components come next, smallest first, then the content and the page that uses them. `src/App.jsx` changes after the page is ready, so the app keeps working at every commit, and the demo files are deleted only once nothing imports them. Verification ends the feature.

1. **T-01 (FR-12, FR-13, D-20):** The site owner generates the three images with Google Gemini from the subjects in section 8 and saves them under the names listed there. - `src/assets/home-intro.png`, `src/assets/home-technical.png`, `src/assets/home-soft.png`
2. **T-02 (FR-09, D-09):** Install `lucide-react` with `npm install`. - `package.json`, `package-lock.json`
3. **T-03 (FR-11, D-18):** Create `Frame`: an outline drawn in SVG behind its children, sized from a `ResizeObserver`, to the design in `ai-spec.md` section 5. - `src/components/Frame.jsx`, `src/components/Frame.css`
4. **T-04 (FR-11, D-16, D-17):** Create `PageSection`: a `<section>` that wraps its children in `Frame`, with the height, snapping and padding in D-16 and D-17. - `src/components/PageSection.jsx`, `src/components/PageSection.css`
5. **T-05 (D-19):** Create `ScrollHint`: the plain text from D-19, with its pulse from `ai-spec.md` section 5. - `src/components/ScrollHint.jsx`, `src/components/ScrollHint.css`
6. **T-06 (FR-03, FR-04, FR-05, FR-06, FR-07, FR-10, D-05 to D-08, D-11):** Create the content file with the shape and the text in section 8. - `src/assets/homeContent.json`
7. **T-07 (FR-09, D-10, D-11):** Create the map from icon name to `lucide-react` component for the 27 icons in section 8. - `src/lib/skillIcons.js`
8. **T-08 (FR-08, FR-09, FR-10, D-12, D-13, D-14):** Create `SkillGrid`: a list of entries built from the skills it receives, each with its icon, name and description, using the columns in D-14. - `src/components/SkillGrid.jsx`, `src/components/SkillGrid.css`
9. **T-09 (FR-02 to FR-08, FR-11 to FR-15, D-01, D-03, D-04, D-15, D-21, D-22):** Create `Home`: three `PageSection`s with the content from `homeContent.json`, `SkillGrid` for the entries, `ScrollHint` at the end of the Intro section, and the three images with the alt text from section 8 and a comment naming Google Gemini beside each import. - `src/pages/Home.jsx`, `src/pages/Home.css`
10. **T-10 (FR-01, D-02):** In `src/App.jsx`, render `Home` as the element of the `/` route, and remove `demoContent`, the counter state, the demo imports and the `App.css` import. - `src/App.jsx`
11. **T-11 (FR-01, D-23):** Delete the demo files listed in section 2, and remove the variables and rules in D-23. - `src/App.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`, `src/index.css`
12. **T-12 (all FRs):** Verify the feature against section 11 at phone and desktop widths. - no file change

---

## 6. User Flow

**Main flow**

1. A visitor opens the site's root URL.
2. The Intro section shows the name, tagline, paragraph, image and "Scroll down" hint.
3. The visitor scrolls down; the Technical Skills section shows its image and five groups of entries.
4. The visitor scrolls on; the Soft Skills section shows its image and six entries, followed by the footer.

**Alternate / failure flow**

N/A

---

## 7. Interfaces Involved

### Pages

- `/` (`/#/`) - existing route, new element: shows `Home` in place of the Vite demo content.

### Components

- `Home` (`src/pages/Home.jsx`) - new: composes the three sections from the content file.
- `Frame` (`src/components/Frame.jsx`) - new: the outlined panel from `ai-spec.md` section 5, reusable by other pages.
- `PageSection` (`src/components/PageSection.jsx`) - new: the full-screen section holding a `Frame`, reusable by other pages.
- `ScrollHint` (`src/components/ScrollHint.jsx`) - new: the "Scroll down" hint, reusable by other pages.
- `SkillGrid` (`src/components/SkillGrid.jsx`) - new: the grid of skill entries used by both skill sections.
- `src/lib/skillIcons.js` - new: maps an icon name from the content file to its `lucide-react` component.
- `src/assets/homeContent.json` - new: the page's text and icon names.
- `lucide-react` - new dependency: the icon components.
- `Layout` (`src/components/Layout.jsx`) - existing, unchanged: renders `Home` inside the header and footer.
- `App` (`src/App.jsx`) - existing, changed: mounts `Home` at `/` and loses the demo.
- `src/index.css` - existing, changed: loses the demo variables and rules.

### Endpoints

N/A

---

## 8. Data

### Inputs

- `intro` (object) - from `src/assets/homeContent.json`: `name`, `tagline`, `paragraph`, all text.
- `technicalGroups` (array) - from `src/assets/homeContent.json`: each item has `title` (text) and `skills` (array of skill objects).
- `softSkills` (array of skill objects) - from `src/assets/homeContent.json`.
- Skill object: `name` (text), `description` (text), `icon` (text, a key of the map in `src/lib/skillIcons.js`).

### Outputs / Returned Data

**Introduction**

- Name: Jacob Williams
- Tagline: Full-Stack Developer
- Paragraph: I'm a full-stack developer who builds across the front end, the back end and mobile with React, Node.js, Java and React Native. I write a spec before I write code, and every change, AI-assisted or not, gets tested and reviewed before it ships.

**Technical Skills**

| Group | Name | Description | Icon |
|---|---|---|---|
| Frontend Engineering | React | Reusable components, hooks, Context and client-side routing. | `Component` |
| Frontend Engineering | React Native / Expo | Cross-platform mobile apps with file-based navigation. | `Smartphone` |
| Frontend Engineering | JavaScript ES6+ | Promises, async/await, array methods and ES modules. | `Braces` |
| Frontend Engineering | HTML & responsive CSS | Semantic markup and mobile-first layouts for any screen size. | `MonitorSmartphone` |
| Backend Engineering | Node.js / Express | RESTful routes, controllers and custom middleware. | `Server` |
| Backend Engineering | Java / Spring Boot | Layered architecture, Spring Security and server-rendered views. | `Layers` |
| Backend Engineering | Auth & sessions | Token-based sessions, password hashing and role-based access. | `KeyRound` |
| Backend Engineering | API design | Clean endpoints, request validation and consistent error responses. | `Plug` |
| Data | SQL / MySQL | Normalized schemas, joins and hand-written queries. | `Database` |
| Data | Spring Data JPA / Hibernate | Entity mapping and repository-based data access. | `Table2` |
| Data | MongoDB / Mongoose | Flexible document models with schema validation. | `FileBraces` |
| Data | PostgreSQL / Supabase | Hosted Postgres secured with row-level security policies. | `ShieldCheck` |
| Development Workflow | Git / GitHub | Feature branches, pull requests and conventional commits. | `GitBranch` |
| Development Workflow | CI/CD | Automated builds and deployments on every merge. | `Rocket` |
| Development Workflow | Debugging | Tracing issues from the browser to the server to the database. | `Bug` |
| Development Workflow | Environments | Separate dev and production configs, with secrets kept out of code. | `SlidersHorizontal` |
| AI-Assisted Engineering | Specification writing | Clear specs and acceptance criteria before any code. | `FileText` |
| AI-Assisted Engineering | Requirement decomposition | Big goals broken into small, testable tasks. | `ListTree` |
| AI-Assisted Engineering | Claude Code | Custom commands and skills that automate repeat workflows. | `SquareTerminal` |
| AI-Assisted Engineering | Context engineering (CLAUDE.md) | Project rules that keep AI output on-stack and on-standard. | `ScrollText` |
| AI-Assisted Engineering | AI-assisted review & testing | Every AI-generated change is reviewed and verified before it ships. | `ClipboardCheck` |

**Soft Skills**

| Name | Description | Icon |
|---|---|---|
| Fast Learner | I picked up four stacks in one program: MERN, Java + Spring Boot, React Native, and Supabase. | `Lightbulb` |
| Problem Solving | I break bugs down step by step and test each piece, from API calls in Postman to unit tests in JUnit. | `Puzzle` |
| Planning & Organization | I write a spec before I write code, so every feature has clear goals and a clear finish line. | `ClipboardList` |
| Attention to Detail | I lint, test and audit my work before I ship it, so small mistakes don't reach users. | `Search` |
| Clear Communication | I document my work in plain words: READMEs, research notes and progress updates people can act on. | `MessageCircle` |
| Adaptability | I switch between front end, back end and mobile without losing pace. | `RefreshCw` |

**Images**

| File | Section | Subject and alt text |
|---|---|---|
| `src/assets/home-intro.png` | Intro | A developer seen from behind at a glowing workstation, looking out a wide window at a starfield. |
| `src/assets/home-technical.png` | Technical Skills | Floating holographic screens showing abstract code, database and server diagrams in a dark control room. |
| `src/assets/home-soft.png` | Soft Skills | Two people planning together around a holographic table in a dark control room. |

### Stored / Modified Data

N/A

---

## 9. Validation

N/A

---

## 10. Expected Behavior

### Success Behavior

- The root URL shows Home with all three sections, the three images and all 27 entries.
- Wider than 760px, the Technical Skills section is taller than the window, and the visitor scrolls through all five groups to reach Soft Skills.
- At 760px or less, every section stacks in one column with no horizontal scrolling.

### Error / Invalid Behavior

- An image fails to load: its alt text shows in its place, and the rest of the page is unchanged.
- Supabase is unconfigured: Home renders the same, because it does not use Supabase.

### Empty / Edge Cases

N/A

---

## 11. Acceptance Criteria

- [ ] Opening the root URL of the built site shows Home at `/#/`, and the page holds no "Get started" heading, counter button, or React or Vite logo. (FR-01)
- [ ] At 1280px and 320px wide, the first content below the header is the introduction, and its name is larger than any other text on the page. (FR-02)
- [ ] The page has exactly one `h1`, and it reads `Jacob Williams`. (FR-03)
- [ ] The text `Full-Stack Developer` appears directly under the name. (FR-04)
- [ ] The paragraph under the tagline matches the Introduction text in section 8 word for word. (FR-05)
- [ ] The Technical Skills section shows five group headings holding 21 entries, in the order and wording of section 8. (FR-06)
- [ ] The Soft Skills section shows six entries, in the order and wording of section 8. (FR-07)
- [ ] Technical Skills comes after the introduction and Soft Skills comes after Technical Skills. (FR-08)
- [ ] An entry in Technical Skills and an entry in Soft Skills show an icon, then a name, then a description, with the same styles. (FR-08)
- [ ] At 1280px wide, a four-entry group fills one row, the five-entry group shows rows of three and two, and Soft Skills shows two rows of three. At 320px wide, each shows one column. (FR-08)
- [ ] Each of the 27 entries shows the icon named for it in section 8, and no icon is a technology's logo. (FR-09)
- [ ] Each of the 27 entries shows a description of more than one word under its name. (FR-10)
- [ ] The Intro, Technical Skills and Soft Skills sections each sit in their own `Frame` outline, with visible space between the outlines, at 1280px and 320px wide. (FR-11)
- [ ] One image appears in each of the three sections, loaded from the three files in section 8. (FR-12)
- [ ] Each image shows the subject listed for it in section 8, and none shows text, a logo or franchise material. (FR-13)
- [ ] Each image's `alt` attribute matches its text in section 8. (FR-14)
- [ ] `src/pages/Home.jsx` has a comment beside each of the three image imports naming Google Gemini as the generating tool. (FR-15)
