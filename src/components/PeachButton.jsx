import './PeachButton.css'

function PeachButton({ href, download, children }) {
  return (
    <a className="peach-button" href={href} download={download}>
      <span className="peach-button-gap" />
      <span className="peach-button-label">{children}</span>
    </a>
  )
}

export default PeachButton
