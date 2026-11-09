import { Fragment } from 'react'
import PageSection from '../components/PageSection.jsx'
import PeachButton from '../components/PeachButton.jsx'
import PortfolioEntry from '../components/PortfolioEntry.jsx'
import ProjectEntry from '../components/ProjectEntry.jsx'
import RingDivider from '../components/RingDivider.jsx'
import ScrollHint from '../components/ScrollHint.jsx'
import portfolioContent from '../assets/portfolioContent.json'
// Image generated with Google Gemini
import rocketFoodDeliveryImage from '../assets/portfolio-rocket-food-delivery.png'
// Image generated with Google Gemini
import codeBloggsImage from '../assets/portfolio-codebloggs.png'
// Image generated with Google Gemini
import rocketElevatorsImage from '../assets/portfolio-rocket-elevators.png'
import './Portfolio.css'

const RESUME_PATH = '/Jacob-Williams-Resume.pdf'

// JSON cannot hold an image import, so the content file names each image by key
const PROJECT_IMAGES = {
  rocketFoodDelivery: rocketFoodDeliveryImage,
  codeBloggs: codeBloggsImage,
  rocketElevators: rocketElevatorsImage,
}

function Portfolio() {
  const { education, work, projects } = portfolioContent

  return (
    <>
      <PageSection
        label="Education"
        heading={
          <>
            <div className="portfolio-heading-row">
              <h1>Portfolio</h1>
              <PeachButton href={RESUME_PATH} download>
                Download Résumé
              </PeachButton>
            </div>
            <h2>Education</h2>
          </>
        }
      >
        {education.map((entry, index) => (
          <Fragment key={entry.institution}>
            {index > 0 && <RingDivider />}
            <PortfolioEntry
              title={entry.institution}
              subtitle={entry.program}
              dates={entry.dates}
            />
          </Fragment>
        ))}
        <ScrollHint />
      </PageSection>

      {work.map((entry, index) => (
        <PageSection
          key={entry.title}
          label={entry.title}
          heading={index === 0 ? <h2>Work Experience</h2> : undefined}
        >
          <PortfolioEntry
            title={entry.title}
            subtitle={entry.organization}
            dates={entry.dates}
            summary={entry.summary}
            highlights={entry.highlights}
          />
        </PageSection>
      ))}

      <PageSection label="Projects" heading={<h2>Projects</h2>}>
        <ul className="portfolio-projects">
          {projects.map((project, index) => (
            <ProjectEntry
              key={project.name}
              name={project.name}
              technologies={project.technologies}
              description={project.description}
              image={PROJECT_IMAGES[project.imageKey]}
              imageAlt={project.imageAlt}
              index={index}
            />
          ))}
        </ul>
      </PageSection>
    </>
  )
}

export default Portfolio
