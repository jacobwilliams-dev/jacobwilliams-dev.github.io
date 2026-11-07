import Frame from './Frame.jsx'
import './PageSection.css'

function PageSection({ children, image, imageAlt }) {
  return (
    <section className="page-section">
      <Frame image={image} imageAlt={imageAlt}>
        {children}
      </Frame>
    </section>
  )
}

export default PageSection
