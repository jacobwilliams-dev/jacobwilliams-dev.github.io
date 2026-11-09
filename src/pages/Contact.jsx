import { useEffect, useState } from 'react'
import PageSection from '../components/PageSection.jsx'
import PeachButton from '../components/PeachButton.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { EMAIL_FORMAT } from '../lib/validation.js'
import '../components/Form.css'
import './Contact.css'

const EMPTY_FIELDS = { name: '', email: '', message: '' }
const SUCCESS_VISIBLE_MS = 5000

function validate({ name, email, message }) {
  const errors = {}

  if (!name.trim()) errors.name = 'Please enter your name.'

  if (!email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_FORMAT.test(email)) {
    errors.email = 'Please enter a valid email address, like name@example.com.'
  }

  if (!message.trim()) errors.message = 'Please enter your message.'

  return errors
}

function Contact() {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [errors, setErrors] = useState({})
  // One value, so success and failure can never show at the same time
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (status !== 'sent') return

    const timer = setTimeout(() => setStatus('idle'), SUCCESS_VISIBLE_MS)

    return () => clearTimeout(timer)
  }, [status])

  function handleChange(event) {
    const { name, value } = event.target

    setFields((current) => ({ ...current, [name]: value }))
    if (status === 'sent') setStatus('idle')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validate(fields)

    setErrors(newErrors)
    if (status === 'failed') setStatus('idle')
    if (Object.keys(newErrors).length > 0) return

    setStatus('sending')

    // No .select(): visitors cannot read messages, so asking for the row back is rejected
    const { error } = await supabase.from('messages').insert(fields)

    if (error) {
      setStatus('failed')
      return
    }

    setFields(EMPTY_FIELDS)
    setStatus('sent')
  }

  return (
    <PageSection label="Contact" heading={<h1 className="contact-heading">Contact</h1>}>
      {supabase ? (
        // noValidate: the browser's pop-ups would replace the messages below
        <form className="form contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={fields.name}
              onChange={handleChange}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="form-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="form-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              value={fields.message}
              onChange={handleChange}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="form-error">
                {errors.message}
              </p>
            )}
          </div>

          <PeachButton type="submit" disabled={status === 'sending'}>
            Send
          </PeachButton>

          {/* Always on the page: screen readers only announce changes to a region they already know */}
          <div className="contact-status" role="status">
            {status === 'sent' && (
              <p className="contact-success">Thanks, your message was sent.</p>
            )}
          </div>
          {status === 'failed' && (
            <p className="form-error" role="alert">
              Your message could not be sent. Please try again.
            </p>
          )}
        </form>
      ) : (
        <p>The contact form is unavailable right now.</p>
      )}
    </PageSection>
  )
}

export default Contact
