import { HashRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import SecretLoginShortcut from './components/SecretLoginShortcut.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Links from './pages/Links.jsx'
import Login from './pages/Login.jsx'
import Portfolio from './pages/Portfolio.jsx'

function App() {
  return (
    <HashRouter>
      <SecretLoginShortcut />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/links" element={<Links />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
