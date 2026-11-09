# Feature Specification — Portfolio Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Portfolio Page
- **Related Area:** Front-end: public page, static content, résumé download, AI-generated imagery

---

## 1. Feature Goal

The Portfolio page gives an employer the evidence behind the skills on Home. It lists the site owner's education, work experience and completed projects, most recent first where dates apply, and each project has an image about that project. A visitor can download the owner's résumé as a PDF from the top of the page.

---

## 2. Feature Scope

### In Scope

- The Portfolio page at `/portfolio`.
- The Education section: two institutions, with the page heading and the résumé button at its top.
- The Work Experience sections: four roles, each in its own section block.
- The Projects section: three completed projects shown as cards, each with its own AI-generated image.
- The résumé PDF, served from `public/` and downloaded through a button.
- The `PeachButton` component, because this is the first feature that uses it.

**Files this feature may change**

- `src/pages/Portfolio.jsx`, `src/pages/Portfolio.css` (new)
- `src/components/PeachButton.jsx`, `src/components/PeachButton.css` (new)
- `src/components/PortfolioEntry.jsx`, `src/components/PortfolioEntry.css` (new)
- `src/components/ProjectEntry.jsx`, `src/components/ProjectEntry.css` (new)
- `src/components/RingDivider.jsx`, `src/components/RingDivider.css` (new)
- `src/components/PageSection.jsx`, `src/components/PageSection.css` (existing, shared with other features; adding the `heading` and `label` props approved by the site owner on 2026-11-08)
- `src/assets/portfolioContent.json` (new)
- `src/assets/portfolio-rocket-food-delivery.png`, `src/assets/portfolio-codebloggs.png`, `src/assets/portfolio-rocket-elevators.png` (new)
- `public/Jacob-Williams-Resume.pdf` (new)
- `src/App.jsx` (existing, shared with other features; adding the `/portfolio` route approved by the site owner on 2026-11-07)
- `src/index.css`, `src/components/SkillGrid.css` (existing, shared with other features; moving the `--card-*` variables approved by the site owner on 2026-11-08)

### Out of Scope

- The header link to `/portfolio`, the current-page mark and the footer: `header-footer.feature.md`.
- Changes to `Frame`: `home-page.feature.md` built it, and this feature reuses it unchanged.
- An intro section above Education: the site owner chose not to have one.
- Background images behind the sections: the site owner chose images on the project entries instead.
- Links to live projects or their repositories: no source asks for them.
- The Personal Portfolio project listed on the résumé: the site owner chose three projects.
- Filtering, sorting controls or detail pages for entries: no source asks for them.
- Any Supabase use: this page shows static content only.
- Translated text and a light theme: the extra-mile features `languages.feature.md` and `light-dark-mode.feature.md`.

### Feature-Specific Constraints

- **Dependencies:** this feature builds on `setup-deploy.feature.md` (the route table in `src/App.jsx`), `header-footer.feature.md` (the layout and the existing header link to `/portfolio`) and `home-page.feature.md` (`PageSection` and `Frame`).
- **Images come from the site owner:** Google Gemini is used outside this repository, so the three image files must exist before `src/pages/Portfolio.jsx` can import them.
- **Exception to `ai-spec.md` section 5 (No franchise material):** the project images show the site owner's own project interfaces, including those projects' names, logos and on-screen text. Approved by the site owner on 2026-11-08.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Portfolio route

**Requirement:**
The Portfolio page is shown at `/portfolio`.

**Expected Result:**
Opening `/#/portfolio`, or choosing Portfolio in the header, shows the Portfolio page.

### FR-02 — Education entries

**Requirement:**
The Education section lists at least one institution.

**Expected Result:**
The section shows the two institutions in section 8.

### FR-03 — Education fields

**Requirement:**
Each education entry shows the institution name, the degree or program, and the dates.

**Expected Result:**
All three values are visible on each entry.

### FR-04 — Education order

**Requirement:**
Education entries are ordered most recent first.

**Expected Result:**
CodeBoxx Academy appears above Lenoir-Rhyne University.

### FR-05 — Work entries

**Requirement:**
The Work Experience section lists at least one role.

**Expected Result:**
The section shows the four roles in section 8.

### FR-06 — Work fields

**Requirement:**
Each work entry shows the job title, the organization and the employment dates.

**Expected Result:**
All three values are visible on each entry.

### FR-07 — Work description

**Requirement:**
Each work entry has a description referencing real responsibilities or achievements.

**Expected Result:**
Each entry shows its summary paragraph and all of its bullets from section 8.

### FR-08 — Work order

**Requirement:**
Work entries are ordered most recent first.

**Expected Result:**
The roles appear in this order: Fidelis Food Group, Curate Foodservice, Semper Foods, Century 21.

### FR-09 — Project entries

**Requirement:**
The Projects section presents at least one completed piece of work.

**Expected Result:**
The section shows the three projects in section 8.

### FR-10 — Project fields

**Requirement:**
Each project entry shows its name, the technologies used and a description of what it was for.

**Expected Result:**
All three values are visible on each entry.

### FR-11 — Project image

**Requirement:**
Each project entry has an accompanying image.

**Expected Result:**
Each of the three entries shows its own image at full opacity.

### FR-12 — Résumé download

**Requirement:**
A button on the page downloads the site owner's résumé as a PDF.

**Expected Result:**
Activating the button saves `Jacob-Williams-Resume.pdf`, and the file opens as the two-page résumé.

### FR-13 — Distinct sections

**Requirement:**
The page is divided into at least three visually distinct sections, separated by spacing, background contrast or dividers.

**Expected Result:**
Education, each of the four work roles and Projects each sit in their own outlined panel, with visible space between the panels.

### FR-14 — AI-generated images

**Requirement:**
The page carries at least two AI-generated images.

**Expected Result:**
The three project images are device mockups generated by AI from real screenshots of the projects.

### FR-15 — Imagery complements the content

**Requirement:**
The AI imagery complements the page's content rather than decorating around it.

**Expected Result:**
Each image shows the real interface of the project it sits beside, as listed in section 8.

### FR-16 — Project image alt text

**Requirement:**
Each project image has alt text describing that image.

**Expected Result:**
Each `<img>` carries the matching alt text from section 8.

### FR-17 — Image generating tool documented

**Requirement:**
The tool that generated each project image is documented.

**Expected Result:**
`src/pages/Portfolio.jsx` holds a comment beside each image import stating that the image was generated with Google Gemini.

---

## 4. Decisions Already Taken

- **D-01:** The page has six stacked sections in this order: Education, one for each of the four work roles, Projects. There is no intro section - business doc (The Public Pages: order of the page's content, at least three sections); site owner decisions, 2026-11-07 and 2026-11-08 (one section per work role).
- **D-02:** `Portfolio` lives in `src/pages/Portfolio.jsx` and is the element of a new `Route` at `/portfolio` in `src/App.jsx` - project-wide spec (section 3); existing code (`NAV_LINKS` in `src/components/Layout.jsx`); site owner decision, 2026-11-07.
- **D-03:** The page heading and the section headings sit above the outlined panels, through the `heading` prop of `PageSection`. Above the Education panel are the `h1` reading `Portfolio`, as the page's one top heading, and the `h2` reading `Education`. Above the first work role's panel is the `h2` reading `Work Experience`, and above the Projects panel is its own `h2` - site owner decisions, 2026-11-08; project-wide spec (section 5: text sizes).
- **D-04:** The résumé button sits at the top of the page on the right, on the same row as the `h1`, above the Education panel. At 760px or less it moves below the `h1`, aligned left - site owner decision, 2026-11-08; project-wide spec (section 5: breakpoint).
- **D-05:** The résumé button is a `PeachButton` labelled `Download Résumé`. `PeachButton` renders an `<a>` and takes `href`, `download` and its label as children, to the design in `ai-spec.md` section 5. The résumé button passes an `href`, so it stays an `<a>`; `contact-page.feature.md` (D-08) added the `<button>` form - project-wide spec (section 5: peach button, where the pieces are built).
- **D-06:** The PDF is `public/Jacob-Williams-Resume.pdf`. The button uses a plain `<a>` with `href="/Jacob-Williams-Resume.pdf"` and a `download` attribute, not a React Router `Link`, because the file is not a route - project-wide spec (section 5: `public/` holds the résumé PDF; section 7: routing); site owner's file.
- **D-07:** The entries live in `src/assets/portfolioContent.json`, which `Portfolio` imports - portal slides (Slide #7: data comes from static JSON files); existing code (`src/assets/homeContent.json`).
- **D-08:** The education and work text comes from the site owner's résumé, unchanged except that names printed in capitals on the résumé are written in normal case. Locations are not shown, because no source asks for them - site owner decision, 2026-11-07; business doc (The Public Pages: required fields).
- **D-09:** Education entries show only the three required fields. Work entries show the résumé's summary paragraph and all of its bullets. Each project shows a short name, its four main technologies from the résumé and a short paragraph drafted from the résumé's facts, reviewed with this specification - site owner decision, 2026-11-08; business doc (The Public Pages: required fields).
- **D-10:** The three projects, in this order, are Rocket Food Delivery, CodeBloggs and Rocket Elevators - site owner decision, 2026-11-08.
- **D-11:** "Most recent first" comes from the order of the arrays in `portfolioContent.json`. Dates are display text and are not sorted in code - business doc (The Public Pages); project-wide spec (section 5: build only what is described).
- **D-12:** Each section is a `PageSection` with no `image` prop, so no section has a background image - site owner decision, 2026-11-07; existing code (`src/components/PageSection.jsx`).
- **D-13:** Each project image is a device mockup generated with Google Gemini by the site owner from a real screenshot of that project, and saved as a widescreen PNG file, 1400px wide, in `src/assets/`. The CodeBloggs image shows a generic laptop and a generic phone with the Home page and its posts. The Rocket Elevators image shows two desktop views: the Module 2 home page and the Module 3 quote form filled in with sample data. The Rocket Food Delivery image shows two generic phones with the Login and Restaurants screens, like the site owner's reference. On the Login screen, Gemini adds password dots in the same orange as the email placeholder. No device carries a maker's logo, and each image has a near-black background with peach light accents, so the images match the site. The CodeBloggs and Rocket Food Delivery screenshots use sample data - site owner decisions, 2026-11-08 (reference layout; several screens for Rocket Food Delivery); `home-page.feature.md` (D-20, the same format); project-wide spec (section 7: AI-generated imagery).
- **D-14:** Projects are shown as a grid of cards, following the site owner's reference layout: the image across the top of the card, then the name, the technology tags and the description. Above 760px the grid has three columns, the same as Soft Skills on Home, so the three cards fill one row. At 760px or less it has one column. Cards in the same row are the same height - site owner decision, 2026-11-08; `home-page.feature.md` (D-14); project-wide spec (section 5: breakpoint).
- **D-15:** Each entry in `portfolioContent.json` names its image with an `imageKey`. `Portfolio.jsx` maps that key to the imported file, because JSON cannot hold an image import - existing code (`src/lib/skillIcons.js`, the same approach for icons).
- **D-16:** The generating tool is documented in a code comment beside each image import, the way Home documents its images - business doc (The Public Pages); existing code (`src/pages/Home.jsx`).
- **D-17:** `PortfolioEntry` renders education and work entries, so both keep one style. `ProjectEntry` renders one project card, because it adds an image and technology tags - project-wide spec (section 5: one component per file, reuse an existing pattern).
- **D-18:** Each education and work entry's title is an `h3` in Marcellus SC Bold in `--text`. Dates use the spaced-out bold capitals label style in `--peach`. Education entries are separated by a `RingDivider` - project-wide spec (section 5: fonts, text sizes, colour variables).
- **D-19:** Each project image is an `<img>` at full opacity, in a 16:9 box cropped with `object-fit: cover`, so it is not stretched and every card's text starts at the same height. It reaches the card's top, left and right edges and follows the card's rounded top corners - site owner decisions, 2026-11-07 and 2026-11-08.
- **D-20:** Project cards use the site's dark card look, not the light fill of the reference: the Soft Skills card's see-through fill at 70%, 20px rounded corners, the slow up-and-down drift out of step, and the same hover (a 4px lift, the pull toward the cursor through `handleMagnetMove` in `src/lib/magnetHover.js`, the fill rising to 85%, the hairline `--peach` border and the faint glow), off on touch devices, with the movement off under reduced motion. The five `--card-*` variables (`--card-fill`, `--card-shadow`, `--card-glow`, `--card-soft-glow`, `--card-ring`) move unchanged from the `.skill-carousel, .skill-grid-hover` rule in `src/components/SkillGrid.css` to `:root` in `src/index.css`, so Home and `ProjectEntry.css` share one set of values and Home's cards look the same as before - site owner decisions, 2026-11-08 (must match the current site; moving the variables approved); `home-page.feature.md` (D-28); project-wide spec (section 5: maintainability rules).
- **D-21:** A project's name is an `h3` in Marcellus SC Bold in `--text`, 16px, as on the Soft Skills cards. Its technologies are a list of tags in `Federo` at 12px, in `--peach`, each with a 1px `--peach` border and 10px rounded corners. Its description is a paragraph in `Federo` in the default paragraph colour - site owner decision, 2026-11-08 (reference layout); project-wide spec (section 5: fonts, text sizes, colour variables); `home-page.feature.md` (D-27).
- **D-22:** Education and work entries carry peach accents from the site owner's design reference. A small open ring sits before the entry's dates. After the title, a line fades in toward a small hollow ring and a dot; it is hidden at 760px or less, where titles wrap. After the organization or program, two small dots and a short line that fades out follow the last word. A `RingDivider`, a thin peach line reaching both sides of the panel with a ringed dot lined up with the text, sits between a work role's dates and its summary, and between Education entries. All of them are `aria-hidden` - site owner decision, 2026-11-08 (reference image and suggested placements).

---

## 5. Task Breakdown

Order: the image files and the PDF come first because the page depends on them. The content and the components come next, smallest first, then the page that uses them. `src/App.jsx` changes last, so the route only exists once the page is ready.

1. **T-01 (FR-11, FR-14, FR-15, D-13):** The site owner generates the three device mockups with Google Gemini from the screenshots in section 8 and saves them under the names listed there. - `src/assets/portfolio-rocket-food-delivery.png`, `src/assets/portfolio-codebloggs.png`, `src/assets/portfolio-rocket-elevators.png`
2. **T-02 (FR-12, D-06):** Place the site owner's résumé in `public/`. - `public/Jacob-Williams-Resume.pdf`
3. **T-03 (FR-02 to FR-10, FR-16, D-07 to D-11, D-15):** Create the content file with the shape and the text in section 8. - `src/assets/portfolioContent.json`
4. **T-04 (FR-12, D-05):** Create `PeachButton` to the design in `ai-spec.md` section 5. - `src/components/PeachButton.jsx`, `src/components/PeachButton.css`
5. **T-05 (FR-03, FR-06, FR-07, D-09, D-17, D-18):** Create `PortfolioEntry`: a title, a subtitle, dates, and an optional summary and bullets. - `src/components/PortfolioEntry.jsx`, `src/components/PortfolioEntry.css`
6. **T-06 (FR-10, FR-11, FR-16, D-09, D-14, D-17, D-19, D-20, D-21):** Move the `--card-*` variables to `:root` as in D-20. Create `ProjectEntry`: one card with the image and its alt text, the name, the technology tags and the description, with the card look and hover in D-20. - `src/index.css`, `src/components/SkillGrid.css`, `src/components/ProjectEntry.jsx`, `src/components/ProjectEntry.css`
7. **T-07 (FR-02 to FR-17, D-01, D-03, D-04, D-12, D-15, D-16):** Create `Portfolio`: six `PageSection`s built from the content file, the heading row with the résumé button, the image map and the tool comments. - `src/pages/Portfolio.jsx`, `src/pages/Portfolio.css`
8. **T-08 (FR-01, D-02):** In `src/App.jsx`, import `Portfolio` and add its `Route` at `/portfolio`. - `src/App.jsx`
9. **T-09 (all FRs):** Verify the feature against section 11 at phone and desktop widths. - no file change
10. **T-10 (D-03, D-22):** Move the headings above the panels through the `heading` prop, and add the entry accents and `RingDivider`. - `src/components/PageSection.jsx`, `src/components/PageSection.css`, `src/components/RingDivider.jsx`, `src/components/RingDivider.css`, `src/components/PortfolioEntry.jsx`, `src/components/PortfolioEntry.css`, `src/pages/Portfolio.jsx`, `src/pages/Portfolio.css`

---

## 6. User Flow

**Main flow**

1. The visitor chooses Portfolio in the header.
2. The page opens on the Education section, with the `Portfolio` heading on the left and the résumé button on the right.
3. The visitor scrolls through Education, Work Experience and Projects.
4. The visitor activates the résumé button.
5. The browser saves the PDF, and the visitor stays on the page.

**Alternate / failure flow**

N/A

---

## 7. Interfaces Involved

### Pages

- `/portfolio` (`/#/portfolio`) - new route: shows `Portfolio`.

### Components

- `Portfolio` (`src/pages/Portfolio.jsx`) - new: composes the six sections from the content file.
- `PeachButton` (`src/components/PeachButton.jsx`) - new: the call-to-action link from `ai-spec.md` section 5, reusable by other pages.
- `PortfolioEntry` (`src/components/PortfolioEntry.jsx`) - new: one education or work entry.
- `ProjectEntry` (`src/components/ProjectEntry.jsx`) - new: one project card with its image.
- `RingDivider` (`src/components/RingDivider.jsx`) - new: the peach line with a ringed dot.
- `handleMagnetMove` (`src/lib/magnetHover.js`) - existing, unchanged: reports the cursor position for the card hover.
- `src/index.css` - existing, changed: gains the `--card-*` variables at `:root`.
- `src/components/SkillGrid.css` - existing, changed: loses the `--card-*` variables.
- `src/assets/portfolioContent.json` - new: the page's entries.
- `PageSection` (`src/components/PageSection.jsx`) - existing, changed: holds each section in a `Frame`, and gains the `heading` and `label` props.
- `Frame` (`src/components/Frame.jsx`) - existing, unchanged: the outlined panel.
- `Layout` (`src/components/Layout.jsx`) - existing, unchanged: renders `Portfolio` inside the header and footer, and already lists the `/portfolio` link.
- `App` (`src/App.jsx`) - existing, changed: mounts `Portfolio` at `/portfolio`.

### Endpoints

N/A

---

## 8. Data

### Inputs

From `src/assets/portfolioContent.json`:

- `education` (array) - each item has `institution`, `program` and `dates`, all text.
- `work` (array) - each item has `title`, `organization`, `dates` and `summary`, all text, and `highlights` (array of text).
- `projects` (array) - each item has `name`, `description`, `imageKey` and `imageAlt`, all text, and `technologies` (array of text).

### Outputs / Returned Data

**Education**

| Institution | Program | Dates |
|---|---|---|
| CodeBoxx Academy | AI Native Full Stack Development Program | Jul 2026 – Nov 2026 |
| Lenoir-Rhyne University | 78 of 120 Credits Completed toward a B.A. in Marketing – Minor in Management | Aug 2015 – May 2017 |

**Work Experience**

**1. Business Systems Manager & Wholesale Food Broker** - Fidelis Food Group, LLC - Feb 2024 – Apr 2026

Summary: Recruited as a startup member with a foundational role in establishing Fidelis Food Group, LLC as an operational frozen food wholesaler, later transitioning into a hybrid role as Wholesale Broker & Systems Manager after launch. Led development of the company’s internal technology and integration of parent company’s business systems. Ensured adoption of internal systems by a newly formed 4-person sales team, optimizing operational efficiency.

- Played a pivotal role in building and positioning the company as a wholesale distributor of frozen #2 further processed proteins and overrun excess inventory commodities during Q2–Q3 and the beginning of Q4, leading up to its launch.
- Conceptualized and built proprietary technology system tailored to the wholesale food industry, which served as the foundation of the company’s infrastructure, directly enabling the company’s immediate post-launch sales
- Secured key vendor relationships, facilitating credit application processing to obtain advantageous payment terms
- Successfully launched Fidelis Food Group on November 3rd, rapidly generating $5.1M in company revenue by year-end (59 days)

**2. National Accounts Sales Manager** - Curate Foodservice - May 2023 – Feb 2024

Summary: Managed sales and account growth within the Chartwells Higher Education sector amid enforced non-compete restrictions during ongoing litigation. Strategically shifted focus to approved markets, revitalizing and expanding partnerships by 48.75% while driving revenue and profitability through high-volume outreach and strategic sourcing.

- Generated $143K in revenue across 8 orders within 3 weeks, driving $26,286 in profit before a non-compete lawsuit, showcasing immediate sales momentum
- Reestablished relationships and secured transactions with 26 Chartwells university accounts that had not purchased since before COVID-19 (2020), reviving dormant partnerships and expanding company sales footprint
- Increased active Chartwells accounts from 80 to 119, adding 13 new university partners and driving a 63.8% YoY revenue increase from $94K in Jan. 2023 to $154K in Jan. 2024.
- Increased average profit margin per approved product group by 10% by prioritizing opportunity-based purchases over always-available inventory, reducing product costs.
- Executed 80–100 calls per week with a 33% engagement rate, ensuring GPO contract compliance, which restricted product offers via email without prior conversation.

**3. Sales Operations Specialist** - Semper Foods, LLC - Jun 2021 – May 2023

Summary: Established & managed portfolio of wholesale frozen food customers creating repeat business through relationship-driven sales with a focus on #2 value-added protein products. Played a key role in driving the company’s 115% YoY revenue growth, from $13M in 2021 to $28M in 2022, generating $5.67M in total sales revenue across 184 orders over two years.

- Ranked 3rd out of 12 sales reps, driving $3.93M in sales revenue in 2022, placing among the top 3 sales producers, who collectively generated 59% of the company’s total revenue. (1st & 2nd rankings were held by two senior reps with 5+ years of industry experience)
- Generated $853,078 in gross trade profit (GTP) in 2022, averaging $71K/month, while achieving a 21.68% profit margin: exceeding the company average by 5.21%
- Led sales team in new customer acquisition in 2022, successfully closing 27 new accounts with no prior transaction history, acquiring a new customer every 2 weeks (10 business days) on average
- Spearheaded the company’s expansion into the pet food industry in 2023 by identifying key opportunities and securing the first-ever sale in this sector, diversifying the company’s customer base and establishing a new revenue stream.
- Delivered immediate impact in 2021 by contributing $847,909 in revenue within my first 180 days in the industry, accounting for 13.04% of company’s Q3–Q4 revenue ($6.5M total)

**4. Licensed Real Estate Agent [Florida & Michigan]** - Century 21 ListSmart | Century 21 C. Howard - Aug 2017 – Jun 2021

Summary: Top-performing real estate agent representing buyers and sellers in residential and commercial transactions, specializing in seller representation and new development projects. Consistently ranked among the top agents in the office, recognized for sales excellence, client satisfaction, and industry leadership. Recognized for strong negotiation skills, strategic marketing, and delivering seamless transactions while maintaining a high standard of client service.

- Ranked 2nd in YTD Office Performance at Time of Industry Exit (June 2021) – Outperformed 53 other licensed agents (Managing Broker ranked 1st.)
- Closed $3,229,261 in YTD sales volume and held the office’s highest active listing volume ($5,464,800) at time of industry exit (June 2021)
- Co-Leader of Office New Development Division – Oversaw $38 million in new development projects from project inception to final transaction execution
- Century 21 Sales Awards: 2020 Masters Ruby, 2019 Platinum Sales Achievement, 2018 Gold Sales Achievement
- 2018 Century 21 C. Howard Rookie of the Year – Awarded for outstanding sales performance as a first-year agent
- 3x Century 21 Quality Service Award (2018, 2019 & 2020) – 90% overall client satisfaction score

**Projects**

| Name | Technologies | Description |
|---|---|---|
| Rocket Food Delivery | Spring Boot, MySQL, React Native, Expo Router | A food-ordering platform with a Spring Boot REST API and an iOS and Android app. Customers browse restaurants and place orders, and couriers claim and deliver them. The API is secured with JWT and was built test-first. |
| CodeBloggs | React, Node.js, Express, MongoDB | A social blogging platform I co-built on the MERN stack. Members publish posts, like and comment on them, and admins manage users and content. The Login and Home pages reached 100 in all four Lighthouse categories. |
| Rocket Elevators | React, Node.js, Express, MongoDB Atlas | A marketing website with a real-time elevator quote calculator, backed by an Express REST API on MongoDB Atlas. RE Admin, a companion MERN app, lets admins log in and manage agents. |

**Project images**

| File (`src/assets/`) | `imageKey` | Device and screen shown | Alt text |
|---|---|---|---|
| `portfolio-rocket-food-delivery.png` | `rocketFoodDelivery` | Two smartphones showing the Login and Restaurants screens of the Rocket Food Delivery app | Two smartphones showing the Rocket Food Delivery login screen and a restaurant list with food photos and star ratings. |
| `portfolio-codebloggs.png` | `codeBloggs` | A laptop showing the desktop CodeBloggs Home page and a phone showing the mobile Your Posts view | A laptop showing the CodeBloggs Home page with a member profile card, and a phone showing a post with its comments. |
| `portfolio-rocket-elevators.png` | `rocketElevators` | Two desktop views: the Rocket Elevators home page from Module 2 and the completed quote form from Module 3 | The Rocket Elevators home page with a modern elevator and the heading Driven to Elevate, beside its quote form showing an estimated price table. |

**Page text**

- `h1`: Portfolio
- `h2`: Education, Work Experience, Projects
- Résumé button: Download Résumé

### Stored / Modified Data

N/A

---

## 9. Validation

N/A

---

## 10. Expected Behavior

### Success Behavior

- `/#/portfolio` shows the six sections in order, inside the shared layout, with the Portfolio link marked as the current page.
- Activating the résumé button saves the PDF and leaves the visitor on the page.

### Error / Invalid Behavior

N/A

### Empty / Edge Cases

N/A

---

## 11. Acceptance Criteria

- [ ] Opening `/#/portfolio` shows the Portfolio page, and choosing Portfolio in the header reaches the same page. (FR-01)
- [ ] The Education section shows both institutions from section 8. (FR-02)
- [ ] Each education entry shows its institution, program and dates. (FR-03)
- [ ] CodeBoxx Academy appears above Lenoir-Rhyne University. (FR-04)
- [ ] The Work Experience section shows all four roles from section 8. (FR-05)
- [ ] Each work entry shows its job title, organization and dates. (FR-06)
- [ ] At 1280px wide, each Education and work title has the fading line, ring and dot after it, each organization or program has the two dots and fading line after it, each entry's dates have the open ring before them, and a ringed peach line separates a work role's dates from its summary. (D-22)
- [ ] Each work entry shows its summary paragraph and every bullet from section 8. (FR-07)
- [ ] The roles appear in the order Fidelis Food Group, Curate Foodservice, Semper Foods, Century 21. (FR-08)
- [ ] The Projects section shows Rocket Food Delivery, CodeBloggs and Rocket Elevators, in that order. (FR-09)
- [ ] Each project card shows its name, its four technology tags and its description from section 8. (FR-10)
- [ ] Each project card shows its own image at full opacity, not stretched, across the top of the card. (FR-11)
- [ ] The three cards sit in one row at 1280px wide, at equal height, and in one column at 320px wide. (FR-09, D-14)
- [ ] Project cards have the dark Soft Skills card fill and 20px corners. On hover with a mouse, a card lifts and shows the hairline `--peach` border and glow. (FR-09, D-20)
- [ ] After the `--card-*` variables move, the Home carousel cards and Soft Skills cards show the same fill, shadow and hover as before. (FR-09, D-20)
- [ ] At 1280px wide the résumé button sits on the same row as the `Portfolio` heading, at the right. At 320px wide it sits below the heading. (FR-12)
- [ ] Activating the résumé button saves `Jacob-Williams-Resume.pdf`, the file opens as the two-page résumé, and the page stays on `/#/portfolio`. (FR-12)
- [ ] Education, each of the four work roles and Projects each sit in their own `Frame` outline, with visible space between the outlines, at 1280px and 320px wide. (FR-13)
- [ ] The `Portfolio` heading and the `Education`, `Work Experience` and `Projects` headings sit above the panels, outside their outlines. (D-03)
- [ ] The three project images are present and are device mockups generated with Google Gemini from real project screenshots. (FR-14)
- [ ] Each image shows the device and screen listed for its project in section 8. (FR-15)
- [ ] Each project `<img>` has the alt text listed in section 8. (FR-16)
- [ ] `src/pages/Portfolio.jsx` has a comment beside each of the three image imports naming Google Gemini as the generating tool. (FR-17)
