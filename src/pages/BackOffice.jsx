import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import MessageModal from '../components/MessageModal.jsx'
import PageSection from '../components/PageSection.jsx'
import { supabase } from '../lib/supabaseClient.js'
import '../components/Form.css'
import './BackOffice.css'

const LOGIN_PATH = '/login'
const DATE_FORMAT = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

function BackOffice() {
  const navigate = useNavigate()
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(supabase))
  // One value, so loading, failed and loaded can never show at the same time
  const [loadStatus, setLoadStatus] = useState('loading')
  const [messages, setMessages] = useState([])
  // A list, so a delete on one row cannot re-enable another row still deleting
  const [deletingIds, setDeletingIds] = useState([])
  const [actionError, setActionError] = useState('')
  const [openMessage, setOpenMessage] = useState(null)

  useEffect(() => {
    if (!supabase) return

    async function loadPage() {
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        // replace: otherwise Back would return here and be sent forward again
        navigate(LOGIN_PATH, { replace: true })
        return
      }

      setIsCheckingSession(false)

      const { data, error } = await supabase
        .from('messages')
        .select('id, name, email, message, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        setLoadStatus('failed')
        return
      }

      setMessages(data)
      setLoadStatus('loaded')
    }

    loadPage()
  }, [navigate])

  async function handleDelete(id) {
    setActionError('')
    setDeletingIds((current) => [...current, id])

    // .select(): a delete that matches no row raises no error, so the returned row is the proof
    const { data, error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)
      .select()

    setDeletingIds((current) => current.filter((deletingId) => deletingId !== id))

    if (error || data.length === 0) {
      setActionError('This message could not be deleted. Please try again.')
      return
    }

    setMessages((current) => current.filter((message) => message.id !== id))
  }

  async function handleLogout() {
    setActionError('')

    const { error } = await supabase.auth.signOut()

    if (error) {
      setActionError('You could not be logged out. Please try again.')
      return
    }

    navigate(LOGIN_PATH, { replace: true })
  }

  function renderMessages() {
    if (loadStatus === 'loading') return <p>Loading messages...</p>

    if (loadStatus === 'failed') {
      return (
        <p className="form-error" role="alert">
          Messages could not be loaded. Please refresh the page to try again.
        </p>
      )
    }

    if (messages.length === 0) return <p>No messages yet</p>

    return (
      <table className="backoffice-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{DATE_FORMAT.format(new Date(message.created_at))}</td>
              <td>
                <div className="backoffice-actions">
                  <button
                    type="button"
                    className="backoffice-button"
                    onClick={() => setOpenMessage(message)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="backoffice-button"
                    onClick={() => handleDelete(message.id)}
                    disabled={deletingIds.includes(message.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  if (!supabase) {
    return (
      <PageSection label="Back Office">
        <p>The Back Office is unavailable right now.</p>
      </PageSection>
    )
  }

  // Nothing yet: a visitor without a session must never see the page, even briefly
  if (isCheckingSession) return null

  return (
    <PageSection
      label="Back Office"
      heading={
        <div className="backoffice-heading">
          <h1>Back Office</h1>
          <button type="button" className="backoffice-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      }
    >
      {actionError && (
        <p className="form-error backoffice-action-error" role="alert">
          {actionError}
        </p>
      )}

      {renderMessages()}

      {openMessage && (
        <MessageModal message={openMessage} onClose={() => setOpenMessage(null)} />
      )}
    </PageSection>
  )
}

export default BackOffice
