# Feature Specification — Links Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Links Page
- **Related Area:** front-end

---

## 1. Feature Goal

Visitors get one page that gathers the site owner's curated external destinations: the LinkedIn profile, the GitHub profile, the CodeBoxx site, the YouTube channel, and the React and Supabase documentation. Each destination appears as a card with an AI-generated image, a title, a short description and its URL as plain text, so a visitor can see what is behind a link before leaving the site. Clicking the image or the title opens the destination in a new tab and leaves the portfolio open.

---

## 2. Feature Scope

### In Scope

- The Links page at `/links`.
- Six destination cards shown in a grid.
- One AI-generated thumbnail for each card.

**Files this feature may change**

- `src/pages/Links.jsx`, `src/pages/Links.css` (new)
- `src/components/LinkCard.jsx`, `src/components/LinkCard.css` (new)
- `src/assets/linksContent.json` (new)
- `src/assets/links-linkedin.png`, `src/assets/links-github.png`, `src/assets/links-codeboxx.png`, `src/assets/links-youtube.png`, `src/assets/links-react.png`, `src/assets/links-supabase.png` (new)
- `src/App.jsx` (existing, shared with other features; adding the `/links` route approved by the site owner on 2026-11-09)

### Out of Scope

- The header link to `/links`, which already exists (`header-footer.feature.md`).
- The LinkedIn and GitHub links in the footer (`header-footer.feature.md`).
- Changes to `PageSection`, `Frame`, `PeachButton` or `ProjectEntry`. This feature uses `PageSection` as it is and adds its own card.
- Previews fetched from the destination sites. Each thumbnail is a stored image file.
- Filtering, sorting or searching the cards.
- Tracking clicks on the links.

### Feature-Specific Constraints

- **Dependencies:** this feature builds on `setup-deploy.feature.md` (the route table in `src/App.jsx`), `header-footer.feature.md` (the layout and the existing header link to `/links`), `home-page.feature.md` (`PageSection`, `Frame` and the `skill-float` animation) and `portfolio-page.feature.md` (the `--card-*` colour variables and the card look that `LinkCard` follows).
- **Images come from the site owner:** Google Gemini is used outside this repository, so the six image files must exist before `src/pages/Links.jsx` can import them.
- **Exception to the "No franchise material" rule in `ai-spec.md` section 5:** the card titles and URLs may name LinkedIn, GitHub, CodeBoxx, YouTube, React and Supabase, because each card must carry the title and URL of its destination, and each thumbnail may show the logo of its own card's destination, approved by the site owner on 2026-11-09. Thumbnails show no other brand's logo or artwork.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Links page exists

**Requirement:**
The site has a public Links page.

**Expected Result:**
Opening `/#/links` shows the Links page, with the heading `Links`, inside the shared layout.

### FR-02 — Curated destinations

**Requirement:**
The page lists the six curated external destinations named in section 8, which is above the minimum of three.

**Expected Result:**
The page shows exactly six destinations: GitHub, CodeBoxx, YouTube, LinkedIn, React and Supabase, in that order.

### FR-03 — Structured card

**Requirement:**
Each destination is rendered as a structured card with the same parts in the same order.

**Expected Result:**
Every card shows, from top to bottom, its thumbnail, title, description and URL.

### FR-04 — Thumbnail

**Requirement:**
Each card carries a thumbnail image.

**Expected Result:**
Each of the six cards shows its own image from section 8, and no two cards show the same image.

### FR-05 — Title

**Requirement:**
Each card carries a title.

**Expected Result:**
Each card shows its title from section 8.

### FR-06 — Description

**Requirement:**
Each card carries a description of one to three sentences.

**Expected Result:**
Each card shows its description from section 8, and every description has at least one sentence and at most three.

### FR-07 — Linked thumbnail and title

**Requirement:**
Each card's thumbnail and title link to the URL of its destination.

**Expected Result:**
Each card's thumbnail and title are links whose target is the card's URL from section 8. The card also shows that full URL as plain text at its bottom.

### FR-08 — Opens in a new tab

**Requirement:**
Following a card's link opens the destination in a new tab.

**Expected Result:**
Clicking any card's thumbnail or title opens the destination in a new tab, and the portfolio stays open on the Links page in the original tab.

### FR-09 — AI-generated images

**Requirement:**
The page carries at least one AI-generated image; on this page, all six thumbnails are AI-generated.

**Expected Result:**
All six thumbnail files were generated with Google Gemini.

### FR-10 — Images relevant to their card

**Requirement:**
Each AI-generated thumbnail is contextually relevant to the destination on its card.

**Expected Result:**
Each thumbnail shows the subject listed for its card in section 8.

### FR-11 — Alternative text for each thumbnail

**Requirement:**
Each thumbnail has alternative text describing that image.

**Expected Result:**
Each thumbnail's `alt` attribute holds the `imageAlt` value of its entry in section 8, and the text describes what the image shows.

### FR-12 — Generating tool documented

**Requirement:**
The tool that generated the thumbnails is documented.

**Expected Result:**
`src/pages/Links.jsx` holds a comment beside each image import stating that the image was generated with Google Gemini.

---

## 4. Decisions Already Taken

- **D-01:** `Links` lives in `src/pages/Links.jsx` and is the element of a new `Route` at `/links` in `src/App.jsx` - project-wide spec (section 3); existing code (`NAV_LINKS` in `src/components/Layout.jsx`); site owner decision, 2026-11-09.
- **D-02:** The destinations, in this order, are the site owner's GitHub profile, CodeBoxx, the site owner's YouTube channel, the site owner's LinkedIn profile, the React documentation and the Supabase documentation - site owner decision, 2026-11-09.
- **D-03:** The LinkedIn and GitHub URLs are the ones the footer already uses - existing code (`src/components/Footer.jsx`); `header-footer.feature.md`.
- **D-04:** The page is one `PageSection` with the label `Links`, no `image` prop, and the `h1` reading `Links` passed through its `heading` prop, above the outlined panel - existing code (`src/components/PageSection.jsx`, `src/pages/Portfolio.jsx`).
- **D-05:** With one section, the page shows no `PageTracker`: `PageTracker` renders nothing for fewer than two sections - project-wide spec (section 5: page tracker); existing code (`src/components/PageTracker.jsx`).
- **D-06:** The cards sit in a `<ul>` grid: three columns above 760px and one column at 760px or less, with a 16px gap - site owner decision, 2026-11-09; existing code (`.portfolio-projects` in `src/pages/Portfolio.css`); project-wide spec (section 5: breakpoint).
- **D-07:** The entries live in `src/assets/linksContent.json`, which `Links` imports - portal slides (Slide #7: data comes from static JSON files); existing code (`src/assets/portfolioContent.json`).
- **D-08:** Each entry names its image with an `imageKey`. `Links.jsx` maps that key to the imported file, because JSON cannot hold an image import - existing code (`PROJECT_IMAGES` in `src/pages/Portfolio.jsx`).
- **D-09:** `LinkCard` is a new component, because `ProjectEntry` has technology tags and no URL, and changing it would alter another feature's component - existing code (`src/components/ProjectEntry.jsx`); project-wide spec (section 5: one component per file).
- **D-10:** `LinkCard` follows the Portfolio project card look: the see-through `--card-fill` at 70%, 20px rounded corners, the `skill-float` drift out of step through `--index`, and the same hover through `handleMagnetMove` in `src/lib/magnetHover.js` - site owner decision, 2026-11-09; existing code (`src/components/ProjectEntry.css`).
- **D-11:** Each thumbnail is an `<img>` at full opacity across the top of the card, in a 16:9 box cropped with `object-fit: cover`, following the card's rounded top corners - site owner decision, 2026-11-09; existing code (`.project-entry-image` in `src/components/ProjectEntry.css`).
- **D-12:** The thumbnails are illustrations generated with Google Gemini by the site owner, one per card, each showing its destination's logo as a glowing peach outline in a circular sci-fi frame on a starry background. They are saved as widescreen PNG files, 1400px wide, in `src/assets/`. The small decorative labels inside the images are kept, because they carry no information - site owner decision, 2026-11-09; project-wide spec (section 7: AI-generated imagery).
- **D-13:** The generating tool is documented in a code comment beside each image import, the way Portfolio documents its images - business doc (The Public Pages); existing code (`src/pages/Portfolio.jsx`).
- **D-14:** A card's title is an `h2`, the next level under the page's `h1`, in Orbitron Bold in `--text` at 16px. Its description is a paragraph in `Tomorrow` Regular in the default paragraph colour - existing code (`.project-entry-body h3` and `.project-entry-description` in `src/components/ProjectEntry.css`); project-wide spec (section 5: fonts).
- **D-15:** The thumbnail and the title are the only links on a card, and both go to the card's URL. The card itself, its description and its URL text are not links - site owner decision, 2026-11-09.
- **D-16:** The title's link sits inside the `h2` and keeps the title's `--text` colour with no underline. Hover and focus come from the global `a` rules - site owner decision, 2026-11-09; project-wide spec (section 5: colour variables, hover and focus); existing code (`src/index.css`, `.footer-link` in `src/components/Footer.css`).
- **D-17:** Both links are plain `<a>` elements with `target="_blank"` and `rel="noopener noreferrer"`, not React Router `Link`s, because the destination is outside the site - existing code (`src/components/Footer.jsx`).
- **D-18:** The card descriptions and thumbnail `alt` texts are the ones in section 8, drafted from existing project content and reviewed with this specification. The descriptions are short and first-person, and tell the visitor what they will find - site owner's reference examples, 2026-11-09; existing code (`src/assets/portfolioContent.json`); business doc (Context: the program's projects).
- **D-19:** The URL is a plain-text paragraph at the bottom of the card, in `Tomorrow` Regular at 10px in `--peach`, and it may break anywhere (`overflow-wrap: anywhere`) so the longest URL stays inside a narrow card. It is pushed to the bottom of the card body, so the URLs in a row line up when descriptions differ in length - site owner decision, 2026-11-09; project-wide spec (section 5: colour variables, text sizes).

---

## 5. Task Breakdown

Order: the image files come first because the page imports them. The content and the card come next, then the page that uses them. `src/App.jsx` changes last, so the route only exists once the page is ready.

1. **T-01 (FR-04, FR-09, FR-10, D-12):** The six thumbnails generated by the site owner with Google Gemini are saved as 1400px-wide PNG files under the names listed in section 8. - `src/assets/links-linkedin.png`, `src/assets/links-github.png`, `src/assets/links-codeboxx.png`, `src/assets/links-youtube.png`, `src/assets/links-react.png`, `src/assets/links-supabase.png`
2. **T-02 (FR-02, FR-05, FR-06, FR-07, FR-11, D-07, D-08, D-18):** Add the six entries from section 8, in order. - `src/assets/linksContent.json`
3. **T-03 (FR-03, FR-04, FR-05, FR-06, FR-07, FR-08, FR-11, D-09, D-10, D-11, D-14, D-15, D-16, D-17, D-19):** Create the card component and its styles. - `src/components/LinkCard.jsx`, `src/components/LinkCard.css`
4. **T-04 (FR-01, FR-02, FR-12, D-04, D-05, D-06, D-08, D-13):** Create the page: import the content and the six images with their comments, then render the heading and the grid of cards inside one `PageSection`. - `src/pages/Links.jsx`, `src/pages/Links.css`
5. **T-05 (FR-01, D-01):** Import `Links` and add its `Route` at `/links`. - `src/App.jsx`
6. **T-06 (all FRs):** Verify the feature against section 11 and the Global Definition of Done. - no file changes

---

## 6. User Flow

**Main flow**

1. The visitor chooses Links in the header navigation, or opens `/#/links` directly.
2. The site shows the Links page with the six destination cards.
3. The visitor reads a card's image, title, description and URL.
4. The visitor clicks the image or the title on a card.
5. The destination opens in a new tab, and the Links page stays open in the original tab.

**Alternate / failure flow**

N/A

---

## 7. Interfaces Involved

### Pages

- `/links` (`src/pages/Links.jsx`) - new: shows the heading and the grid of destination cards.

### Components

- `LinkCard` (`src/components/LinkCard.jsx`) - new: renders one destination's linked thumbnail, linked title, description and plain-text URL.
- `PageSection` (`src/components/PageSection.jsx`) - existing, unchanged: holds the heading and the outlined panel around the grid.
- `Frame` (`src/components/Frame.jsx`) - existing, unchanged: draws the panel outline, through `PageSection`.
- `Layout` (`src/components/Layout.jsx`) - existing, unchanged: wraps the page and already lists Links in `NAV_LINKS`.
- `handleMagnetMove` (`src/lib/magnetHover.js`) - existing, unchanged: reports the cursor position for the card hover.
- `App` (`src/App.jsx`) - existing, changed: mounts `Links` at `/links`.

### Endpoints

N/A

---

## 8. Data

### Inputs

`src/assets/linksContent.json` is an array of entries, each with these fields:

- `title` (text) - the card's title.
- `description` (text, one to three sentences) - the card's description.
- `url` (text, absolute `https://` URL) - the target of the card's two links and the card's plain-text URL.
- `imageKey` (text) - the key `Links.jsx` maps to an imported image.
- `imageAlt` (text) - the thumbnail's alternative text.

Entries, in display order:

**1. GitHub**

- `title`: GitHub
- `description`: The code behind my work. Browse my repositories to see how I structure projects and build features.
- `url`: `https://github.com/jacobwilliams-dev`
- `imageKey`: `github`
- `imageAlt`: The GitHub cat logo drawn as a glowing peach outline inside a circular sci-fi frame on a starry background.
- Image file: `src/assets/links-github.png`
- Image subject: the GitHub cat logo as a glowing peach outline in a circular sci-fi frame.

**2. CodeBoxx**

- `title`: CodeBoxx
- `description`: The AI Native Full Stack Development Program where I made the move into software. It taught me the skills behind every project in my portfolio, and this site too.
- `url`: `https://codeboxx.ai/`
- `imageKey`: `codeboxx`
- `imageAlt`: The CodeBoxx logo drawn as a glowing peach outline inside a circular sci-fi frame on a starry background.
- Image file: `src/assets/links-codeboxx.png`
- Image subject: the CodeBoxx logo as a glowing peach outline in a circular sci-fi frame.

**3. YouTube**

- `title`: YouTube
- `description`: Videos where I explain my code, talk through how I solve coding challenges and demo the projects I build.
- `url`: `https://www.youtube.com/channel/UCCS6YAQ6f83lCYgV8m8m5Og`
- `imageKey`: `youtube`
- `imageAlt`: The YouTube play-button logo drawn as a glowing peach outline inside a circular sci-fi frame on a starry background.
- Image file: `src/assets/links-youtube.png`
- Image subject: the YouTube play-button logo as a glowing peach outline in a circular sci-fi frame.

**4. LinkedIn**

- `title`: LinkedIn
- `description`: Connect with me professionally. My full career story is here, from sales and real estate to software development.
- `url`: `https://www.linkedin.com/in/jacob-williams-profile/`
- `imageKey`: `linkedin`
- `imageAlt`: The LinkedIn logo drawn as a glowing peach outline inside a circular sci-fi frame on a starry background.
- Image file: `src/assets/links-linkedin.png`
- Image subject: the LinkedIn logo as a glowing peach outline in a circular sci-fi frame.

**5. React**

- `title`: React
- `description`: The library I built this site with. The official docs cover components, hooks and how to structure an interface.
- `url`: `https://react.dev/`
- `imageKey`: `react`
- `imageAlt`: The React atom logo drawn as a glowing peach outline inside a circular sci-fi frame on a starry background.
- Image file: `src/assets/links-react.png`
- Image subject: the React atom logo as a glowing peach outline in a circular sci-fi frame.

**6. Supabase**

- `title`: Supabase
- `description`: The backend behind this site. It stores the messages from my contact form and handles the admin login.
- `url`: `https://supabase.com/docs`
- `imageKey`: `supabase`
- `imageAlt`: The Supabase lightning-bolt logo drawn as a glowing peach outline inside a circular sci-fi frame on a starry background.
- Image file: `src/assets/links-supabase.png`
- Image subject: the Supabase lightning-bolt logo as a glowing peach outline in a circular sci-fi frame.

Every image follows the visual design in `ai-spec.md` section 5.

### Outputs / Returned Data

- The heading and the six cards, displayed on the page.

### Stored / Modified Data

N/A

---

## 9. Validation

N/A

---

## 10. Expected Behavior

### Success Behavior

- The Links page shows the heading `Links` and the six cards in the order of section 8.
- The grid has three columns above 760px and one column at 760px or less.
- Clicking a card's image or title opens the destination in a new tab and leaves the Links page open.
- Clicking anywhere else on a card does nothing.

### Error / Invalid Behavior

N/A

### Empty / Edge Cases

N/A

---

## 11. Acceptance Criteria

- [ ] Opening `/#/links` shows the page, with an `h1` reading `Links`, between the shared header and footer. (FR-01)
- [ ] The header's Links link goes to this page and is marked as the current page. (FR-01)
- [ ] The page shows exactly six cards, in this order: GitHub, CodeBoxx, YouTube, LinkedIn, React, Supabase. (FR-02)
- [ ] Every card shows, top to bottom, its thumbnail, title, description and URL. (FR-03)
- [ ] At 1280px wide the grid has three columns; at 760px and at 320px wide it has one column. (FR-03)
- [ ] At 320px wide the YouTube URL stays inside its card and the page has no horizontal scrolling. (FR-03, FR-07)
- [ ] Each card shows its own image from section 8, and no image is repeated. (FR-04)
- [ ] Each card's title matches section 8. (FR-05)
- [ ] Each card's description matches section 8 and has between one and three sentences. (FR-06)
- [ ] Each card's thumbnail and title are links whose `href` is that card's URL from section 8, and the card shows that URL as plain text at its bottom. (FR-07)
- [ ] Clicking each of the six thumbnails and six titles opens the right destination in a new tab, and the original tab stays on the Links page. (FR-08)
- [ ] Each link has `target="_blank"` and `rel="noopener noreferrer"`. (FR-08)
- [ ] All six thumbnail files were generated with Google Gemini, and each shows only its own card's logo. (FR-09)
- [ ] Each thumbnail shows the subject listed for its card in section 8. (FR-10)
- [ ] Each thumbnail's `alt` attribute holds its `imageAlt` value, and that text describes the image shown. (FR-11)
- [ ] `src/pages/Links.jsx` has a comment beside each of the six image imports naming Google Gemini as the generating tool. (FR-12)
