import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const SEQUENCE = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']
const LOGIN_PATH = '/login'

// Renders nothing: it only listens for the secret key sequence
function SecretLoginShortcut() {
  const navigate = useNavigate()

  useEffect(() => {
    let nextStep = 0

    function handleKeyDown(event) {
      // Holding a key repeats it, which must not count as a wrong key
      if (event.repeat) return
      // Option+arrows moves the cursor inside a text field
      if (event.target.matches('input, textarea')) return

      if (!event.altKey || event.key !== SEQUENCE[nextStep]) {
        nextStep = event.altKey && event.key === SEQUENCE[0] ? 1 : 0
        return
      }

      nextStep += 1

      if (nextStep === SEQUENCE.length) {
        nextStep = 0
        navigate(LOGIN_PATH)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return null
}

export default SecretLoginShortcut
