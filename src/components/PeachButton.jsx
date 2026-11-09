import './PeachButton.css'

function PeachButton({ href, download, type, disabled, children }) {
  const content = (
    <>
      <span className="peach-button-gap" />
      <span className="peach-button-label">{children}</span>
    </>
  )

  if (href) {
    return (
      <a className="peach-button" href={href} download={download}>
        {content}
      </a>
    )
  }

  return (
    <button className="peach-button" type={type} disabled={disabled}>
      {content}
    </button>
  )
}

export default PeachButton
