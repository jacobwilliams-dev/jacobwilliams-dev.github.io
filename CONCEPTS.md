# Module 16 – Professional Development

---

## ✏️ Concept - 01

**🔤 Name:**

Session-gated rendering with history replacement on the hidden routes (`getSession`, `isCheckingSession`, `navigate` with `replace`)

**🎯 Purpose:**

`BackOffice` awaits `supabase.auth.getSession()` in a `useEffect` and renders `null` while `isCheckingSession` is true, so no protected markup appears before the result is known. A visitor with no session is sent to `/login`, and the `messages` query runs only after a session is confirmed. `Login` applies the inverse rule and sends a visitor who holds a session to `/backoffice`. Each of these redirects passes `{ replace: true }`, which overwrites the current history entry instead of adding one.

**❓ Why it was challenging:**

`getSession` is asynchronous, so the first render always happens before the answer exists, and a page that renders by default would briefly show the Back Office to a visitor with no session. Without `replace`, the Back button would return to the guarded page, which would redirect forward again and trap the visitor. The check only controls what the browser renders, so the data itself still depends on the `authenticated` RLS policies.

**📍 Where (file & line):**

[`src/pages/BackOffice.jsx:23-35`](src/pages/BackOffice.jsx#L23-L35) (session check and redirect), [`src/pages/BackOffice.jsx:151-152`](src/pages/BackOffice.jsx#L151-L152) (render gate), [`src/pages/Login.jsx:34-47`](src/pages/Login.jsx#L34-L47) (inverse redirect), [`src/pages/Login.jsx:74-75`](src/pages/Login.jsx#L74-L75) (render gate)

---

## ✏️ Concept - 02

**🔤 Name:**

Hash-based client routing on a host with no server fallback (`HashRouter`, `base: '/'`, `scrollIntoView`)

**🎯 Purpose:**

`App` wraps the route table in `HashRouter`, which keeps the route after the `#` in the URL, so GitHub Pages always serves the root `index.html` and React Router resolves the route in the browser. `base: '/'` in `vite.config.js` makes asset URLs resolve from the domain root. `PageTracker` jumps between sections with `scrollIntoView()`, because the URL fragment is already occupied by the route.

**❓ Why it was challenging:**

GitHub Pages serves only files that exist, so with path-based routing a refresh on `/portfolio` would request a missing file and return a 404. Vite's development server answers unknown paths with `index.html`, so that failure would not appear locally and would surface only after deployment. An `href="#id"` link also stops working as an in-page jump under `HashRouter`, since `#id` is read as the route `/id`.

**📍 Where (file & line):**

[`src/App.jsx:13-25`](src/App.jsx#L13-L25) (`HashRouter` and route table), [`vite.config.js:6-7`](vite.config.js#L6-L7) (`base` setting), [`src/components/PageTracker.jsx:91-91`](src/components/PageTracker.jsx#L91-L91) (in-page jump)

---

## ✏️ Concept - 03

**🔤 Name:**

Single-value submission `status` with validate-first submit and a cancelled success timer (`Contact.jsx`, `validate`)

**🎯 Purpose:**

`handleSubmit` runs `validate(fields)` and returns before any Supabase call while a rule fails, and `noValidate` on the form keeps those descriptive messages from being replaced by browser pop-ups. One `status` value moves through `idle`, `sending`, `sent` and `failed`, and it drives the disabled button and the success and error messages. A `useEffect` keyed on `status` starts a `setTimeout` of `SUCCESS_VISIBLE_MS` when `status` is `sent`, and its cleanup calls `clearTimeout`. `handleChange` also clears `sent` on the visitor's next keystroke.

**❓ Why it was challenging:**

Separate success and error booleans can both be true unless every path resets the other, while one `status` value cannot show both states. Without `clearTimeout`, the timer from an earlier send would keep running and could remove the confirmation of a later send early. An emptiness check without `.trim()` would accept a field containing only spaces.

**📍 Where (file & line):**

[`src/pages/Contact.jsx:12-26`](src/pages/Contact.jsx#L12-L26) (`validate`), [`src/pages/Contact.jsx:31-47`](src/pages/Contact.jsx#L31-L47) (`status`, timer and cleanup), [`src/pages/Contact.jsx:52-70`](src/pages/Contact.jsx#L52-L70) (validate-first submit), [`src/pages/Contact.jsx:128-142`](src/pages/Contact.jsx#L128-L142) (button and feedback)

---
