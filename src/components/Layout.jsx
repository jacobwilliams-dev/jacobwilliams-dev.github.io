import { useLayoutEffect } from 'react'
import { matchPath, useLocation } from 'react-router'
import Backdrop from './Backdrop.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import PageTracker from './PageTracker.jsx'
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

  // A route change swaps the page but keeps the window's scroll position.
  // 'instant' because the smooth scrolling on html would animate the reset.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <>
      <Backdrop pagePosition={pagePosition} />
      <Header links={NAV_LINKS} currentLink={NAV_LINKS[pagePosition]} />
      <main className="layout-main">{children}</main>
      <PageTracker key={pathname} />
      <Footer />
    </>
  )
}

export default Layout
