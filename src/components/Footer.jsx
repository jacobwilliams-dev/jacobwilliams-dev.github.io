// Logo generated with ChatGPT
import logo from '../assets/logo-emblem.svg'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={logo} alt="" width="55" height="48" />
        <span className="footer-name">Jacob Williams</span>
      </div>

      <div className="footer-contact">
        <div>
          <p className="footer-label">Get in touch</p>
          <a className="footer-link" href="mailto:jacobwilliams2156@gmail.com">
            jacobwilliams2156@gmail.com
          </a>
        </div>
        <div>
          <p className="footer-label">Find me online</p>
          <ul className="footer-social">
            <li>
              <a
                className="footer-link"
                href="https://www.linkedin.com/in/jacob-williams-profile/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 8.5h4V21H3zM5 2.5a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zM9.5 8.5h3.8v1.75h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.98c0-1.43-.03-3.26-1.99-3.26-1.99 0-2.3 1.55-2.3 3.16V21H9.5z" />
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="footer-link"
                href="https://github.com/jacobwilliams-dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="footer-copyright">
        © {currentYear} Jacob Williams. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
