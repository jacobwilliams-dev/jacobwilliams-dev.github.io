import { useEffect, useRef, useState } from 'react'
import './Frame.css'

const CORNER_CUT = 28
const CORNER_RADIUS = 18
const MARKER_SIZE = 8

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

function Frame({ children }) {
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
              x={-MARKER_SIZE / 2}
              y={-MARKER_SIZE / 2}
              width={MARKER_SIZE}
              height={MARKER_SIZE}
            />
          </g>
        </svg>
      )}
      <div className="frame-content">{children}</div>
    </div>
  )
}

export default Frame
