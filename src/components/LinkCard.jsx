import { handleMagnetMove } from '../lib/magnetHover.js'
import './LinkCard.css'

function LinkCard({ title, description, url, image, imageAlt, index }) {
  return (
    <li
      className="link-card"
      style={{ '--index': index }}
      onPointerMove={handleMagnetMove}
    >
      <a
        className="link-card-image-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="link-card-image" src={image} alt={imageAlt} />
      </a>
      <div className="link-card-body">
        <h2>
          <a
            className="link-card-title"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h2>
        <p className="link-card-description">{description}</p>
        <p className="link-card-url">{url}</p>
      </div>
    </li>
  )
}

export default LinkCard
