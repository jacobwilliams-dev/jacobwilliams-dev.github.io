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
- The Technical Skills section: 20 entries on five cards, one card per group, in a carousel with a list of titles beside it.
- The Soft Skills section: six entries in a grid.
- Three AI-generated images, one per section, with alt text and the generating tool documented.
- The site owner's photo in the Intro section.
- The first reusable page pieces from `ai-spec.md` section 5 that Home uses: `Frame`, page sections and the "Scroll down" hint.
- Removing the Vite demo: its markup and state in `src/App.jsx`, `src/App.css`, its assets, and its rules and variables in `src/index.css`.

**Files this feature may change**

- `src/pages/Home.jsx`, `src/pages/Home.css` (new)
- `src/components/Frame.jsx`, `src/components/Frame.css` (new)
- `src/components/PageSection.jsx`, `src/components/PageSection.css` (new)
- `src/components/ScrollHint.jsx`, `src/components/ScrollHint.css` (new)
- `src/components/SkillGrid.jsx`, `src/components/SkillGrid.css` (new)
- `src/components/SkillCarousel.jsx`, `src/components/SkillCarousel.css` (new)
- `src/components/CarouselTracker.jsx`, `src/components/CarouselTracker.css` (new)
- `src/lib/skillIcons.js` (new)
- `src/assets/homeContent.json` (new)
- `src/assets/fonts/Orbitron-Medium.ttf`, `Orbitron-Bold.ttf`, `Tomorrow-Light.ttf`, `Tomorrow-Regular.ttf`, `OFL-Orbitron.txt`, `OFL-Tomorrow.txt` (new)
- `src/assets/home-intro.png`, `src/assets/home-technical.png`, `src/assets/home-soft.png` (new)
- `src/assets/profile-photo.jpg` (new)
- `src/assets/skill-icons/` (new: the 20 image icon files)
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
- The `PeachButton` component and any call-to-action on Home: no source asks for one. The first feature that uses `PeachButton` builds it.
- Glyph lines: `ai-spec.md` section 5 makes them optional and no source asks for them on Home. The first feature that uses one builds it.
- Making the "Scroll down" hint clickable: no source asks for a jump.
- The page title in `index.html` and the favicon: no source ties them to Home.
- Any Supabase use: Home shows static content only.
- Translated text and a light theme: the extra-mile features `languages.feature.md` and `light-dark-mode.feature.md`.

### Feature-Specific Constraints

- **Exception to `ai-spec.md` section 4 (Allowed Technologies):** this feature adds the `lucide-react` package for the skill icons. Approved by the site owner on 2026-11-06.
- **Dependencies:** this feature builds on `setup-deploy.feature.md` (the route table in `src/App.jsx`) and `header-footer.feature.md` (the layout Home renders inside, and the variables in `src/index.css`).
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
The section shows five titles and five cards in the group order of section 8. Each card shows its group title, its summary sentence and its entries in order, and together the cards hold all 20 entries. Clicking a title or a card brings that card into focus.

### FR-07 — Soft skills

**Requirement:**
A Soft Skills section lists at least three soft skills or personal talents.

**Expected Result:**
The section shows the six entries from section 8, in that order.

### FR-08 — Parallel structured layout

**Requirement:**
The two skill sections sit below the introduction and present their entries in the same structured style.

**Expected Result:**
Technical Skills follows the introduction and Soft Skills follows Technical Skills, and an entry in either section has the same parts in the same order, with the same fonts and text colours.

### FR-09 — Representative icon on every entry

**Requirement:**
Every skill entry carries a representative icon.

**Expected Result:**
All 26 entries show the icon named for them in section 8.

### FR-10 — Supporting description on every entry

**Requirement:**
Every skill entry carries a supporting description of more than a single word.

**Expected Result:**
All 26 entries show the description from section 8 under their name.

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

### FR-16 — Carousel tracker

**Requirement:**
The Technical Skills carousel shows one dot per card, marks the card in focus, and lets the visitor change card with the dots or with circled arrows.

**Expected Result:**
Five dots and two circled arrows sit under the cards at every width. Choosing a dot brings that card into focus, and an arrow moves one card, looping past the first and last.

---

## 4. Decisions Already Taken

- **D-01:** The page has three stacked sections in this order: Intro, Technical Skills, Soft Skills. "Alongside" in the business doc is met by the same entry style in both skill sections, not by placing them side by side - business doc (The Public Pages: at least three distinct sections, two parallel sections); project-wide spec (section 5: page sections); site owner decision, 2026-11-06.
- **D-02:** `Home` lives in `src/pages/Home.jsx` and replaces `demoContent` as the element of the existing `Route` at `/` - project-wide spec (section 3); `setup-deploy.feature.md` D-04; `header-footer.feature.md` D-15.
- **D-03:** The full name is `Jacob Williams` - project-wide spec (section 1); existing code (`src/components/Footer.jsx`).
- **D-04:** The tagline is `Full-Stack Developer`, shown in spaced-out bold capitals in `--peach` and made capital by CSS, so the text stays as written - site owner decision, 2026-11-06; project-wide spec (section 5: labels).
- **D-05:** The introduction paragraph was drafted from the site owner's two skill content files and is reviewed with this specification - site owner decision, 2026-11-06.
- **D-06:** All 20 technical skills sit in one section, on five cards that are all on the page, one card per group, with their wording unchanged. The exceptions are `Specification & decomposition`, which the site owner asked to combine from two entries, and `Context engineering`, which drops `(CLAUDE.md)` from its name. The order within each card follows section 8 - site owner decisions, 2026-11-06 and 2026-11-07; site owner's content file `home-page-technical-skills.md`.
- **D-07:** All six recommended soft skills are shown, with their wording unchanged, so the grid is even - site owner's content file `home-page-soft-skills.md`.
- **D-08:** The name, tagline, paragraph and skill entries live in `src/assets/homeContent.json`, which `Home` imports - portal slides (Slide #7: data comes from static JSON files); project-wide spec (section 3: `src/assets/` holds assets imported by components).
- **D-09:** The 20 Technical Skills icons are the site owner's PNG files in `src/assets/skill-icons/`, unmodified except `github.png`, which keeps only the cat, with the outer circle removed at the site owner's request. The six Soft Skills icons come from the `lucide-react` package - site owner decisions, 2026-11-06 and 2026-11-07.
- **D-10:** Technical Skills icons may show their technology's logo, and Soft Skills icons are generic symbols - project-wide spec (section 5: no franchise material and its exceptions); site owner decision, 2026-11-07.
- **D-11:** Each entry in `homeContent.json` names its icon as text, and `src/lib/skillIcons.js` maps that text to the imported `lucide-react` component or image file, because JSON cannot hold a component or an image - portal slides (Slide #7: static JSON files); project-wide spec (section 5: non-component modules).
- **D-12:** The icons are decorative, because the entry's visible name already says what it is, so each has `aria-hidden="true"`. Every icon takes `--peach` through `currentColor`. An image icon is a `<span>` that uses its PNG as a CSS mask, so the file's shape shows filled with peach, at the same size as a `lucide-react` icon - existing code (`src/components/Footer.jsx`, the same approach for its icons); site owner decision, 2026-11-07.
- **D-13:** `SkillGrid` renders every entry on the page, in both sections, so the two layouts cannot drift apart. An entry shows its icon beside its name in `--text` and its description in the default paragraph colour. As an exception to the 1.6 line height in `ai-spec.md` section 5, the name uses 1.2 and the description 1.35, with 4px between them. The name is 16px and the description keeps the 14px body size, with 24px between entries, a site owner decision of 2026-11-07 - business doc (The Public Pages: consistent structured layout); project-wide spec (section 5: reuse one source).
- **D-14:** `SkillGrid` takes a column count. Above 760px, Soft Skills uses three columns and a carousel card uses one. At 760px or less every grid uses one column - site owner decision, 2026-11-07; site owner's content file `home-page-soft-skills.md` (even grid); project-wide spec (section 5: breakpoint).
- **D-15:** The five group names in Technical Skills appear in the title list and as an `h3` on each card, in spaced-out bold capitals. The section headings are `h2` elements - site owner decision, 2026-11-06; project-wide spec (section 5: labels, text sizes).
- **D-16:** `PageSection` renders a `<section>` holding a `Frame`, only as tall as its content. A `label` prop names the section for the page tracker, and Home's labels are Introduction, Technical Skills and Soft Skills. An optional `heading` prop renders above the `Frame`, outside the outline. Its content stays in normal flow - site owner decision, 2026-11-07; project-wide spec (section 5: page sections, Frame panel).
- **D-17:** `PageSection` has 16px of padding above and below, so neighbouring panels sit 32px apart - site owner decision, 2026-11-07.
- **D-18:** `Frame` measures its own size with a `ResizeObserver` and draws its outline in pixels, because stretching a fixed drawing would bend the 45° corners on sections of different heights - project-wide spec (section 5: Frame panel).
- **D-19:** `ScrollHint` is plain text reading `Scroll down` by default with `aria-hidden="true"`, not a link or a button, shown at the end of the Intro section. It is decorative, and screen reader users do not need it - project-wide spec (section 5: page sections).
- **D-20:** The three images are generated with Google Gemini by the site owner and saved as widescreen PNG files, 1400px wide, in `src/assets/`. They use a dark sci-fi look with gold and peach light accents, and contain no text, logos or franchise material - site owner decision, 2026-11-06; project-wide spec (section 5: no franchise material).
- **D-21:** Each section's image sits behind its content as a background: `PageSection` passes it to `Frame`, which fills the panel without stretching, cuts the image to the panel's outline and shows it at 30% opacity. It stays an `<img>` so it keeps its alt text. Technical Skills has the heading and title list at the left and the cards at the right. When the two columns do not fit side by side, the cards move below. Soft Skills has its heading at the top and its grid below it - site owner decision, 2026-11-07 (one image per section); project-wide spec (section 5: Frame panel).
- **D-22:** The generating tool is documented in a code comment beside each image import, the way the logo's tool is documented - business doc (The Public Pages); existing code (`src/components/Header.jsx`).
- **D-23:** The demo cleanup removes these `src/index.css` variables: `--text-h`, `--border`, `--code-bg`, `--accent`, `--accent-bg`, `--accent-border`, `--social-bg`, `--shadow`, `--mono`. It also removes the `code`, `.counter` and `#social .button-icon` rules. No other file reads them - existing code; `header-footer.feature.md` (section 2); site owner decision, 2026-11-06.
- **D-24:** `SkillCarousel` shows the five titles as a vertical ARIA tab list and the five cards as its panels. Titles are buttons, because they change content in place and `href="#id"` links are banned under `HashRouter`. The first card is in focus on load. Clicking a title or a card brings that card into focus, and the arrow keys move between titles and wrap around. On a touch screen the cards follow the finger live as it drags left or right, and the title changes as a new card becomes the nearest. On release, the nearest card glides into focus. A drag stops at the first and last card, with a slight give that springs back. Each title shows its number and name. The open title carries a `--peach` bar and the card in focus a `--peach` border, because `--peach` marks the current state - site owner decision, 2026-11-06; site owner's wireframes (`home-page-card-layout`); project-wide spec (section 5: current-state marks; section 7: in-page jumps).
- **D-25:** The card in focus sits in the centre, in front. The other four sit smaller and dimmer behind it, two on each side, so all five stay in view. Cards have rounded corners and a soft shadow, and drift slowly up and down so they look like they float. The section heading sits above the titles, at the top left of the panel, level with the Soft Skills heading. Titles have the same see-through fill as the Soft Skills cards at rest, and the open title has an 85% fill, the faint glow of the Soft Skills hover, peach text and a 2px peach bar on its left edge. Cards move with a 0.4s CSS transition, and the transition and the drift are switched off under reduced motion. When the titles and the carousel do not fit side by side, the titles move above the carousel. At 760px or less the card in focus fills most of the width and its neighbours show at the edges. The titles are hidden from sight, so the heading sits directly above the cards, and visitors drag between cards. The cards sit in a line, not a loop: the first card has none to its left and the last has none to its right. A pulsing `ScrollHint` reading "Swipe" sits above the cards, with three arrows on each side that fade going outward from the word, at 100%, 55% and 25% opacity (site owner decision, 2026-11-08), and a side's arrows disappear when there is no card in its direction. The titles stay in the page for keyboard and screen reader users - site owner decision, 2026-11-07; site owner's carousel examples (`home-page-carousel-examples`); project-wide spec (section 5: motion, breakpoint; section 7: responsive behaviour).
- **D-26:** Each technical group has a one-sentence summary, shown on its card above its entries. Claude drafted the sentences from the skills on each card, and the site owner reviewed them - site owner decision, 2026-11-06.
- **D-27:** Headings use Orbitron Medium, including the footer name, through the `--heading` variable. Card titles use Orbitron Bold: the `h3` on each Technical Skills card and the skill name on each Soft Skills card. Each card's summary uses Tomorrow Light. Skill names in Technical Skills and all descriptions use Tomorrow Regular. The TTF files are used unconverted, because Orbitron's licence reserves its name for unmodified copies - site owner decision, 2026-11-06; project-wide spec (section 5: fonts).
- **D-28:** Soft Skills is a grid of six cards with a see-through fill at rest, at 70% of the carousel card's fill, and they drift slowly up and down, out of step, with the same float as the carousel cards. On hover, a card lifts 4px and moves up to about 4px toward the cursor, and its fill rises to 85%, with a hairline peach border and a faint peach glow. It resets when the cursor leaves. The fill, border and glow sit on a layer that fades in, so only `transform` and `opacity` change. Exceptions to `ai-spec.md` section 5 (motion): the hover takes 0.3s ease-out instead of 0.2s, and `SkillGrid` uses JavaScript to read the cursor position, while CSS still does the moving. The hover is off on touch devices. Under reduced motion the fill, border and glow stay, and the drift and all movement are off - site owner decision, 2026-11-07.
- **D-29:** The Technical Skills cards use the Soft Skills hover from D-28, with the same exceptions: the lift toward the cursor, the hairline peach border and the faint peach glow, off on touch devices, and with the movement off under reduced motion. Their fill stays solid, because a see-through card would show the cards behind it. The hairline replaces the card's own border while it is hovered - site owner decision, 2026-11-07.
- **D-30:** The Intro section shows the site owner's photo, `src/assets/profile-photo.jpg`, a square crop of their headshot. Above 760px it sits to the right of the text and the "Scroll down" hint, with the same gap to the panel's top, right and bottom edges, and it crops to fill the height when the text is taller than it. At 760px or less it sits above the name. It has rounded corners, a hairline peach outline and a faint peach glow, to match the cards. Its alt text is "Portrait of" followed by the site owner's name. It is a real photo, so FR-12 to FR-15 do not apply to it - site owner decision, 2026-11-07.
- **D-31:** `CarouselTracker` sits in a second row of the carousel stage, centred under the cards, at every width. Its controls follow the site owner's design reference: a left and a right arrow, each in a 44px circle with a 1px `--line` outline, and between them five 6px dots, the current one white inside a thin ring. The dots and arrows are buttons with their own labels, the current dot has `aria-current`, and the arrows wrap past the first and last card the same way the arrow keys do - site owner decisions, 2026-11-08 (reference image, shown on phones too); project-wide spec (section 5: hover and focus, breakpoint).

---

## 5. Task Breakdown

Order: the images and the package come first because `Home` and `skillIcons.js` import them. The shared components come next, smallest first, then the content and the page that uses them. `src/App.jsx` changes after the page is ready, so the app keeps working at every commit, and the demo files are deleted only once nothing imports them. Verification ends the feature.

1. **T-01 (FR-12, FR-13, D-20):** The site owner generates the three images with Google Gemini from the subjects in section 8 and saves them under the names listed there. - `src/assets/home-intro.png`, `src/assets/home-technical.png`, `src/assets/home-soft.png`
2. **T-02 (FR-09, D-09):** Install `lucide-react` with `npm install`. - `package.json`, `package-lock.json`
3. **T-03 (FR-11, D-18):** Create `Frame`: an outline drawn in SVG behind its children, sized from a `ResizeObserver`, to the design in `ai-spec.md` section 5. - `src/components/Frame.jsx`, `src/components/Frame.css`
4. **T-04 (FR-11, D-16, D-17):** Create `PageSection`: a `<section>` that wraps its children in `Frame`, with the height and padding in D-16 and D-17. - `src/components/PageSection.jsx`, `src/components/PageSection.css`
5. **T-05 (D-19):** Create `ScrollHint`: the plain text from D-19, with its pulse from `ai-spec.md` section 5. - `src/components/ScrollHint.jsx`, `src/components/ScrollHint.css`
6. **T-06 (FR-03, FR-04, FR-05, FR-06, FR-07, FR-10, D-05 to D-08, D-11, D-26):** Create the content file with the shape and the text in section 8. - `src/assets/homeContent.json`
7. **T-07 (FR-09, D-10, D-11):** Create the maps from icon name to `lucide-react` component and to image file for the 26 icons in section 8. - `src/lib/skillIcons.js`, `src/assets/skill-icons/`
8. **T-08 (FR-06, FR-08, FR-09, FR-10, D-12, D-13, D-14, D-24, D-25, D-28, D-29):** Create `SkillGrid`: a list of entries built from the skills it receives, each with its icon, name and description, using the columns in D-14 and the hover from D-28. Create `SkillCarousel`: the titles and cards from D-24 and D-25, showing each group's entries through `SkillGrid`. - `src/components/SkillGrid.jsx`, `src/components/SkillGrid.css`, `src/components/SkillCarousel.jsx`, `src/components/SkillCarousel.css`
9. **T-09 (FR-02 to FR-08, FR-11 to FR-15, D-01, D-03, D-04, D-15, D-21, D-22, D-30):** Create `Home`: three `PageSection`s with the content from `homeContent.json`, `SkillCarousel` for the technical groups, `SkillGrid` for the soft skills, `ScrollHint` at the end of the Intro section, and the three images with the alt text from section 8 and a comment naming Google Gemini beside each import. - `src/pages/Home.jsx`, `src/pages/Home.css`
10. **T-10 (FR-01, D-02):** In `src/App.jsx`, render `Home` as the element of the `/` route, and remove `demoContent`, the counter state, the demo imports and the `App.css` import. - `src/App.jsx`
11. **T-11 (FR-01, D-23):** Delete the demo files listed in section 2, and remove the variables and rules in D-23. - `src/App.css`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`, `public/icons.svg`, `src/index.css`
12. **T-12 (all FRs):** Verify the feature against section 11 at phone and desktop widths. - no file change
13. **T-13 (FR-16, D-25, D-31):** Create `CarouselTracker`, render it under the cards in `SkillCarousel`, and give the Swipe hint three fading arrows per side. - `src/components/CarouselTracker.jsx`, `src/components/CarouselTracker.css`, `src/components/SkillCarousel.jsx`, `src/components/SkillCarousel.css`

---

## 6. User Flow

**Main flow**

1. A visitor opens the site's root URL.
2. The Intro section shows the name, tagline, paragraph, photo, background image and "Scroll down" hint.
3. The visitor scrolls down; the Technical Skills section shows its image, five titles and five cards, with the first card in focus. The visitor clicks a title or a card to bring another card into focus.
4. The visitor scrolls on; the Soft Skills section shows its image and six entries, followed by the footer. Hovering an entry shows it as a card.

**Alternate / failure flow**

N/A

---

## 7. Interfaces Involved

### Pages

- `/` (`/#/`) - existing route, new element: shows `Home` in place of the Vite demo content.

### Components

- `Home` (`src/pages/Home.jsx`) - new: composes the three sections from the content file.
- `Frame` (`src/components/Frame.jsx`) - new: the outlined panel from `ai-spec.md` section 5, reusable by other pages.
- `PageSection` (`src/components/PageSection.jsx`) - new: the section holding a `Frame`, reusable by other pages.
- `ScrollHint` (`src/components/ScrollHint.jsx`) - new: the "Scroll down" hint, reusable by other pages.
- `SkillGrid` (`src/components/SkillGrid.jsx`) - new: the grid of skill entries used by both skill sections.
- `SkillCarousel` (`src/components/SkillCarousel.jsx`) - new: the title list and five cards in Technical Skills.
- `CarouselTracker` (`src/components/CarouselTracker.jsx`) - new: the dots and circled arrows under the carousel.
- `src/lib/skillIcons.js` - new: maps an icon name from the content file to its `lucide-react` component or image file.
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
- `technicalGroups` (array) - from `src/assets/homeContent.json`: each item has `title` (text), `summary` (text) and `skills` (array of skill objects).
- `softSkills` (array of skill objects) - from `src/assets/homeContent.json`.
- Skill object: `name` (text), `description` (text), `icon` (text, a key of a map in `src/lib/skillIcons.js`).

### Outputs / Returned Data

**Introduction**

- Name: Jacob Williams
- Tagline: Full-Stack Developer
- Paragraph: I'm a full-stack developer who builds across the front end, the back end and mobile with React, Node.js, Java and React Native. I write a spec before I write code, and every change, AI-assisted or not, gets tested and reviewed before it ships.

**Technical Skills**

| Group | Name | Description | Icon |
|---|---|---|---|
| Frontend Engineering | React | Reusable components, hooks, Context and client-side routing. | `React` |
| Frontend Engineering | React Native / Expo | Cross-platform mobile apps with file-based navigation. | `Expo` |
| Frontend Engineering | JavaScript ES6+ | Promises, async/await, array methods and ES modules. | `JavaScript` |
| Frontend Engineering | HTML & responsive CSS | Semantic markup and mobile-first layouts for any screen size. | `Html` |
| Backend Engineering | Java / Spring Boot | Layered architecture, Spring Security and server-rendered views. | `Java` |
| Backend Engineering | Node.js / Express | RESTful routes, controllers and custom middleware. | `NodeJs` |
| Backend Engineering | Auth & sessions | Token-based sessions, password hashing and role-based access. | `Jwt` |
| Backend Engineering | API design | Clean endpoints, request validation and consistent error responses. | `ApiDesign` |
| Data | SQL / MySQL | Normalized schemas, joins and hand-written queries. | `MySql` |
| Data | Spring Data JPA / Hibernate | Entity mapping and repository-based data access. | `SpringBoot` |
| Data | MongoDB / Mongoose | Flexible document models with schema validation. | `MongoDb` |
| Data | PostgreSQL / Supabase | Hosted Postgres secured with row-level security policies. | `Supabase` |
| Development Workflow | Git / GitHub | Feature branches, pull requests and conventional commits. | `GitHub` |
| Development Workflow | CI/CD | Automated builds and deployments on every merge. | `CiCd` |
| Development Workflow | Debugging | Tracing issues from the browser to the server to the database. | `Debugging` |
| Development Workflow | Environments | Separate dev and production configs, with secrets kept out of code. | `Environments` |
| AI-Assisted Engineering | Claude Code | Custom commands and skills that automate repeat workflows. | `Claude` |
| AI-Assisted Engineering | Specification & decomposition | Clear specs and acceptance criteria before any code, with big goals broken into small, testable tasks. | `Specification` |
| AI-Assisted Engineering | Context engineering | Project rules that keep AI output on-stack and on-standard. | `ContextEngineering` |
| AI-Assisted Engineering | AI-assisted review & testing | Every AI-generated change is reviewed and verified before it ships. | `AiAssisted` |

**Technical Group Summaries**

| Group | Summary |
|---|---|
| Frontend Engineering | Interfaces for web and mobile, built from reusable components that work on any screen. |
| Backend Engineering | Secure server logic and clean APIs that validate input and fail predictably. |
| Data | Relational and document databases, modeled first and secured at the data layer. |
| Development Workflow | The habits that get code from a branch to production safely. |
| AI-Assisted Engineering | AI speeds up the work, while specs and human review keep it correct. |

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

- The root URL shows Home with all three sections, the three images and all 26 entries. Technical Skills opens with its first card in focus.
- Clicking a title or a card moves that card to the centre, and the page does not scroll.
- At 760px or less, every section stacks in one column with no horizontal scrolling.

### Error / Invalid Behavior

- An image fails to load: its alt text shows in its place, and the rest of the page is unchanged.
- Supabase is unconfigured: Home renders the same, because it does not use Supabase.

### Empty / Edge Cases

N/A

---

## 11. Acceptance Criteria

- [ ] Opening the root URL of the built site shows Home at `/#/`, and the page holds no "Get started" heading, counter button, or demo React or Vite image. (FR-01)
- [ ] At 1280px and 320px wide, the first content below the header is the introduction, and its name is larger than any other text on the page. (FR-02)
- [ ] The page has exactly one `h1`, and it reads `Jacob Williams`. (FR-03)
- [ ] The text `Full-Stack Developer` appears directly under the name. (FR-04)
- [ ] The paragraph under the tagline matches the Introduction text in section 8 word for word. (FR-05)
- [ ] The Technical Skills section shows five titles and five cards holding 20 entries, in the order and wording of section 8, and each card shows its group's summary sentence. (FR-06)
- [ ] The first card is in focus on load, and all five cards are in view at 1280px wide. (FR-06)
- [ ] Clicking a title, clicking a card, or using the Up and Down arrow keys on the titles brings that card into focus and marks its title as open. (FR-06)
- [ ] Under the cards at 1280px and 320px wide, five dots mark the card in focus. Choosing a dot or a circled arrow changes the card, and the arrows loop past the first and last card. (FR-16)
- [ ] At 320px wide, the Swipe hint shows three arrows on each side, fading going outward from the word, and a side's arrows disappear at the first or last card. (D-25)
- [ ] The Soft Skills section shows six entries, in the order and wording of section 8. (FR-07)
- [ ] Technical Skills comes after the introduction and Soft Skills comes after Technical Skills. (FR-08)
- [ ] An entry in Technical Skills and an entry in Soft Skills show an icon, then a name, then a description, with the same fonts and text colours. (FR-08)
- [ ] At 1280px wide, each carousel card shows its entries in one column and Soft Skills shows two rows of three. Soft Skills cards have a see-through fill and drift like the carousel cards. Hovering one lifts it toward the cursor and shows a slightly stronger fill, a hairline peach border and a faint peach glow. On a touch device nothing changes on tap, and under reduced motion the card shows the fill, border and glow without moving. At 320px wide, Soft Skills shows one column, the Technical Skills heading sits directly above the cards with no titles in view, and nothing scrolls sideways. (FR-08)
- [ ] Hovering a Technical Skills card lifts it toward the cursor and shows the hairline peach border and faint peach glow, and clicking a side card still brings it into focus. (D-29)
- [ ] The Intro section shows the photo with its alt text, to the right of the text at 1280px wide, with even gaps to the panel's top, right and bottom edges, and above the name at 320px wide. (D-30)
- [ ] Each of the 26 entries shows the icon named for it in section 8, and no Soft Skills icon is a technology's logo. (FR-09)
- [ ] Each of the 26 entries shows a description of more than one word under its name. (FR-10)
- [ ] The Intro, Technical Skills and Soft Skills sections each sit in their own `Frame` outline, with visible space between the outlines, at 1280px and 320px wide. (FR-11)
- [ ] One image appears in each of the three sections, loaded from the three files in section 8. (FR-12)
- [ ] Each image shows the subject listed for it in section 8, and none shows text, a logo or franchise material. (FR-13)
- [ ] Each image's `alt` attribute matches its text in section 8. (FR-14)
- [ ] `src/pages/Home.jsx` has a comment beside each of the three image imports naming Google Gemini as the generating tool. (FR-15)
