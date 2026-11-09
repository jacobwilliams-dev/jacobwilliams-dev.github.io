import { useEffect, useRef } from 'react'
import '../pages/BackOffice.css'
import './MessageModal.css'

const DATE_TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function MessageModal({ message, onClose }) {
  const dialogRef = useRef(null)
  const pressStartedOnBackdrop = useRef(false)

  useEffect(() => {
    // StrictMode runs this twice in development, and opening an open dialog can throw
    if (!dialogRef.current.open) dialogRef.current.showModal()
  }, [])

  function handleMouseDown(event) {
    // The panel covers the whole dialog, so only the backdrop targets the dialog itself
    pressStartedOnBackdrop.current = event.target === event.currentTarget
  }

  function handleClick(event) {
    // Dragging a text selection out of the panel also ends as a click on the dialog
    if (event.target === event.currentTarget && pressStartedOnBackdrop.current) onClose()
  }

  return (
    // onClose: the browser closes the dialog on Escape and fires this event
    <dialog
      ref={dialogRef}
      className="message-modal"
      aria-labelledby="message-modal-name"
      onClose={onClose}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div className="message-modal-panel">
        <h2 id="message-modal-name">{message.name}</h2>
        <p className="message-modal-detail">{message.email}</p>
        <p className="message-modal-detail">
          {DATE_TIME_FORMAT.format(new Date(message.created_at))}
        </p>
        <p className="message-modal-body">{message.message}</p>
        <button type="button" className="backoffice-button" onClick={onClose}>
          Close
        </button>
      </div>
    </dialog>
  )
}

export default MessageModal
