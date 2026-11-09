import { handleMagnetMove } from '../lib/magnetHover.js'
import './ProjectEntry.css'

function ProjectEntry({ name, technologies, description, image, imageAlt, index }) {
  return (
    <li
      className="project-entry"
      style={{ '--index': index }}
      onPointerMove={handleMagnetMove}
    >
      <img className="project-entry-image" src={image} alt={imageAlt} />
      <div className="project-entry-body">
        <h3>{name}</h3>
        <ul className="project-entry-tags">
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <p className="project-entry-description">{description}</p>
      </div>
    </li>
  )
}

export default ProjectEntry
