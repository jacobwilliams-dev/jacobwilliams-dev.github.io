import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import PageSection from '../components/PageSection.jsx'
import PeachButton from '../components/PeachButton.jsx'
import { supabase } from '../lib/supabaseClient.js'
import { EMAIL_FORMAT } from '../lib/validation.js'
import '../components/Form.css'
import './Login.css'

const BACK_OFFICE_PATH = '/backoffice'
const EMPTY_FIELDS = { email: '', password: '' }

function validate({ email, password }) {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_FORMAT.test(email)) {
    errors.email = 'Please enter a valid email address, like name@example.com.'
  }

  if (!password) errors.password = 'Please enter your password.'

  return errors
}

function Login() {
  const navigate = useNavigate()
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [errors, setErrors] = useState({})
  const [signInError, setSignInError] = useState('')
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(supabase))

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data, error }) => {
      if (data.session) {
        // replace: otherwise Back would return here and be sent forward again
        navigate(BACK_OFFICE_PATH, { replace: true })
        return
      }

      if (error) setSignInError(error.message)
      setIsCheckingSession(false)
    })
  }, [navigate])

  function handleChange(event) {
    const { name, value } = event.target

    setFields((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const newErrors = validate(fields)

    setErrors(newErrors)
    setSignInError('')
    if (Object.keys(newErrors).length > 0) return

    const { error } = await supabase.auth.signInWithPassword(fields)

    if (error) {
      setSignInError(error.message)
      return
    }

    navigate(BACK_OFFICE_PATH, { replace: true })
  }

  // Nothing yet: a signed-in admin must never see the form, even briefly
  if (isCheckingSession) return null

  return (
    <PageSection label="Login" heading={<h1 className="login-heading">Admin Login</h1>}>
      {supabase ? (
        // noValidate: the browser's pop-ups would replace the messages below
        <form className="form login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
            />
            {errors.email && (
              <p id="login-email-error" className="form-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={fields.password}
              onChange={handleChange}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
            />
            {errors.password && (
              <p id="login-password-error" className="form-error">
                {errors.password}
              </p>
            )}
          </div>

          <PeachButton type="submit">Log In</PeachButton>

          {signInError && (
            <p className="form-error" role="alert">
              {signInError}
            </p>
          )}
        </form>
      ) : (
        <p>Login is unavailable right now.</p>
      )}
    </PageSection>
  )
}

export default Login
