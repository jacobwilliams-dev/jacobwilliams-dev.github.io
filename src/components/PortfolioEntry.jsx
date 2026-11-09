import RingDivider from './RingDivider.jsx'
import './PortfolioEntry.css'

function PortfolioEntry({ title, subtitle, dates, summary, highlights, logo, logoAlt, compactLogo }) {
  const logoClass = compactLogo
    ? 'portfolio-entry-logo portfolio-entry-logo-compact'
    : 'portfolio-entry-logo'

  return (
    <article className="portfolio-entry">
      <div className="portfolio-entry-head">
        {logo && <img className={logoClass} src={logo} alt={logoAlt} />}
        <div className="portfolio-entry-head-text">
          <div className="portfolio-entry-title-row">
            <h3>{title}</h3>
            <span className="portfolio-entry-trail" aria-hidden="true" />
          </div>
          <p className="portfolio-entry-subtitle">
            {subtitle}
            <span className="portfolio-entry-dash" aria-hidden="true" />
          </p>
          <p className="portfolio-entry-dates">
            <span className="portfolio-entry-arc" aria-hidden="true" />
            {dates}
          </p>
        </div>
      </div>
      {summary && <RingDivider />}
      {summary && <p>{summary}</p>}
      {highlights && (
        <ul className="portfolio-entry-highlights">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
    </article>
  )
}

export default PortfolioEntry
