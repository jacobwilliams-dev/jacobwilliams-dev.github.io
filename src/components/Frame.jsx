import { useEffect, useRef, useState } from 'react'
import './Frame.css'

const CORNER_CUT = 28
const CORNER_RADIUS = 18
const MARKER_SIZE = 14
const MARKER_OVERHANG = 9
const MARKER_DOT_RADIUS = 1.5
const CORNER_DOT_RADIUS = 2.5
const CORNER_DOT_INSET = 3

function getOutlinePath(width, height) {
  return [
    'M 0 0',
    `H ${width - CORNER_CUT}`,
    `L ${width} ${CORNER_CUT}`,
    `V ${height - CORNER_RADIUS}`,
    `A ${CORNER_RADIUS} ${CORNER_RADIUS} 0 0 1 ${width - CORNER_RADIUS} ${height}`,
    `H ${CORNER_CUT}`,
    `L 0 ${height - CORNER_CUT}`,
    'Z',
  ].join(' ')
}

function Frame({ children, image, imageAlt }) {
  const frameRef = useRef(null)
  const [size, setSize] = useState(null)

  // Drawn in real pixels: stretching a fixed drawing would bend the 45° corners
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    observer.observe(frameRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div className="frame" ref={frameRef}>
      {size && (
        <svg className="frame-outline" aria-hidden="true">
          {/* Half a pixel in, so the 1px line lands on whole pixels and stays sharp */}
          <g transform="translate(0.5 0.5)">
            <path d={getOutlinePath(size.width - 1, size.height - 1)} />
            <rect
              className="frame-marker"
              x={-MARKER_OVERHANG}
              y={-MARKER_OVERHANG}
              width={MARKER_SIZE}
              height={MARKER_SIZE}
            />
            <circle
              className="frame-dot"
              cx={MARKER_SIZE / 2 - MARKER_OVERHANG}
              cy={MARKER_SIZE / 2 - MARKER_OVERHANG}
              r={MARKER_DOT_RADIUS}
            />
            {/* These two sit where the cut corners would have been */}
            <circle
              className="frame-dot"
              cx={size.width - 1 - CORNER_DOT_INSET}
              cy={CORNER_DOT_INSET}
              r={CORNER_DOT_RADIUS}
            />
            <circle
              className="frame-dot"
              cx={CORNER_DOT_INSET}
              cy={size.height - 1 - CORNER_DOT_INSET}
              r={CORNER_DOT_RADIUS}
            />
          </g>
        </svg>
      )}
      {size && image && (
        <img
          className="frame-image"
          src={image}
          alt={imageAlt}
          style={{ clipPath: `path('${getOutlinePath(size.width, size.height)}')` }}
        />
      )}
      <div className="frame-content">{children}</div>
    </div>
  )
}

export default Frame
