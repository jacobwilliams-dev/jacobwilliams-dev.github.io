# Feature Specification — Login Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Login Page
- **Related Area:** front-end, Supabase Auth

---

## 1. Feature Goal

The site owner gets a private way into the admin area: a login page that no visitor is led to, where the one admin account signs in with an email and a password. A successful login opens the Back Office and stays valid across page refreshes, so an admin who is already signed in goes straight through. A failed login says so clearly.

---

## 2. Feature Scope

### In Scope

- The login page at `/login`, reached by typing its URL or with the secret keyboard shortcut.
- The secret keyboard shortcut: holding Option and pressing Left, Up, Right, Down.
- The email input, password input and submit button.
- Signing in through Supabase Auth.
- The redirect to `/backoffice` after a successful login.
- Sending a visitor who already holds a valid session straight to `/backoffice`.
- The error message shown after a failed login.

**Files this feature may change**

- `src/pages/Login.jsx`, `src/pages/Login.css` (new)
- `src/components/SecretLoginShortcut.jsx` (new)
- `src/App.jsx` (existing, shared with other features; adding the `/login` route and the shortcut component approved by the site owner on 2026-11-09)
- `src/lib/validation.js` (new)
- `src/components/Form.css` (new)
- `src/pages/Contact.jsx`, `src/pages/Contact.css` (existing, owned by `contact-page.feature.md`; moving `EMAIL_FORMAT` to `src/lib/validation.js` and the shared form styles to `src/components/Form.css` approved by the site owner on 2026-11-09)

### Out of Scope

- The `/backoffice` route, its authentication check and its logout control (`back-office.feature.md`).
- Registration, sign-up and password-reset screens, and any link to them.
- Supabase project setup and the admin account (`setup-deploy.feature.md`).
- Changes to `Layout`, `Header` or `Footer`. The header and footer already link only to public pages.
- Changes to `PeachButton` or the colour variables. Both already provide what this page needs.
- An AI-generated image on this page. The AI imagery standard names Home, Portfolio and Links only.

### Feature-Specific Constraints

- **Dependencies:** this feature builds on `setup-deploy.feature.md` (the route table in `src/App.jsx`, the `supabase` client, email/password authentication and the admin account), `header-footer.feature.md` (the layout), `home-page.feature.md` (`PageSection` and `Frame`), `portfolio-page.feature.md` (`PeachButton`) and `contact-page.feature.md` (the `<button>` form of `PeachButton`, the `--error` colour and the form pattern this page follows).
- **Redirect target:** the `/backoffice` route belongs to `back-office.feature.md`. Until that feature exists, a redirect changes the address to `#/backoffice` and the layout shows an empty page.

---

## 3. Requirements

### Functional Requirements

### FR-01 — Login page opens at its URL

**Requirement:**
Typing the `/login` route into the address bar opens the login page.

**Expected Result:**
`https://jacobwilliams-dev.github.io/#/login` displays the login form to a visitor with no session.

### FR-02 — No visible way in

**Requirement:**
This feature adds no link or button that leads to the login page. The only keyboard route is the sequence in FR-12.

**Expected Result:**
The header, footer and mobile navigation offer no way to reach `/login`, and no key press other than the FR-12 sequence opens it.

### FR-03 — Email input

**Requirement:**
The login form has an email input of type `email`.

**Expected Result:**
The form shows a labelled input whose `type` attribute is `email`.

### FR-04 — Password input

**Requirement:**
The login form has a password input of type `password`.

**Expected Result:**
The form shows a labelled input whose `type` attribute is `password`, and typed characters are masked.

### FR-05 — Submit button

**Requirement:**
The login form has a submit button.

**Expected Result:**
The form shows a button of type `submit`, and activating it submits the form.

### FR-06 — Purpose is obvious

**Requirement:**
The login page has a clean layout that makes its purpose obvious.

**Expected Result:**
The page holds one heading naming the admin login and the form, with no other content in the page section.

### FR-07 — Sign in with the entered credentials

**Requirement:**
Submitting the form calls `supabase.auth.signInWithPassword()` with the entered email and password, through the client in `src/lib/supabaseClient.js`.

**Expected Result:**
One sign-in request carrying the entered email and password goes to Supabase Auth for each valid submission.

### FR-08 — Redirect after a successful login

**Requirement:**
A successful login redirects to `/backoffice`.

**Expected Result:**
The address changes to `#/backoffice` as soon as the sign-in call succeeds.

### FR-09 — Session survives a refresh

**Requirement:**
The session created by a successful login survives a page refresh.

**Expected Result:**
After a refresh, the admin still holds a valid session.

### FR-10 — Valid session goes straight through

**Requirement:**
A visitor who already holds a valid session and visits the login page is sent to `/backoffice` without being asked to authenticate again.

**Expected Result:**
Opening `#/login` with a valid session ends at `#/backoffice`, and the form is not shown.

### FR-11 — Failed login shows an error

**Requirement:**
A failed login produces a visually distinct error message.

**Expected Result:**
An error message in the `--error` colour appears on the login page, and the visitor stays on `/login`.

### FR-12 — Secret keyboard shortcut

**Requirement:**
Holding Option and pressing Left, Up, Right, Down, in that order, opens the login page from any page. The shortcut is written in the submission summary so an evaluator can get in.

**Expected Result:**
The address changes to `#/login` when the fourth key is pressed. A wrong key, releasing Option, or pressing the keys inside a text field does not open it.

---

## 4. Decisions Already Taken

- **D-01:** `Login` lives in `src/pages/Login.jsx` and is the element of a new `Route` at `/login` in `src/App.jsx`, inside the existing `Layout` - project-wide spec (section 3); site owner decision, 2026-11-09 (route path).
- **D-02:** The login route is reached by typing its URL or with the secret keyboard shortcut in FR-12, and by no link or button - business doc (Secure Administration); site owner decision, 2026-11-09.
- **D-03:** `/login` stays out of `NAV_LINKS`. `Header` shows no page name for it, and `Backdrop` uses Home's angle, because both already handle a path outside that list - existing code (`src/components/Layout.jsx`, `src/components/Header.jsx`, `src/components/Backdrop.jsx`).
- **D-04:** The page is one `PageSection` with the label `Login` and an `h1` reading `Admin Login`. `PageTracker` shows nothing, because the page has fewer than two sections - existing code (`src/components/PageSection.jsx`, `src/components/PageTracker.jsx`); business doc (clean layout that makes its purpose obvious).
- **D-05:** The fields are one centred column, with the visible labels `Email` and `Password`, and a `PeachButton` labelled `Log In` - business doc (Secure Administration); project-wide spec (section 5, Peach button).
- **D-06:** `PeachButton` is used as it is. With no `href` it renders a `<button>` and takes a `type` prop - existing code (`src/components/PeachButton.jsx`); `contact-page.feature.md` (D-08).
- **D-07:** Validation messages and the sign-in error use the existing `--error` colour - project-wide spec (section 5, Colour variables).
- **D-08:** Validation follows the Contact form: `noValidate` on the form, and a message in the `--error` colour under each failed field, tied to its field with `aria-describedby`. The sign-in error has `role="alert"`. The email check uses `EMAIL_FORMAT`, moved unchanged from `src/pages/Contact.jsx` to `src/lib/validation.js` and imported by both pages - site owner decision, 2026-11-09; existing code (`src/pages/Contact.jsx`); project-wide spec (section 5, Code Organization and Maintainability Rules).
- **D-09:** The sign-in error shows the `error.message` that `signInWithPassword()` returns, so wrong credentials and network failures use one code path - existing code (`@supabase/auth-js` returns both in `error`).
- **D-10:** The session check is `supabase.auth.getSession()` when the page loads - business doc (someone who already holds a valid session is sent straight through); existing code (`@supabase/supabase-js`).
- **D-11:** Session persistence needs no extra code or client option. `createClient()` in `src/lib/supabaseClient.js` passes no auth options, so the library default `persistSession: true` applies - existing code (`src/lib/supabaseClient.js`, `@supabase/supabase-js`).
- **D-12:** Both redirects replace the current history entry. Otherwise, pressing Back would return to `/login` and be sent forward again at once - business doc (redirect and straight-through behaviour).
- **D-13:** The form layout, labels, inputs, focus outline and error colour live in `src/components/Form.css`, under the classes `form`, `form-field` and `form-error`, and both the Login and Contact pages use them. The values move unchanged from `Contact.css`. Each page's stylesheet keeps only its own form width - site owner decision, 2026-11-09; existing code (`src/pages/Contact.css`); project-wide spec (section 5, Maintainability Rules: reuse an existing pattern).
- **D-14:** When `supabase` is `null`, a plain paragraph replaces the form, as on the Contact page - existing code (`src/pages/Contact.jsx`).
- **D-15:** The shortcut uses Option, held for all four keys, not Cmd, because Cmd+Left is the browser's Back shortcut on a Mac. It is a Mac shortcut: on Windows, Alt+Left is Back. It cancels no browser behaviour, so visitors' keyboards work as before. A wrong key or releasing Option restarts it, with no time limit, and key presses inside `input` and `textarea` do not count, because Option+arrows moves the cursor there - site owner decision, 2026-11-09.
- **D-16:** The shortcut lives in `SecretLoginShortcut`, a component that renders nothing, placed inside `HashRouter` in `src/App.jsx`, because `useNavigate` only works inside the router. `Layout` stays unchanged - existing code (`src/App.jsx`, `src/components/Layout.jsx`).

---

## 5. Task Breakdown

Order: the shared email check and form styles first, because the page imports them. The form comes next, then its behaviour. `src/App.jsx` changes last, so the route only exists once the page is ready.

1. **T-01 (FR-03, FR-07, D-08, D-13):** Move `EMAIL_FORMAT` to the new module and the shared form styles to `Form.css`, and switch the Contact page to both. - `src/lib/validation.js`, `src/components/Form.css`, `src/pages/Contact.jsx`, `src/pages/Contact.css`
2. **T-02 (FR-03, FR-04, FR-05, FR-06, D-04, D-05, D-06, D-13):** Create the `Login` page with its heading, labelled inputs and submit button, and style it. - `src/pages/Login.jsx`, `src/pages/Login.css`
3. **T-03 (FR-07, FR-08, FR-11, D-07, D-08, D-09, D-12, D-14):** On submit, validate both fields, then call `supabase.auth.signInWithPassword()`. Redirect on success and show the error on failure. Show the not-configured message when `supabase` is `null`. - `src/pages/Login.jsx`, `src/pages/Login.css`
4. **T-04 (FR-09, FR-10, D-10, D-11, D-12):** When the page loads, check for a session. Redirect if one exists, and keep the form hidden until the check finishes. - `src/pages/Login.jsx`
5. **T-05 (FR-01, FR-02, D-01, D-02, D-03):** Import `Login` and add its `Route` at `/login`. - `src/App.jsx`
6. **T-06 (FR-12, D-02, D-15, D-16):** Create `SecretLoginShortcut` and render it inside `HashRouter`. - `src/components/SecretLoginShortcut.jsx`, `src/App.jsx`
7. **T-07 (all FRs):** Verify the feature against section 11. - no file changes

---

## 6. User Flow

**Main flow**

1. The site owner types the login URL into the address bar.
2. The page checks for a session, finds none and shows the form.
3. The site owner enters the admin email and password and submits.
4. The page checks both fields, then sends the credentials to Supabase Auth.
5. Supabase accepts them, and the site owner lands on `/backoffice`.

**Alternate / failure flow**

1. Already signed in: the site owner opens the login URL, the page finds a valid session, and they land on `/backoffice` without seeing the form.
2. Invalid input: a field is empty or the email is badly formatted. The page sends nothing and shows a message under that field.
3. Failed login: Supabase rejects the credentials or the request fails. The error message appears, the site owner stays on the login page and can submit again.
4. Supabase not configured: the page shows a message that login is unavailable instead of the form.
5. Secret shortcut: on any page, the site owner holds Option and presses Left, Up, Right, Down, and the login page opens. The main flow continues from step 2.

---

## 7. Interfaces Involved

### Pages

- `/login` (`#/login` in the address bar) - new: the login form.
- `/backoffice` - new, added by `back-office.feature.md`: the redirect destination.

### Components

- `Login` (`src/pages/Login.jsx`) - new: the page, its form, the session check and the sign-in call.
- `SecretLoginShortcut` (`src/components/SecretLoginShortcut.jsx`) - new: listens for the FR-12 key sequence and opens `/login`. Renders nothing.
- `App` (`src/App.jsx`) - existing, changed: mounts `Login` at `/login` and renders `SecretLoginShortcut`.
- `Contact` (`src/pages/Contact.jsx`, `src/pages/Contact.css`) - existing, changed: imports `EMAIL_FORMAT` instead of defining it, and uses the classes in `Form.css`.
- `validation.js` (`src/lib/validation.js`) - new: exports `EMAIL_FORMAT`, used by `Login` and `Contact`.
- `Form.css` (`src/components/Form.css`) - new: the form styles shared by `Login` and `Contact`.
- `PeachButton` (`src/components/PeachButton.jsx`) - existing, unchanged: the submit button.
- `PageSection` (`src/components/PageSection.jsx`) - existing: holds the page heading and the `Frame` around the form.
- `Layout` (`src/components/Layout.jsx`) - existing, unchanged: renders the page.
- `supabase` (`src/lib/supabaseClient.js`) - existing, unchanged: the shared client, or `null` when unconfigured.

### Endpoints

- `supabase.auth.signInWithPassword()` (`POST /auth/v1/token?grant_type=password` on Supabase Auth) - existing service, new to this code: signs in the admin.
- `supabase.auth.getSession()` - existing service, new to this code: reads the stored session.

---

## 8. Data

### Inputs

- `email` (text, email format, required) - typed into the email input; passed to `signInWithPassword()`.
- `password` (text, required) - typed into the password input; passed to `signInWithPassword()`.
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (config keys) - read only by `src/lib/supabaseClient.js`; this feature does not read them.

### Outputs / Returned Data

- `signInWithPassword()` returns `{ data: { user, session }, error }`. `error` empty means success and triggers the redirect; `error.message` is shown on the page.
- `getSession()` returns `{ data: { session }, error }`. A non-null `session` triggers the redirect; `error.message` is shown on the page.

### Stored / Modified Data

- The Supabase client saves the session in the browser's `localStorage` after a successful login. This feature's own code writes nothing to storage.
- No database table is created or changed.

---

## 9. Validation

- **Email:** required, and must match `EMAIL_FORMAT` - checked on client - on failure: `Please enter your email address.` when empty or `Please enter a valid email address, like name@example.com.` when badly formatted appears under the field, and no request is sent.
- **Password:** required, with no format or length rule because the admin account already exists - checked on client - on failure: `Please enter your password.` appears under the field, and no request is sent.
- **Credentials:** must match the admin account - checked on server (Supabase Auth) - on failure: the error message from FR-11 appears.

---

## 10. Expected Behavior

### Success Behavior

- A valid login stores the session and redirects to `/backoffice`.
- A later visit to `/login` with that session redirects to `/backoffice` without showing the form.

### Error / Invalid Behavior

- Wrong credentials or a failed sign-in request show `error.message` in the `--error` colour under the form. The visitor stays on `/login`, no session is stored, and the form can be submitted again.
- A failed session check shows `error.message` in the `--error` colour with the form visible, so the admin can still sign in.
- With `supabase` equal to `null`, the page shows a message saying login is unavailable, in place of the form, and makes no Supabase call.

### Empty / Edge Cases

- While the session check runs, the page section shows no form, so a signed-in admin is never asked to authenticate.
- An expired session that cannot be refreshed counts as no session, and the form is shown.
- The secret shortcut pressed with a valid session opens `/login`, which then sends the admin to `/backoffice` (FR-10).

---

## 11. Acceptance Criteria

- [ ] Opening `#/login` with no session displays the login form. (FR-01)
- [ ] The header, footer and open mobile menu contain no link to `/login`, and no key press other than the secret shortcut opens it. (FR-02)
- [ ] The email input has a visible label and `type="email"`. (FR-03)
- [ ] The password input has a visible label and `type="password"`, and typed characters are masked. (FR-04)
- [ ] The form has a `PeachButton` rendered as `<button type="submit">`, and clicking it submits the form. (FR-05)
- [ ] The page shows one heading reading `Admin Login` and the form, and nothing else in the page section. (FR-06)
- [ ] Submitting valid input sends exactly one request to Supabase Auth, and its body holds the entered email and password. (FR-07)
- [ ] Submitting an empty email, an empty password or a badly formatted email shows the matching section 9 message in the `--error` colour under that field and sends no request. (FR-07)
- [ ] The Contact form still shows its badly-formatted-email message after `EMAIL_FORMAT` moves. (FR-07)
- [ ] The Contact form's width, labels, fields, focus outline, send button and error colour look the same after its styles move to `Form.css`. (FR-03)
- [ ] With `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` unset, `#/login` shows the login-unavailable message, does not crash and makes no Supabase call. (FR-07)
- [ ] Submitting the admin credentials changes the address to `#/backoffice`. (FR-08)
- [ ] After a successful login, refreshing the page and then opening `#/login` ends at `#/backoffice`, with no new sign-in. (FR-09)
- [ ] Opening `#/login` with a valid session ends at `#/backoffice`, and the form is never displayed. (FR-10)
- [ ] Submitting a wrong password shows an error message in the `--error` colour, distinct from the form's normal text, and the address stays `#/login`. (FR-11)
- [ ] After a failed login, a request with correct credentials succeeds from the same form without reloading the page. (FR-11)
- [ ] Holding Option and pressing Left, Up, Right, Down on a public page changes the address to `#/login`. (FR-12)
- [ ] The same keys in the wrong order, without Option, with Option released partway, or pressed inside a text field do not open `#/login`. (FR-12)
- [ ] Cmd+Left still goes Back in the browser. (FR-12)
