import { useRef, useState } from 'react'
import { handleMagnetMove } from '../lib/magnetHover.js'
import SkillGrid from './SkillGrid.jsx'
import './SkillCarousel.css'

const ARROW_STEPS = { ArrowUp: -1, ArrowDown: 1 }

// Steps from the focused card, the short way round, so cards split across both sides
function getOffset(index, focusedIndex, total) {
  const half = Math.floor(total / 2)
  return ((index - focusedIndex + total + half) % total) - half
}

function SkillCarousel({ heading, groups }) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const titleRefs = useRef([])

  const handleKeyDown = (event) => {
    const step = ARROW_STEPS[event.key]
    if (!step) return

    // Without this, the arrow key would also scroll the page
    event.preventDefault()
    // Adding the length keeps the sum positive, so Up wraps from first to last
    const nextIndex = (focusedIndex + step + groups.length) % groups.length
    setFocusedIndex(nextIndex)
    titleRefs.current[nextIndex].focus()
  }

  return (
    <div className="skill-carousel">
      <div className="skill-side">
        <h2 className="skill-heading">{heading}</h2>
        <div
          role="tablist"
          aria-label="Technical skill groups"
          aria-orientation="vertical"
          className="skill-titles"
          onKeyDown={handleKeyDown}
        >
          {groups.map((group, index) => {
            const isFocused = index === focusedIndex

            return (
              <button
                key={group.title}
                ref={(element) => {
                  titleRefs.current[index] = element
                }}
                type="button"
                role="tab"
                id={`skill-title-${index}`}
                className="skill-title"
                aria-selected={isFocused}
                aria-controls={`skill-card-${index}`}
                // Only the open title is in the Tab key order; arrows reach the others
                tabIndex={isFocused ? 0 : -1}
                onClick={() => setFocusedIndex(index)}
              >
                <span className="skill-title-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="skill-title-name">{group.title}</span>
                <span className="skill-title-count" aria-hidden="true">
                  {group.skills.length}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="skill-stage">
        {groups.map((group, index) => {
          const offset = getOffset(index, focusedIndex, groups.length)
          const isFocused = offset === 0

          return (
            // The click is a mouse and touch shortcut; keyboard users have the titles
            <div
              key={group.title}
              role="tabpanel"
              id={`skill-card-${index}`}
              className="skill-card"
              aria-labelledby={`skill-title-${index}`}
              aria-hidden={!isFocused}
              tabIndex={isFocused ? 0 : undefined}
              style={{
                '--index': index,
                '--offset': offset,
                '--distance': Math.abs(offset),
              }}
              onClick={() => setFocusedIndex(index)}
              onPointerMove={handleMagnetMove}
            >
              <h3 className="skill-card-title">{group.title}</h3>
              <p className="skill-card-summary">{group.summary}</p>
              <SkillGrid skills={group.skills} columns={1} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillCarousel
