import { SKILL_ICONS, SKILL_IMAGES } from '../lib/skillIcons.js'
import { handleMagnetMove } from '../lib/magnetHover.js'
import './SkillGrid.css'

function SkillGrid({ skills, columns = 3, hoverCards = false }) {
  return (
    <ul
      className={hoverCards ? 'skill-grid skill-grid-hover' : 'skill-grid'}
      style={{ '--skill-columns': columns }}
    >
      {skills.map((skill, index) => {
        const Icon = SKILL_ICONS[skill.icon]
        const image = SKILL_IMAGES[skill.icon]

        return (
          <li
            key={skill.name}
            style={{ '--index': index }}
            onPointerMove={hoverCards ? handleMagnetMove : undefined}
          >
            {image ? (
              <span
                className="skill-icon skill-image"
                style={{ '--image': `url(${image})` }}
                aria-hidden="true"
              />
            ) : (
              <Icon className="skill-icon" aria-hidden="true" strokeWidth={1.5} />
            )}
            <div>
              <p className="skill-name">{skill.name}</p>
              <p>{skill.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SkillGrid
