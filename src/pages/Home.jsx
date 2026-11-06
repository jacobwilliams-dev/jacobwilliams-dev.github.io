import PageSection from '../components/PageSection.jsx'
import ScrollHint from '../components/ScrollHint.jsx'
import SkillGrid from '../components/SkillGrid.jsx'
import SkillCarousel from '../components/SkillCarousel.jsx'
import homeContent from '../assets/homeContent.json'
import './Home.css'

function Home() {
  const { intro, technicalGroups, softSkills } = homeContent

  return (
    <>
      <PageSection>
        <div className="home-intro">
          <h1>{intro.name}</h1>
          <p className="home-tagline">{intro.tagline}</p>
          <p>{intro.paragraph}</p>
        </div>
        <ScrollHint />
      </PageSection>

      <PageSection>
        <SkillCarousel heading="Technical Skills" groups={technicalGroups} />
      </PageSection>

      <PageSection>
        <h2 className="home-skills-title">Soft Skills</h2>
        <SkillGrid skills={softSkills} />
      </PageSection>
    </>
  )
}

export default Home
