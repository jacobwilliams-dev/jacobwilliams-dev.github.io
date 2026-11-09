import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { handleMagnetMove } from '../lib/magnetHover.js'
import CarouselTracker from './CarouselTracker.jsx'
import ScrollHint from './ScrollHint.jsx'
import SkillGrid from './SkillGrid.jsx'
import './SkillCarousel.css'

const ARROW_STEPS = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 }
const DRAG_START = 8
const OVERDRAG_GIVE = 0.2
const SWIPE_ARROWS = [0, 1, 2]

// The second % handles negatives, because % keeps the sign in JavaScript
function wrap(value, total) {
  return ((value % total) + total) % total
}

// Steps from the current position, the short way round, so cards split across both sides.
// Mid-drag the position is a fraction, so the offset is too, and the cards sit in between
function getOffset(index, position, total) {
  const half = total / 2
  return wrap(index - position + half, total) - half
}

function SkillCarousel({ heading, groups }) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  // How many cards the finger has dragged, as a fraction. null when no drag is happening
  const [dragSteps, setDragSteps] = useState(null)
  const titleRefs = useRef([])
  const dragStart = useRef(null)

  const dragPosition = focusedIndex - (dragSteps ?? 0)
  const stoppedPosition = Math.min(Math.max(dragPosition, 0), groups.length - 1)
  // Past the first or last card, the cards give a little instead of stopping dead
  const position = stoppedPosition + (dragPosition - stoppedPosition) * OVERDRAG_GIVE
  // The nearest card, so the title and focus marks follow the drag
  const activeIndex = Math.round(stoppedPosition)

  const selectCard = (index) => setFocusedIndex(wrap(index, groups.length))

  const handleKeyDown = (event) => {
    const step = ARROW_STEPS[event.key]
    if (!step) return

    // Without this, the arrow key would also scroll the page
    event.preventDefault()
    const nextIndex = wrap(focusedIndex + step, groups.length)
    setFocusedIndex(nextIndex)
    titleRefs.current[nextIndex].focus()
  }

  const handleTouchStart = (event) => {
    const { clientX, clientY } = event.touches[0]
    dragStart.current = { x: clientX, y: clientY }
  }

  const handleTouchMove = (event) => {
    const { clientX, clientY } = event.touches[0]
    const distanceX = clientX - dragStart.current.x
    const distanceY = clientY - dragStart.current.y

    // A mostly vertical start is the visitor scrolling the page
    const isStarting = Math.abs(distanceX) >= DRAG_START && Math.abs(distanceX) > Math.abs(distanceY)
    if (dragSteps === null && !isStarting) return

    // Half the stage width of finger travel moves one card
    setDragSteps(distanceX / (event.currentTarget.clientWidth / 2))
  }

  const handleTouchEnd = () => {
    if (dragSteps === null) return

    setFocusedIndex(activeIndex)
    setDragSteps(null)
  }

  return (
    <div className="skill-carousel">
      <div className="skill-side">
        <h2 className="skill-heading">{heading}</h2>
        <ScrollHint className="skill-swipe-hint">
          <span
            className={
              activeIndex === 0
                ? 'skill-swipe-arrows skill-swipe-left skill-swipe-end'
                : 'skill-swipe-arrows skill-swipe-left'
            }
          >
            {SWIPE_ARROWS.map((arrow) => (
              <ChevronLeft key={arrow} />
            ))}
          </span>
          Swipe
          <span
            className={
              activeIndex === groups.length - 1
                ? 'skill-swipe-arrows skill-swipe-end'
                : 'skill-swipe-arrows'
            }
          >
            {SWIPE_ARROWS.map((arrow) => (
              <ChevronRight key={arrow} />
            ))}
          </span>
        </ScrollHint>
        <div
          role="tablist"
          aria-label="Technical skill groups"
          aria-orientation="vertical"
          className="skill-titles"
          onKeyDown={handleKeyDown}
        >
          {groups.map((group, index) => {
            const isFocused = index === activeIndex

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
              </button>
            )
          })}
        </div>
      </div>

      <div
        className={dragSteps === null ? 'skill-stage' : 'skill-stage skill-stage-dragging'}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => setDragSteps(null)}
      >
        {groups.map((group, index) => {
          const loopOffset = getOffset(index, position, groups.length)
          const lineOffset = index - position
          const isFocused = index === activeIndex

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
                '--loop-offset': loopOffset,
                '--loop-distance': Math.abs(loopOffset),
                '--line-offset': lineOffset,
                '--line-distance': Math.abs(lineOffset),
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
        <CarouselTracker
          titles={groups.map((group) => group.title)}
          activeIndex={activeIndex}
          onSelect={selectCard}
        />
      </div>
    </div>
  )
}

export default SkillCarousel
