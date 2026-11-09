import Frame from './Frame.jsx'
import './PageSection.css'

function PageSection({ children, image, imageAlt, label, heading }) {
  return (
    // data-label: PageTracker reads this for the title it shows on hover
    <section className="page-section" data-label={label}>
      {heading && <div className="page-section-heading">{heading}</div>}
      <Frame image={image} imageAlt={imageAlt}>
        {children}
      </Frame>
    </section>
  )
}

export default PageSection
