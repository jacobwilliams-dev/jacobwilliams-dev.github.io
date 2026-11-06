import { SKILL_ICONS } from '../lib/skillIcons.js'
import './SkillGrid.css'

function SkillGrid({ skills, columns = 3 }) {
  return (
    <ul className="skill-grid" style={{ '--skill-columns': columns }}>
      {skills.map((skill) => {
        const Icon = SKILL_ICONS[skill.icon]

        return (
          <li key={skill.name}>
            <Icon className="skill-icon" aria-hidden="true" strokeWidth={1.5} />
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
