import { matchPath, useLocation } from 'react-router'
import Backdrop from './Backdrop.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import './Layout.css'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Links', path: '/links' },
  { label: 'Contact', path: '/contact' },
]

function Layout({ children }) {
  const { pathname } = useLocation()
  const pagePosition = NAV_LINKS.findIndex((link) =>
    matchPath(link.path, pathname),
  )

  return (
    <>
      <Backdrop pagePosition={pagePosition} />
      <Header links={NAV_LINKS} currentLink={NAV_LINKS[pagePosition]} />
      <main className="layout-main">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
