import PageSection from '../components/PageSection.jsx'
import SkillGrid from '../components/SkillGrid.jsx'
import SkillCarousel from '../components/SkillCarousel.jsx'
import homeContent from '../assets/homeContent.json'
import profilePhoto from '../assets/profile-photo.jpg'
// Image generated with Google Gemini
import introImage from '../assets/home-intro.png'
// Image generated with Google Gemini
import technicalImage from '../assets/home-technical.png'
// Image generated with Google Gemini
import softImage from '../assets/home-soft.png'
import './Home.css'

function Home() {
  const { intro, technicalGroups, softSkills } = homeContent

  return (
    <>
      <PageSection
        label="Introduction"
        image={introImage}
        imageAlt="A developer seen from behind at a glowing workstation, looking out a wide window at a starfield."
      >
        <div className="home-intro-row">
          <div className="home-intro-text">
            <div className="home-intro">
              <h1>{intro.name}</h1>
              <p className="home-tagline">{intro.tagline}</p>
              <p>{intro.paragraph}</p>
            </div>
          </div>
          <img
            className="home-photo"
            src={profilePhoto}
            alt={`Portrait of ${intro.name}`}
          />
        </div>
      </PageSection>

      <PageSection
        label="Technical Skills"
        image={technicalImage}
        imageAlt="Floating holographic screens showing abstract code, database and server diagrams in a dark control room."
      >
        <SkillCarousel heading="Technical Skills" groups={technicalGroups} />
      </PageSection>

      <PageSection
        label="Soft Skills"
        image={softImage}
        imageAlt="Two people planning together around a holographic table in a dark control room."
      >
        <h2 className="home-skills-title">Soft Skills</h2>
        <SkillGrid skills={softSkills} hoverCards />
      </PageSection>
    </>
  )
}

export default Home
