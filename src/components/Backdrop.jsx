// Starfield drawn by a seeded canvas script, not AI-generated
import starfield from '../assets/starfield.png'
import './Backdrop.css'

const ORBIT_START_ANGLE = -15
const ORBIT_ANGLE_STEP = 42

function Backdrop({ pagePosition }) {
  // pagePosition is -1 on a path outside the link list; that path uses Home's angle
  const orbitAngle =
    Math.max(pagePosition, 0) * ORBIT_ANGLE_STEP + ORBIT_START_ANGLE

  return (
    <div className="backdrop">
      <img className="backdrop-stars" src={starfield} alt="" />
      <svg
        className="backdrop-orbit"
        viewBox="0 0 620 620"
        aria-hidden="true"
        style={{ transform: `rotate(${orbitAngle}deg)` }}
      >
        <g fill="none" stroke="currentColor" strokeWidth=".65">
          <circle cx="310" cy="310" r="115" />
          <circle cx="310" cy="310" r="188" />
          <circle cx="310" cy="310" r="272" />
          <ellipse
            cx="310"
            cy="310"
            rx="308"
            ry="150"
            transform="rotate(-46 310 310)"
          />
          <ellipse
            cx="306"
            cy="294"
            rx="309"
            ry="98"
            transform="rotate(23 306 294)"
          />
          <ellipse
            cx="205"
            cy="311"
            rx="292"
            ry="89"
            transform="rotate(85 205 311)"
          />
          <circle cx="390" cy="226" r="24" />
        </g>
        <g fill="currentColor">
          <circle cx="390" cy="226" r="7" />
          <circle cx="112" cy="123" r="4" />
          <circle cx="455" cy="82" r="4" />
          <circle cx="199" cy="159" r="7" />
          <circle cx="83" cy="420" r="8" />
          <circle cx="411" cy="479" r="5" />
          <circle cx="511" cy="320" r="3" />
        </g>
      </svg>
    </div>
  )
}

export default Backdrop
