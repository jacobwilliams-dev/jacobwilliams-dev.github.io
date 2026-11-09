# Feature Specification — Back Office

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Back Office
- **Related Area:** front-end, reading from and deleting in the Supabase database, Supabase Auth

---

## 1. Feature Goal

The site owner can read what the contact form collected in a private page that only a signed-in admin can see. The owner sees every message in a table with the newest first, can open any message in full, can delete a message, and can log out. A visitor without a session never sees the page and is sent to login.

---

## 2. Feature Scope

### In Scope

- The Back Office page at `/backoffice`.
- Checking authentication before the page renders, and sending a visitor without a session to login.
- The table of every message, with columns Name, Email, Date and Actions, newest first.
- The loading, failed and empty states of that table.
- A delete action on each row.
- A view action on each row, opening a modal that shows the message in full.
- The three ways of closing the modal.
- A visible logout control.
- The message shown in place of the page when Supabase is not configured.
- Files this feature may change:
  - `src/pages/BackOffice.jsx` (new)
  - `src/pages/BackOffice.css` (new)
  - `src/components/MessageModal.jsx` (new)
  - `src/components/MessageModal.css` (new)
  - `src/App.jsx` (existing, shared with other features; adding the `/backoffice` route approved by the site owner on 2026-11-09)

### Out of Scope

- The login page, its route, signing in and sending an already signed-in visitor through: `login-page.feature.md`.
- The `messages` table, its columns, its RLS policies and the admin account: `setup-deploy.feature.md`.
- The `supabase` client module: `setup-deploy.feature.md`.
- Writing messages: `contact-page.feature.md`.
- The header, the footer and their links: `header-footer.feature.md`.
- A confirmation step before deleting: the business doc has the delete take effect immediately (D-09).
- Replying to, editing, searching, paging or marking messages as read: the project-wide spec excludes back-office features beyond viewing and deleting.
- New messages appearing while the page is open: no source asks for it. They appear on the next page load.

### Feature-Specific Constraints

- **Dependencies:** this feature builds on `setup-deploy.feature.md` (the route table in `src/App.jsx`, the `supabase` client, the `messages` table, its RLS policies and the admin account), `header-footer.feature.md` (the layout), `home-page.feature.md` (`PageSection` and `Frame`), `contact-page.feature.md` (the `--error` colour from its D-09, and the messages themselves) and `login-page.feature.md` (the login route, signing in and the shared `.form-error` style).

---

## 3. Requirements

### Functional Requirements

### FR-01 — Back Office page

**Requirement:**
The site has a Back Office page at `/backoffice`.

**Expected Result:**
With a valid session, opening `/#/backoffice` shows the page with the heading "Back Office".

### FR-02 — Authentication checked first

**Requirement:**
The Back Office verifies authentication before it renders anything.

**Expected Result:**
Until the check finishes, no heading, table or logout control is on the page and no request for messages is sent.

### FR-03 — Authenticated visitor sees the page

**Requirement:**
A visitor with a valid session sees the Back Office.

**Expected Result:**
The signed-in admin sees the page, and still sees it after refreshing the browser.

### FR-04 — Unauthenticated visitor redirected

**Requirement:**
A visitor without a valid session is redirected to login.

**Expected Result:**
Opening `/#/backoffice` without a session ends on `/#/login`.

### FR-05 — No public navigation entry

**Requirement:**
The Back Office is reached only by typing its URL or by the redirect after login.

**Expected Result:**
No link to `/backoffice` exists in the header, the footer or the mobile navigation.

### FR-06 — Fetch every message

**Requirement:**
The page fetches every record from the Supabase `messages` table.

**Expected Result:**
The table has one row for each row stored in `messages`.

### FR-07 — Table columns

**Requirement:**
The messages are presented in a structured table with the columns Name, Email, Date and Actions.

**Expected Result:**
The table shows those four column headings, in that order, and each row shows its sender's name, email address and date.

### FR-08 — Newest first

**Requirement:**
The rows are ordered by `created_at` descending.

**Expected Result:**
The most recently received message is the top row.

### FR-09 — Failed fetch

**Requirement:**
A failed fetch shows an error message.

**Expected Result:**
The error message from section 10 appears in the `--error` style.

### FR-10 — Empty placeholder

**Requirement:**
An empty table shows a placeholder rather than an empty frame.

**Expected Result:**
With no rows stored, "No messages yet" appears and no table is shown. The placeholder does not appear while messages are still loading.

### FR-11 — Delete action

**Requirement:**
Each row offers a delete action.

**Expected Result:**
The Actions cell of every row has a button labelled "Delete".

### FR-12 — Delete from the database

**Requirement:**
The delete action removes the record from the database.

**Expected Result:**
After pressing Delete, the row no longer exists in `messages`.

### FR-13 — Delete from the table

**Requirement:**
A deleted record leaves the rendered table immediately.

**Expected Result:**
The row disappears as soon as the database confirms the delete, with no page reload. A row the database did not remove stays in the table.

### FR-14 — View control

**Requirement:**
Each row offers a dedicated view control that opens a modal.

**Expected Result:**
The Actions cell of every row has a button labelled "View", and pressing it opens the modal for that row's message.

### FR-15 — Message shown in full

**Requirement:**
The modal shows the sender's name, their email address, the date and time the message arrived, and the complete message body.

**Expected Result:**
All four items are visible in the modal, and the body is not shortened however long it is.

### FR-16 — Close button

**Requirement:**
The modal closes by its close button.

**Expected Result:**
Pressing the button labelled "Close" closes the modal.

### FR-17 — Click outside

**Requirement:**
The modal closes by a click outside it.

**Expected Result:**
Clicking the dimmed area around the modal closes it, and clicking inside the modal does not.

### FR-18 — Escape key

**Requirement:**
The modal closes by pressing Escape.

**Expected Result:**
Pressing Escape while the modal is open closes it.

### FR-19 — Logout control

**Requirement:**
The Back Office carries a visible logout control.

**Expected Result:**
A button labelled "Logout" is visible on the page at phone and desktop widths.

### FR-20 — Session cleared

**Requirement:**
The logout control calls `supabase.auth.signOut()` and fully clears the session.

**Expected Result:**
After logging out, the browser no longer holds the session, and opening `/#/backoffice` redirects to login.

### FR-21 — Return after logout

**Requirement:**
Logging out returns the admin to the Login page.

**Expected Result:**
A successful logout ends on `/#/login`, showing the login form.

### FR-22 — Supabase not configured

**Requirement:**
When the Supabase client is not configured, the page shows a message in place of its content and does not redirect.

**Expected Result:**
With no Supabase environment variables set, `/#/backoffice` stays on that URL, shows the unavailable message from section 10 and shows no table or logout control.

---

## 4. Decisions Already Taken

- **D-01:** `BackOffice` lives in `src/pages/BackOffice.jsx` and is the element of a new `Route` at `/backoffice` in `src/App.jsx` - project-wide spec (sections 3 and 5); site owner approval, 2026-11-09.
- **D-02:** The login route is `/login`, and it is where this page redirects - site owner decision, 2026-11-09.
- **D-03:** The table is named `messages`, not `contact_messages` - business doc (overrides portal slides, Slide #8).
- **D-04:** The authentication check is `supabase.auth.getSession()`, run when the page opens. RLS stays the guard on the data itself - business doc (verifies authentication); project-wide spec (section 3: RLS controls access).
- **D-05:** While the check runs, `BackOffice` renders nothing inside the layout - business doc (verifies authentication before it renders anything).
- **D-06:** The page is one `PageSection` with the label "Back Office", an `h1` heading "Back Office" and the Logout button beside the heading, with the table inside its `Frame` - project-wide spec (section 5: Frame panel); existing code (`src/pages/Links.jsx`; `heading` in `src/components/PageSection.jsx` accepts any element).
- **D-07:** The table is a `<table>` element with a header row, filled by one read that asks for `id`, `name`, `email`, `message` and `created_at`, sorted by `created_at` descending - business doc (structured table; ordering); existing feature spec (`setup-deploy.feature.md`, section 8).
- **D-08:** The modal opens from a View button in the Actions column only. The rest of the row is not clickable - business doc (a row or a dedicated view control); site owner decision, 2026-11-09.
- **D-09:** Pressing Delete deletes at once, with no confirmation step - business doc (removes the record immediately).
- **D-10:** The delete asks for the deleted row back. An empty result counts as a failure, because a delete that matches no row raises no error. Once a row comes back, it is removed from the page's list without fetching again - existing feature spec (`setup-deploy.feature.md`, section 9); business doc (removes the record immediately).
- **D-11:** A successful logout goes to `/login` - business doc (the Home or Login page); site owner decision, 2026-11-09.
- **D-12:** Logout, View, Delete and Close are plain `<button>` elements styled in this feature's CSS, and `PeachButton` is not changed - site owner decision, 2026-11-09; project-wide spec (section 5: Hover and focus).
- **D-13:** The Date column reads like "Nov 9, 2026" and the modal like "Nov 9, 2026, 2:23 PM". Both use en-US wording and the viewer's own time zone - site owner decision, 2026-11-09.
- **D-14:** The table keeps its four columns at every width. At the narrow breakpoint the cell spacing tightens, long values wrap, and View and Delete stack - site owner decision, 2026-11-09; project-wide spec (section 7: Responsive behaviour).
- **D-15:** The modal is a native `<dialog>` element opened with `showModal()`. The browser handles Escape, keeps keyboard focus inside and shows it above the header. The padding sits on an inner element, so a click whose target is the `<dialog>` itself is a click on the backdrop. It closes the modal only when the mouse press also started on the backdrop, because dragging a text selection out of the panel also produces a click on the `<dialog>` - site owner decision, 2026-11-09.
- **D-16:** The modal is its own component in `src/components/MessageModal.jsx`, styled with the `--ink` panel fill and a 1px `--line` outline - project-wide spec (section 5: File & Folder Conventions, Colour variables).
- **D-17:** The message body is shown as plain text with its line breaks kept and long words wrapped, and the modal scrolls when the text is taller than the window - business doc (the complete message body).
- **D-18:** Failure messages use the existing `.form-error` class from `src/components/Form.css`, which sets the `--error` colour, and have `role="alert"`, as the contact and login failure messages do. A successful delete needs no message, because the row leaving the table is the result - existing code (`src/pages/Contact.jsx`, `src/pages/Login.jsx`); existing feature specs (`contact-page.feature.md`, D-09 and D-10; `login-page.feature.md`, D-08); project-wide spec (section 7: User feedback).
- **D-19:** When the client is not configured, a message replaces the page content and no redirect happens - business doc (degrade gracefully); project-wide spec (section 7: Supabase access).

---

## 5. Task Breakdown

Order: the page and its protection come first so nothing is ever built outside the authentication check. Reading comes before deleting and viewing, which act on the rows it produces. `src/App.jsx` changes last, so the route only exists once the page is protected and complete.

1. **T-01 (FR-01, D-01, D-06):** Create the page with its `PageSection` and "Back Office" heading. - `src/pages/BackOffice.jsx`, `src/pages/BackOffice.css`
2. **T-02 (FR-22, D-19):** Show the unavailable message in place of the content when the client is `null`. - `src/pages/BackOffice.jsx`
3. **T-03 (FR-02, FR-03, FR-04, D-02, D-04, D-05):** Check the session when the page opens, render nothing until the check finishes, and redirect to `/login` without a session, replacing the history entry so the Back button does not bounce. - `src/pages/BackOffice.jsx`
4. **T-04 (FR-06, FR-07, FR-08, D-03, D-07, D-13):** Fetch the messages once authenticated and render the table with its Name, Email and Date cells. - `src/pages/BackOffice.jsx`, `src/pages/BackOffice.css`
5. **T-05 (FR-09, FR-10, D-18):** Show the loading text, the failed-fetch error and the empty placeholder. - `src/pages/BackOffice.jsx`, `src/pages/BackOffice.css`
6. **T-06 (FR-11, FR-12, FR-13, D-09, D-10, D-12, D-18):** Add the Delete button to each row, delete through the `supabase` client, remove the row on success and show the error on failure. - `src/pages/BackOffice.jsx`, `src/pages/BackOffice.css`
7. **T-07 (FR-14, FR-15, D-08, D-12, D-13, D-15, D-16, D-17):** Create the modal showing the four items, and add the View button that opens it. - `src/components/MessageModal.jsx`, `src/components/MessageModal.css`, `src/pages/BackOffice.jsx`
8. **T-08 (FR-16, FR-17, FR-18, D-15):** Close the modal by its Close button, by a click on the backdrop and by Escape. - `src/components/MessageModal.jsx`
9. **T-09 (FR-19, FR-20, FR-21, D-06, D-11, D-12, D-18):** Add the Logout button beside the heading, sign out through the `supabase` client, go to `/login` on success and show the error on failure. - `src/pages/BackOffice.jsx`, `src/pages/BackOffice.css`
10. **T-10 (FR-07, D-14):** Add the narrow-viewport table styles. - `src/pages/BackOffice.css`
11. **T-11 (FR-01, D-01):** Import `BackOffice` and add its `Route` at `/backoffice`. - `src/App.jsx`
12. **T-12 (FR-05, all):** Verify the feature against section 11 and the Global Definition of Done, including with Supabase unconfigured.

---

## 6. User Flow

**Main flow**

1. The admin signs in on the login page and lands on the Back Office.
2. The page confirms the session and loads the messages.
3. The admin sees the table with the newest message at the top.
4. The admin presses View on a row and reads the message in full in the modal.
5. The admin closes the modal with its Close button, a click outside it or Escape.
6. The admin presses Delete on a row, and the row disappears.
7. The admin presses Logout and lands on the login page.

**Alternate / failure flow**

1. No session: a visitor types the `/backoffice` URL, sees none of the page and lands on the login page.
2. Failed fetch: the admin sees the error message in place of the table and can still log out.
3. Failed delete: the admin sees the error message, the row stays and the admin can press Delete again.
4. Failed logout: the admin sees the error message and stays on the page, and can press Logout again.
5. Supabase not configured: anyone opening the page sees the unavailable message.

---

## 7. Interfaces Involved

### Pages

- `/backoffice` (`src/pages/BackOffice.jsx`) - new: the protected page holding the table, the delete action and the logout control.
- `/login` (`src/pages/Login.jsx`) - existing, unchanged: where this page redirects and where logout lands.

### Components

- `MessageModal` (`src/components/MessageModal.jsx`) - new: shows one message in full and handles the three ways of closing.
- `App` (`src/App.jsx`) - existing, changed: mounts `BackOffice` at `/backoffice`.
- `PageSection` (`src/components/PageSection.jsx`) - existing, unchanged: holds the heading and the frame around the table.
- `Frame` (`src/components/Frame.jsx`) - existing, unchanged: used through `PageSection`.
- `Form.css` (`src/components/Form.css`) - existing, unchanged: its `.form-error` class styles the failure messages.
- `Layout` (`src/components/Layout.jsx`) - existing, unchanged: wraps the page. `/backoffice` is not in `NAV_LINKS`, so the header shows no current page.
- `supabase` (`src/lib/supabaseClient.js`) - existing, unchanged: the client object, or `null` when not configured.

### Endpoints

- `supabase.auth.getSession()` - existing, Supabase Auth: returns the stored session, refreshing it through Supabase Auth when it has expired.
- `GET /rest/v1/messages` - existing, generated by Supabase: reads every message. Called as `supabase.from('messages').select(...).order(...)`.
- `DELETE /rest/v1/messages` - existing, generated by Supabase: deletes one message by `id`. Called as `supabase.from('messages').delete().eq('id', id).select()`.
- `POST /auth/v1/logout` - existing, Supabase Auth: ends the session. Called as `supabase.auth.signOut()`.

---

## 8. Data

### Inputs

- `session` (object, or `null`) - returned by `supabase.auth.getSession()`; `null` means no valid session.
- `id`, `name` (text), `email` (text), `message` (text), `created_at` (timestamp with time zone) - each row returned by the read of `messages`.
- `id` of the row whose Delete button was pressed.
- `supabase` (client object, or `null`) - imported from `src/lib/supabaseClient.js`; `null` means not configured.

### Outputs / Returned Data

- `data` (list of rows) and `error` (`null` on success, an error object on failure) - returned by the read; decide between the table, the placeholder and the error.
- `data` (the deleted row, or an empty list) and `error` - returned by the delete; decide whether the row leaves the table.
- `error` - returned by `signOut()`; decides between going to `/login` and showing the error.
- `created_at`, shown as a date in the table and as a date and time in the modal, in the formats in D-13.

### Stored / Modified Data

- One row deleted from the Supabase `messages` table per successful Delete.
- `signOut()` removes the session the Supabase client stored in the browser.
- Nothing is inserted or updated.

---

## 9. Validation

This feature has no form or typed input. These conditions must hold before an operation is accepted:

- **Page access:** a valid session must exist - checked on client - on failure: the visitor is redirected to `/login` and no messages are requested.
- **Read and delete access:** the request must carry an authenticated session - checked on server (RLS) - on failure: a read returns zero rows and a delete changes zero rows, and a delete that changes zero rows shows the delete error from section 10.

---

## 10. Expected Behavior

### Success Behavior

- A signed-in admin sees the heading, the Logout button and the table, newest message first.
- View opens the modal for that row's message, and any of the three closing actions returns to the table.
- Delete removes the row from the database and from the table, with no page reload.
- Logout clears the session and goes to the login page.

### Error / Invalid Behavior

- Failed fetch: "Messages could not be loaded. Please refresh the page to try again." appears in the `--error` style in place of the table. The Logout button stays available.
- Failed delete, including a delete that removes no row: "This message could not be deleted. Please try again." appears in the `--error` style above the table and the row stays. Pressing Delete on any row removes the previous failure message.
- Failed logout: "You could not be logged out. Please try again." appears in the `--error` style and the page stays open.
- No session: nothing of the page is shown, no messages are requested and the visitor is redirected to `/login`. A failed session check counts as no session.

### Empty / Edge Cases

- While messages load: "Loading messages..." appears, and neither the table nor the placeholder is shown.
- No messages stored: "No messages yet" appears in place of the table.
- The last row is deleted: the table is replaced by "No messages yet".
- A Delete already in progress: that row's Delete button is disabled until the request finishes, so a second press cannot send a second delete.
- Supabase not configured: "The Back Office is unavailable right now." appears in place of the page content, and the layout renders normally.

---

## 11. Acceptance Criteria

- [ ] With a valid session, opening `/#/backoffice` shows the heading "Back Office" inside the shared layout. (FR-01)
- [ ] In a browser with no session, the heading, table and Logout button never appear on the way to the login page, and the network panel shows no request to `/rest/v1/messages`. (FR-02)
- [ ] With a valid session, the page shows after a sign-in and is still shown after refreshing the browser. (FR-03)
- [ ] Opening `/#/backoffice` with no session ends on `/#/login`. (FR-04)
- [ ] The header, footer and mobile menu contain no link to `/backoffice` at phone or desktop width, and `NAV_LINKS` in `src/components/Layout.jsx` has no `/backoffice` entry. (FR-05)
- [ ] The number of table rows equals the number of rows in `messages` in the Supabase Table Editor. (FR-06)
- [ ] The table's column headings read Name, Email, Date and Actions, in that order. (FR-07)
- [ ] Each row shows the name, the email address and a date in the form "Nov 9, 2026" that match the stored row. (FR-07)
- [ ] After a new message is sent from the Contact page and the Back Office is reloaded, that message is the top row, and the `created_at` values descend from top to bottom. (FR-08)
- [ ] With the browser offline before the messages load, "Messages could not be loaded. Please refresh the page to try again." appears in the `--error` colour and no table is shown. (FR-09)
- [ ] With no rows in `messages`, "No messages yet" appears and no table or empty table header is shown. (FR-10)
- [ ] On a page load with rows stored, "No messages yet" never appears. (FR-10)
- [ ] Every row has a button labelled "Delete" in its Actions cell. (FR-11)
- [ ] After pressing Delete on a row, that row is gone from `messages` in the Supabase Table Editor. (FR-12)
- [ ] After a successful delete, the row is gone from the table, the page has not reloaded and the other rows are unchanged. (FR-13)
- [ ] With the browser offline, pressing Delete shows "This message could not be deleted. Please try again." in the `--error` colour and the row stays. (FR-13)
- [ ] After a row is removed in the Supabase Table Editor while the page is open, pressing Delete on it shows the same error and the row stays. (FR-13)
- [ ] Deleting the last row replaces the table with "No messages yet". (FR-10, FR-13)
- [ ] While a delete is in progress, that row's Delete button is disabled. (FR-12)
- [ ] Every row has a button labelled "View" in its Actions cell, and clicking elsewhere on the row opens nothing. (FR-14)
- [ ] Pressing View opens a modal for that row's message. (FR-14)
- [ ] The modal shows the sender's name, the email address and a date and time in the form "Nov 9, 2026, 2:23 PM" that match the stored row. (FR-15)
- [ ] A message with several lines of more than one screen of text shows every line, in its original line breaks, and can be scrolled to the end. (FR-15)
- [ ] Pressing the Close button closes the modal. (FR-16)
- [ ] Clicking the dimmed area outside the modal closes it. (FR-17)
- [ ] Clicking inside the modal, including on its padding, leaves it open. (FR-17)
- [ ] Selecting text inside the modal and releasing the mouse on the dimmed area leaves it open. (FR-17)
- [ ] Pressing Escape closes the modal. (FR-18)
- [ ] A button labelled "Logout" is visible beside the heading at phone and desktop widths, and also when the fetch has failed. (FR-19)
- [ ] After a logout, the browser's local storage has no `sb-` auth token entry, and opening `/#/backoffice` redirects to `/#/login`. (FR-20)
- [ ] With the browser offline, pressing Logout shows "You could not be logged out. Please try again." in the `--error` colour and the page stays open. (FR-20)
- [ ] A successful logout ends on `/#/login` with the login form showing, not redirected back to `/backoffice`. (FR-21)
- [ ] At phone width, the four columns stay visible, a long email address wraps and the page has no horizontal scroll. (FR-07)
- [ ] With the Supabase environment variables unset, `/#/backoffice` stays on that URL, shows "The Back Office is unavailable right now." and shows no table or Logout button. (FR-22)
