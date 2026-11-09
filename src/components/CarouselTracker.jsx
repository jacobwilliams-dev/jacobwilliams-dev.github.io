import { ChevronLeft, ChevronRight } from 'lucide-react'
import './CarouselTracker.css'

function CarouselTracker({ titles, activeIndex, onSelect }) {
  return (
    <div className="carousel-tracker" role="group" aria-label="Choose a skill card">
      <button
        type="button"
        className="carousel-arrow"
        aria-label="Previous card"
        onClick={() => onSelect(activeIndex - 1)}
      >
        <ChevronLeft aria-hidden="true" strokeWidth={1.5} />
      </button>
      <div className="carousel-dots">
        {titles.map((title, index) => (
          <button
            key={title}
            type="button"
            className="carousel-dot"
            aria-label={`Show ${title}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="carousel-arrow"
        aria-label="Next card"
        onClick={() => onSelect(activeIndex + 1)}
      >
        <ChevronRight aria-hidden="true" strokeWidth={1.5} />
      </button>
    </div>
  )
}

export default CarouselTracker
