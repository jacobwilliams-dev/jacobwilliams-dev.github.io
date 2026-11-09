import LinkCard from '../components/LinkCard.jsx'
import PageSection from '../components/PageSection.jsx'
import linksContent from '../assets/linksContent.json'
// Image generated with Google Gemini
import linkedinImage from '../assets/links-linkedin.png'
// Image generated with Google Gemini
import githubImage from '../assets/links-github.png'
// Image generated with Google Gemini
import codeboxxImage from '../assets/links-codeboxx.png'
// Image generated with Google Gemini
import youtubeImage from '../assets/links-youtube.png'
// Image generated with Google Gemini
import reactImage from '../assets/links-react.png'
// Image generated with Google Gemini
import supabaseImage from '../assets/links-supabase.png'
import './Links.css'

// JSON cannot hold an image import, so the content file names each image by key
const LINK_IMAGES = {
  linkedin: linkedinImage,
  github: githubImage,
  codeboxx: codeboxxImage,
  youtube: youtubeImage,
  react: reactImage,
  supabase: supabaseImage,
}

function Links() {
  return (
    <PageSection label="Links" heading={<h1 className="links-heading">Links</h1>}>
      <ul className="links-grid">
        {linksContent.map((link, index) => (
          <LinkCard
            key={link.title}
            title={link.title}
            description={link.description}
            url={link.url}
            image={LINK_IMAGES[link.imageKey]}
            imageAlt={link.imageAlt}
            index={index}
          />
        ))}
      </ul>
    </PageSection>
  )
}

export default Links
