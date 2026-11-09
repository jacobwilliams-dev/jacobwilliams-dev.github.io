import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import './PageTracker.css'

function getSections() {
  return [...document.querySelectorAll('.page-section')]
}

function PageTracker() {
  const [labels, setLabels] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [footerOverlap, setFooterOverlap] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      const sections = getSections()
      const line = window.innerHeight / 3
      const passedCount = sections.filter(
        (section) => section.getBoundingClientRect().top <= line,
      ).length
      // A short last section may never reach the line, so the page bottom counts as reaching it
      const isAtBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1
      const footerTop = document.querySelector('.footer').getBoundingClientRect().top

      setCurrentIndex(isAtBottom ? sections.length - 1 : Math.max(passedCount - 1, 0))
      setFooterOverlap(Math.max(window.innerHeight - footerTop, 0))
    }

    const measure = () => {
      setLabels(
        getSections().map((section, index) => section.dataset.label ?? `Section ${index + 1}`),
      )
      updatePosition()
    }

    // Runs once on start, then again whenever images or a resize change the page's height
    const observer = new ResizeObserver(measure)
    observer.observe(document.documentElement)
    window.addEventListener('scroll', updatePosition, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updatePosition)
    }
  }, [])

  if (labels.length < 2) return null

  const lastIndex = labels.length - 1
  const indexes = labels.map((_, index) => index)

  return (
    <nav
      className="page-tracker"
      aria-label="Page sections"
      style={{ '--footer-overlap': `${footerOverlap}px` }}
    >
      {indexes.slice(1).map((nextIndex) => {
        const index = nextIndex - 1

        return (
          <span
            key={index}
            className={[
              'page-tracker-line',
              index < currentIndex ? 'page-tracker-line-solid' : 'page-tracker-line-dotted',
              index === currentIndex && 'page-tracker-line-after-ring',
              nextIndex === currentIndex && 'page-tracker-line-before-ring',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ '--from': index / lastIndex, '--to': nextIndex / lastIndex }}
            aria-hidden="true"
          />
        )
      })}

      {indexes.map((index) => {
        const isCurrent = index === currentIndex

        return (
          <button
            key={index}
            type="button"
            className="page-tracker-dot"
            style={{ '--stop': index / lastIndex }}
            aria-label={`Go to ${labels[index]}`}
            aria-current={isCurrent ? 'true' : undefined}
            onClick={() => getSections()[index].scrollIntoView()}
          >
            {isCurrent && (
              <ChevronUp
                className="page-tracker-chevron page-tracker-chevron-up"
                aria-hidden="true"
                strokeWidth={1.5}
              />
            )}
            <span className="page-tracker-mark" />
            {isCurrent && (
              <ChevronDown
                className="page-tracker-chevron page-tracker-chevron-down"
                aria-hidden="true"
                strokeWidth={1.5}
              />
            )}
            <span className="page-tracker-label">
              <span className="page-tracker-label-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              {labels[index]}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default PageTracker
