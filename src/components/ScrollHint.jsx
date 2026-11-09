import './ScrollHint.css'

function ScrollHint({ children, className = '' }) {
  return (
    <p className={`scroll-hint ${className}`} aria-hidden="true">
      {children}
    </p>
  )
}

export default ScrollHint
