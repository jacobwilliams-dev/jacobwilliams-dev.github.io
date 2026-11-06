import Frame from './Frame.jsx'
import './PageSection.css'

function PageSection({ children }) {
  return (
    <section className="page-section">
      <Frame>{children}</Frame>
    </section>
  )
}

export default PageSection
