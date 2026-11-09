# Feature Specification — Contact Page

**This document specifies one single feature. Read `ai-spec.md` first.**

- All global rules defined in `ai-spec.md` (architecture, technologies, coding standards, Global Definition of Done, cross-feature rules) still apply here and are **not** repeated in this file.
- This document contains only what is specific to this feature.
- If this feature needs an exception to a global rule, or an extra constraint, state it explicitly in section 2.
- Implementation must satisfy **both** `ai-spec.md` and this document.

- **Feature Name:** Contact Page
- **Related Area:** front-end, writing to the Supabase database

---

## 1. Feature Goal

An employer or other visitor can send the site owner a message from a form on the Contact page. The form checks the visitor's name, email address and message before anything is sent, stores valid messages for the site owner to read later, and always tells the visitor whether the message was sent.

---

## 2. Feature Scope

### In Scope

- The Contact page at `/contact`.
- A form with name, email and message fields, each with a visible label.
- Validation of all three fields in the browser before anything is sent.
- Storing a valid message in the Supabase `messages` table.
- Visually distinct success and failure states, and the success message hiding on its own.
- The message shown in place of the form when Supabase is not configured.
- Blocking a second send while a message is being sent.
- Files this feature may change:
  - `src/pages/Contact.jsx` (new)
  - `src/pages/Contact.css` (new)
  - `src/App.jsx` (existing, shared with other features; adding the `/contact` route approved by the site owner on 2026-11-09)
  - `src/components/PeachButton.jsx` and `src/components/PeachButton.css` (existing, shared with other features; rendering a `<button>` when no `href` is passed, and its disabled state, approved by the site owner on 2026-11-09)
  - `src/index.css` and `ai/ai-spec.md` (existing, shared with other features; adding the `--success` and `--error` colours approved by the site owner on 2026-11-09)

### Out of Scope

- The header link to `/contact` and the footer's contact details: `header-footer.feature.md`.
- The `messages` table, its columns and its RLS policies: `setup-deploy.feature.md`.
- The `supabase` client module: `setup-deploy.feature.md`.
- Reading and deleting stored messages: `back-office.feature.md`.
- Sending the site owner an email or any other notification when a message arrives: no source asks for it.
- An AI-generated image on the Contact page: the business doc requires them on Home, Portfolio and Links only.

### Feature-Specific Constraints

- **Dependencies:** this feature builds on `setup-deploy.feature.md` (the route table in `src/App.jsx`, the `supabase` client, the `messages` table and its RLS policies) and `header-footer.feature.md` (the layout and the existing header link to `/contact`). It reuses the existing `PageSection` and `Frame` components unchanged, and the existing `PeachButton` component as changed by D-08.
- **Visitors cannot read `messages`:** the insert must not ask for the stored row back, because the RLS policies reject that request for a visitor without a session (D-05).

---

## 3. Requirements

### Functional Requirements

### FR-01 — Contact page

**Requirement:**
The site has a Contact page at `/contact`.

**Expected Result:**
Opening `/#/contact` shows the page with the heading "Contact".

### FR-02 — Name field

**Requirement:**
The form has a text input for the sender's name.

**Expected Result:**
The page shows a field of type `text` for the name.

### FR-03 — Email field

**Requirement:**
The form has an email input for the sender's address.

**Expected Result:**
The page shows a field of type `email` for the address.

### FR-04 — Message field

**Requirement:**
The form has a textarea for the message.

**Expected Result:**
The page shows a multi-line text area for the message.

### FR-05 — Visible labels

**Requirement:**
Every field carries a visible label.

**Expected Result:**
The labels "Name", "Email" and "Message" are visible on the page, each tied to its field.

### FR-06 — Required fields

**Requirement:**
The name, email and message fields are all required.

**Expected Result:**
A field that is empty, or holds only spaces, fails validation.

### FR-07 — Email format

**Requirement:**
The email field must contain a properly formatted address.

**Expected Result:**
A value that does not match the format in section 9 fails validation.

### FR-08 — Descriptive validation messages

**Requirement:**
Every validation failure is explained to the visitor with a descriptive message.

**Expected Result:**
Each field that fails shows the message for that failure from section 9, next to the field.

### FR-09 — No submission while invalid

**Requirement:**
The form refuses to submit while any validation rule is unmet.

**Expected Result:**
Pressing the send button with any invalid field sends no request to Supabase.

### FR-10 — Store the message

**Requirement:**
Once the input is valid, the form inserts one row into the Supabase `messages` table through the client in `src/lib/supabaseClient.js`.

**Expected Result:**
One new row appears in the `messages` table for each valid submission.

### FR-11 — Message content

**Requirement:**
The inserted row carries the name, email and message the sender provided.

**Expected Result:**
The new row's `name`, `email` and `message` columns hold what the sender typed.

### FR-12 — Success confirmation

**Requirement:**
A successful insert shows a visually distinct confirmation.

**Expected Result:**
A message in the `--success` colour tells the visitor the message was sent.

### FR-13 — Form cleared on success

**Requirement:**
A successful insert clears the form.

**Expected Result:**
All three fields are empty after the confirmation appears.

### FR-14 — Failure state

**Requirement:**
A failed insert shows a visually distinct error.

**Expected Result:**
A message in the `--error` colour tells the visitor the message was not sent.

### FR-15 — Success message hides on its own

**Requirement:**
The success message disappears after 5 seconds, or as soon as the visitor types in a field, whichever comes first.

**Expected Result:**
The confirmation is gone 5 seconds after it appears, and goes sooner if the visitor types in any field.

### FR-16 — Supabase not configured

**Requirement:**
When the Supabase client is not configured, the page shows a message in place of the form.

**Expected Result:**
With no Supabase environment variables set, the page renders, shows the unavailable message from section 10 and shows no fields.

### FR-17 — One send at a time

**Requirement:**
The send button is disabled while a message is being sent.

**Expected Result:**
Pressing Send again before the insert finishes adds no second row, and the button works again once the insert succeeds or fails.

---

## 4. Decisions Already Taken

- **D-01:** `Contact` lives in `src/pages/Contact.jsx` and is the element of a new `Route` at `/contact` in `src/App.jsx` - project-wide spec (section 3); existing code (`NAV_LINKS` in `src/components/Layout.jsx`); site owner decision, 2026-11-09.
- **D-02:** The page is one `PageSection` with the label "Contact" and an `h1` heading "Contact", with the form inside its `Frame` - project-wide spec (section 5: Frame panel); existing code (`src/pages/Links.jsx`).
- **D-03:** The table is named `messages`, not `contact_messages` - business doc (overrides portal slides, Slide #8).
- **D-04:** The insert sends only `name`, `email` and `message`; the database fills in `id` and `created_at` - existing feature spec (`setup-deploy.feature.md`, D-12).
- **D-05:** The insert does not ask for the stored row back - existing feature spec (`setup-deploy.feature.md`, section 10: a visitor's insert that asks for the row back is rejected).
- **D-06:** The fields use visible `<label>` elements, not placeholders - business doc (a visible label or placeholder text); project-wide spec (section 6: Accessibility).
- **D-07:** The browser's built-in validation pop-ups are turned off on the form, so the messages in section 9 are the ones the visitor sees - business doc (every validation failure is explained with a descriptive message).
- **D-08:** The send button is a `PeachButton` labelled "Send". `PeachButton` renders a `<button>` when no `href` is passed and takes `type` and `disabled` props; with an `href` it stays an `<a>` as it is today. While disabled it is shown at 50% opacity with no hover effect - project-wide spec (section 5: Peach button); existing code (`src/components/PeachButton.jsx`); site owner decision, 2026-11-09.
- **D-09:** Two colour variables join the palette: `--success` `#8fd6a4` and `--error` `#f09a9a`. They are defined in `src/index.css` and listed in `ai-spec.md` section 5 - business doc (green styling or similar); site owner decision, 2026-11-09.
- **D-10:** The success message uses the `--success` colour and the failure message uses the `--error` colour - business doc (visually distinct states); site owner decision, 2026-11-09.
- **D-11:** The field validation messages use the `--error` colour - business doc (every validation failure is explained); site owner decision, 2026-11-09.
- **D-12:** The success message hides after 5 seconds or on the next typing in a field, whichever comes first - business doc (short interval or next interaction); site owner decision, 2026-11-09.
- **D-13:** When the client is not configured, a message replaces the form, so a visitor never writes a message that cannot be sent - business doc (degrade gracefully); project-wide spec (section 4: Graceful degradation); site owner decision, 2026-11-09.
- **D-14:** The labels use spaced-out bold capitals at 12px or larger, the fields use only palette colours, and keyboard focus on a field shows the same 2px `--peach` outline as links and buttons - project-wide spec (section 5: Colour variables, Text sizes, Hover and focus).
- **D-15:** The form is at most 640px wide, and its fields fill that width - site owner decision, 2026-11-09.

---

## 5. Task Breakdown

Order: the shared palette and button change first because the page uses them. The form is built up next, one behaviour at a time. `src/App.jsx` changes last, so the route only exists once the page is ready.

1. **T-01 (D-09):** Add `--success` and `--error` to the palette list in `ai-spec.md` section 5, then to the colour variables. - `ai/ai-spec.md`, `src/index.css`
2. **T-02 (FR-17, D-08):** Make `PeachButton` render a `<button>` when no `href` is passed, remove the browser's default button border and background for that case, and add the disabled state. - `src/components/PeachButton.jsx`, `src/components/PeachButton.css`
3. **T-03 (FR-02, FR-03, FR-04, FR-05, D-02, D-06, D-08, D-14, D-15):** Create the page with its `PageSection`, the three labelled fields, the send button and the form's maximum width. - `src/pages/Contact.jsx`, `src/pages/Contact.css`
4. **T-04 (FR-06, FR-07, FR-08, FR-09, D-07, D-11):** Validate the fields when the form is submitted and show each failure's message next to its field. - `src/pages/Contact.jsx`, `src/pages/Contact.css`
5. **T-05 (FR-10, FR-11, FR-17, D-03, D-04, D-05):** Insert the valid message through the `supabase` client, with the send button disabled until the insert finishes. - `src/pages/Contact.jsx`
6. **T-06 (FR-12, FR-13, FR-14, FR-15, D-10, D-12):** Show the success and failure states, clear the form on success and hide the success message after 5 seconds or on typing. - `src/pages/Contact.jsx`, `src/pages/Contact.css`
7. **T-07 (FR-16, D-13):** Show the unavailable message in place of the form when the client is `null`. - `src/pages/Contact.jsx`, `src/pages/Contact.css`
8. **T-08 (FR-01, D-01):** Import `Contact` and add its `Route` at `/contact`. - `src/App.jsx`
9. **T-09 (all):** Verify the feature against section 11 and the Global Definition of Done, including with Supabase unconfigured.

---

## 6. User Flow

**Main flow**

1. The visitor opens the Contact page from the header.
2. The visitor fills in their name, email address and message.
3. The visitor presses Send.
4. The form checks all three fields and finds them valid.
5. The send button is disabled while the message is stored.
6. The visitor sees the success confirmation, and all three fields are empty.
7. The confirmation disappears after 5 seconds, or sooner if the visitor starts typing again.

**Alternate / failure flow**

1. Invalid input: the visitor presses Send with an empty field or a badly formatted email address. Each failing field shows its message, nothing is sent, and the visitor corrects the input and presses Send again.
2. Failed insert: the fields are valid but storing the message fails. The visitor sees the error state, the fields keep their text, and the visitor can press Send again.
3. Supabase not configured: the visitor opens the Contact page and sees the unavailable message instead of the form.

---

## 7. Interfaces Involved

### Pages

- `/contact` (`src/pages/Contact.jsx`) - new: the Contact page, holding the form, its validation and its feedback.

### Components

- `App` (`src/App.jsx`) - existing, changed: mounts `Contact` at `/contact`.
- `PeachButton` (`src/components/PeachButton.jsx`) - existing, changed: renders the form's send button.
- `PageSection` (`src/components/PageSection.jsx`) - existing, unchanged: holds the heading and the frame around the form.
- `Frame` (`src/components/Frame.jsx`) - existing, unchanged: used through `PageSection`.
- `Layout` (`src/components/Layout.jsx`) - existing, unchanged: its header already links to `/contact`.
- `supabase` (`src/lib/supabaseClient.js`) - existing, unchanged: the client object, or `null` when not configured.

### Endpoints

- `POST /rest/v1/messages` - existing, generated by Supabase for the `messages` table: stores one message. Called as `supabase.from('messages').insert(...)`.

---

## 8. Data

### Inputs

- `name` (text, required) - typed by the visitor in the Name field.
- `email` (text, required, email format) - typed by the visitor in the Email field.
- `message` (text, required) - typed by the visitor in the Message field.
- `supabase` (client object, or `null`) - imported from `src/lib/supabaseClient.js`; `null` means not configured.

### Outputs / Returned Data

- `error` (`null` on success, an error object on failure) - returned by the insert; decides whether the success or the failure state is shown.
- Validation messages, the success message, the failure message and the unavailable message (text) - shown on the page.

### Stored / Modified Data

- One new row in the Supabase `messages` table per valid submission, with `name`, `email` and `message` from the form. The database fills in `id` and `created_at`. Nothing else is stored, changed or deleted.

---

## 9. Validation

All rules run when the visitor presses Send, and every field is checked each time, so several messages can appear at once. A field's message stays until the next press of Send.

- **Name:** must hold at least one character other than a space - checked on client - on failure: nothing is sent and "Please enter your name." appears next to the field.
- **Email, required:** must hold at least one character other than a space - checked on client - on failure: nothing is sent and "Please enter your email address." appears next to the field.
- **Email, format:** must match `^[^\s@]+@[^\s@]+\.[^\s@]+$` (text, one `@`, text, a dot, text, and no spaces) - checked on client - on failure: nothing is sent and "Please enter a valid email address, like name@example.com." appears next to the field.
- **Message:** must hold at least one character other than a space - checked on client - on failure: nothing is sent and "Please enter your message." appears next to the field.

---

## 10. Expected Behavior

### Success Behavior

- The message is stored, "Thanks, your message was sent." appears in the `--success` style and all three fields are emptied.
- The confirmation disappears after 5 seconds, or as soon as the visitor types in a field.

### Error / Invalid Behavior

- Invalid input: each failing field shows its section 9 message and no request is sent.
- Failed insert: "Your message could not be sent. Please try again." appears in the `--error` style. The fields keep their text, because only a success clears them.
- A new press of Send removes the previous failure message before the form is checked again.

### Empty / Edge Cases

- Supabase not configured: "The contact form is unavailable right now." appears in place of the form, and the rest of the page and the layout render normally.
- Send pressed again during a send: the button is disabled, so nothing happens. It is enabled again when the insert succeeds or fails.

---

## 11. Acceptance Criteria

- [ ] Opening `/#/contact` shows the Contact page with the heading "Contact" inside the shared layout. (FR-01)
- [ ] The page has a name input of type `text`. (FR-02)
- [ ] The page has an email input of type `email`. (FR-03)
- [ ] The page has a `textarea` for the message. (FR-04)
- [ ] The labels "Name", "Email" and "Message" are visible, and clicking a label puts the cursor in its field. (FR-05)
- [ ] Pressing Send with all three fields empty shows the required message from section 9 next to each field. (FR-06, FR-08)
- [ ] A field holding only spaces shows the same required message as an empty field. (FR-06)
- [ ] An email of `name@example` or `name.example.com` shows the format message from section 9 next to the Email field. (FR-07, FR-08)
- [ ] An email of `name@example.com` shows no message next to the Email field. (FR-07)
- [ ] With any field invalid, pressing Send adds no row to `messages` and the browser's network panel shows no request to `/rest/v1/messages`. (FR-09)
- [ ] With all fields valid, pressing Send adds exactly one row to `messages`. (FR-10)
- [ ] The new row's `name`, `email` and `message` match what was typed, and its `id` and `created_at` are filled in. (FR-11)
- [ ] After a successful send, "Thanks, your message was sent." appears in the `--success` colour. (FR-12)
- [ ] After a successful send, all three fields are empty. (FR-13)
- [ ] When the insert fails (for example with the browser offline), "Your message could not be sent. Please try again." appears in the `--error` colour, and the fields keep their text. (FR-14)
- [ ] The success and failure messages use different colours from each other. (FR-12, FR-14)
- [ ] With no further input, the success message is gone 5 seconds after it appears. (FR-15)
- [ ] Typing in any field before the 5 seconds are up removes the success message at once. (FR-15)
- [ ] With the Supabase environment variables unset, the page renders, shows "The contact form is unavailable right now." and shows no fields or send button. (FR-16)
- [ ] With the network throttled, the send button is disabled until the insert finishes, and double-clicking Send adds exactly one row to `messages`. (FR-17)
- [ ] After a failed insert, the send button is enabled again. (FR-17)
