# Jacob Williams | Developer Portfolio

**Live site:** https://jacobwilliams-dev.github.io/

This is my personal portfolio website. It shows employers and recruiters who I am as a developer: my technical and soft skills, education, work experience and projects. Visitors can download my résumé and send me a message through a contact form, so they can get in touch without leaving the site. Those messages are stored privately, and only I can read them, through a hidden admin area.

## Features

- **Home:** introduction, technical skills carousel and soft skills grid
- **Portfolio:** education, work experience, projects and a résumé PDF download
- **Links:** cards pointing to my profiles and to the tools I work with
- **Contact:** a form that checks its input in the browser and stores valid messages in Supabase
- **Login:** hidden admin sign-in with one account and no public registration
- **Back Office:** protected page where the admin reads and deletes messages
- Responsive layout with a compact mobile menu, on every page
- Automatic deployment to GitHub Pages on every push to `main`

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, JavaScript (ES modules, JSX), hand-written CSS |
| Routing | React Router (`HashRouter`) |
| Icons | `lucide-react` and custom PNG icons |
| Build tool | Vite 8 |
| Backend | No custom server. Supabase is the only backend |
| Database | Supabase PostgreSQL with Row Level Security (RLS) |
| Authentication | Supabase Auth (email and password) |
| DevOps | GitHub Actions, GitHub Pages |
| Code quality | ESLint 10 |
| Testing | No automated test suite. Checks are `npm run lint`, `npm run build` and manual browser testing |

## Project Structure

```text
.
├── .github/workflows/deploy.yml   Builds and deploys the site on push to main
├── ai/
│   ├── ai-spec.md                 Project-wide specification
│   └── features/                  One specification per feature
├── docs/                          Elevator pitch scripts and feedback
├── LeetCode-Challenges/           Screenshots of solved challenges
├── public/                        Files served as-is: favicon and résumé PDF
├── src/
│   ├── main.jsx                   Entry point that mounts the app
│   ├── App.jsx                    Route table inside HashRouter
│   ├── index.css                  Colour variables, fonts and global styles
│   ├── assets/                    Images, fonts, skill icons and JSON page content
│   ├── components/                Shared UI (styled ones have a matching .css file)
│   │   ├── Layout.jsx             Wraps every page with the header and footer
│   │   ├── Header.jsx             Sticky navigation and mobile menu
│   │   ├── Footer.jsx             Contact details and copyright
│   │   ├── Backdrop.jsx           Starfield and orbit drawing behind the pages
│   │   ├── PageTracker.jsx        Clickable section dots beside the page
│   │   ├── PageSection.jsx        A page section with its heading and frame
│   │   ├── Frame.jsx              Cut-corner panel drawn in SVG
│   │   ├── PeachButton.jsx        Call-to-action button or link
│   │   ├── RingDivider.jsx        Decorative divider
│   │   ├── ScrollHint.jsx         Pulsing "swipe" hint on the carousel
│   │   ├── SkillCarousel.jsx      Technical skills carousel
│   │   ├── CarouselTracker.jsx    Carousel arrows and dots
│   │   ├── SkillGrid.jsx          Soft skills grid
│   │   ├── PortfolioEntry.jsx     An education or work entry
│   │   ├── ProjectEntry.jsx       A project entry with its image
│   │   ├── LinkCard.jsx           A card on the Links page
│   │   ├── MessageModal.jsx       Full message view in the Back Office
│   │   ├── SecretLoginShortcut.jsx  Keyboard shortcut to the login page
│   │   └── Form.css               Field styles shared by the forms
│   ├── lib/
│   │   ├── supabaseClient.js      The one Supabase client
│   │   ├── validation.js          Shared email format rule
│   │   ├── skillIcons.js          Maps icon names in JSON to icon files
│   │   └── magnetHover.js         Cursor-follow effect on the link cards
│   └── pages/                     One component per route, each with a .css file
│       ├── Home.jsx
│       ├── Portfolio.jsx
│       ├── Links.jsx
│       ├── Contact.jsx
│       ├── Login.jsx
│       └── BackOffice.jsx
├── CONCEPTS.md                    Three technical concepts from this project
├── RESEARCH.md                    LinkedIn update notes and AI image credits
├── index.html                     HTML shell that loads the app
├── vite.config.js                 Vite configuration, sets base: '/'
├── eslint.config.js               Lint rules
└── package.json                   Scripts and dependencies
```

Page text for Home, Portfolio and Links lives in the JSON files in `src/assets/` (`homeContent.json`, `portfolioContent.json`, `linksContent.json`).

## Getting Started

### What you need

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 20.19+ or 22.12+ (the deploy workflow uses Node 24)
- A free [Supabase](https://supabase.com/) account, only if you want the contact form, login and Back Office to work

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/jacobwilliams-dev/jacobwilliams-dev.github.io.git
cd jacobwilliams-dev.github.io
npm install
```

### 2. Start the app

```bash
npm run dev
```

Open http://localhost:5173/ in your browser.

The public pages work at this point. Without Supabase configured, the Contact, Login and Back Office pages show an "unavailable right now" message instead of crashing. To turn them on, continue with the next two steps.

### 3. Set up Supabase

1. Create a new project in the [Supabase dashboard](https://supabase.com/dashboard).
2. Open **SQL Editor** and run this script. It creates the `messages` table and its access rules:

   ```sql
   create table public.messages (
     id bigint generated by default as identity primary key,
     name text not null,
     email text not null,
     message text not null,
     created_at timestamptz not null default now()
   );

   alter table public.messages enable row level security;

   grant insert on public.messages to anon, authenticated;
   grant select, delete on public.messages to authenticated;

   create policy "Anyone can send a message"
     on public.messages for insert
     to public
     with check (true);

   create policy "Signed-in admin can read messages"
     on public.messages for select
     to authenticated
     using (true);

   create policy "Signed-in admin can delete messages"
     on public.messages for delete
     to authenticated
     using (true);
   ```

3. Under **Authentication**, confirm the **Email** provider is enabled.
4. Under **Authentication → Users**, create one user manually with an email and password of your choice, and turn on auto-confirm. This is the admin account.
5. In the Authentication settings, turn off **Allow new users to sign up**. This step matters: the read and delete rules allow any signed-in user, so the admin must be the only account that can exist.

### 4. Add your environment variables

Create a file named `.env` in the project root, using the values described in [Environment Variables](#environment-variables):

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-anon-key
```

Stop the dev server with `Ctrl+C` and run `npm run dev` again, because Vite reads `.env` only when it starts. `.env` is ignored by git and must never be committed.

### 5. Try it out

1. Send a message from the Contact page.
2. Open http://localhost:5173/#/login and sign in with the admin account.
3. Read or delete the message in the Back Office.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves the built site from `dist/` |
| `npm run lint` | Checks the code with ESLint |

## Environment Variables

| Variable | Required | Value to provide | Where to find it |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Only for Supabase features | Your project's API URL, for example `https://your-project-ref.supabase.co` | Supabase dashboard, API section of Project Settings |
| `VITE_SUPABASE_ANON_KEY` | Only for Supabase features | Your project's publishable (anon) key | Supabase dashboard, API keys section of Project Settings |

Only use the publishable (anon) key. It is built into the browser code, so it is public by design, and RLS is what protects the data. **Never use the `service_role` or secret key in this project.**

## Services and API

The site has no server of its own. The browser talks directly to Supabase through the single client exported by `src/lib/supabaseClient.js`. If the variables are missing or invalid, that client is `null`, and the pages that need it show a message.

### Supabase Database: `messages` table

| Column | Type | Notes |
| --- | --- | --- |
| `id` | bigint | Primary key, generated by the database |
| `name` | text | Required |
| `email` | text | Required |
| `message` | text | Required |
| `created_at` | timestamptz | Filled in by the database when the row is inserted |

| Operation | Who is allowed | Called from | Function |
| --- | --- | --- | --- |
| Insert | Anyone | `Contact.jsx` | `supabase.from('messages').insert(fields)` |
| Select | Signed-in users | `BackOffice.jsx` | `supabase.from('messages').select(...).order('created_at', { ascending: false })` |
| Delete | Signed-in users | `BackOffice.jsx` | `supabase.from('messages').delete()`, matched on the message `id` |
| Update | Nobody | Not used | No policy exists |

### Supabase Auth

| Function | Called from | Purpose |
| --- | --- | --- |
| `supabase.auth.signInWithPassword()` | `Login.jsx` | Signs the admin in |
| `supabase.auth.getSession()` | `Login.jsx`, `BackOffice.jsx` | Checks for a session before showing a protected page or the login form |
| `supabase.auth.signOut()` | `BackOffice.jsx` | Ends the session |

### Routes

The app uses `HashRouter`, so every route sits after the `#` in the URL. GitHub Pages only serves files that exist, and with hash routes it always serves `index.html`, so refreshing a page never produces a 404.

| URL | Page | In the navigation |
| --- | --- | --- |
| `/#/` | Home | Yes |
| `/#/portfolio` | Portfolio | Yes |
| `/#/links` | Links | Yes |
| `/#/contact` | Contact | Yes |
| `/#/login` | Admin login | No |
| `/#/backoffice` | Back Office, requires a session | No |

The login page is reached by typing its URL, or with a keyboard shortcut: with the cursor outside a form field, hold `Alt+Shift` (`Option+Shift` on a Mac) and press Left, Up, Right, Down.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`. It installs the dependencies with `npm ci`, builds the site with the two Supabase values injected from repository secrets, and publishes `dist/` to GitHub Pages. If the build fails, nothing is deployed and the previous version stays live.

To deploy your own copy:

1. Name the repository `<your-username>.github.io`. The Vite setting `base: '/'` expects the site to be served from the domain root.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. In **Settings → Secrets and variables → Actions**, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as repository secrets.
4. Push to `main`.

Day-to-day work happens on `dev` and `feature/*` branches, and `main` only receives merges.

## AI-Generated Images

The site logo was generated with ChatGPT. The Home page illustrations, the Portfolio project and organization images, and the Links thumbnails were generated with Google Gemini. The tool is also noted in a comment beside each image import.

## Author

**Jacob Williams**, Full-Stack Developer

- Portfolio: https://jacobwilliams-dev.github.io/
- LinkedIn: https://www.linkedin.com/in/jacob-williams-profile/
- GitHub: https://github.com/jacobwilliams-dev
- Email: jacobwilliams2156@gmail.com
