import './ScrollHint.css'

function ScrollHint({ children = 'Scroll down', className = '' }) {
  return (
    <p className={`scroll-hint ${className}`} aria-hidden="true">
      {children}
    </p>
  )
}

export default ScrollHint
