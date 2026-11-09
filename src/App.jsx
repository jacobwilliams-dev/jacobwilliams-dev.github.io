import { HashRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Links from './pages/Links.jsx'
import Portfolio from './pages/Portfolio.jsx'

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
