import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Downloads from './pages/Downloads.jsx'
import Docs from './pages/Docs.jsx'
import Team from './pages/Team.jsx'
import NotFound from './pages/NotFound.jsx'

// The active Lenis instance (null when reduced motion is preferred).
// ScrollToTop needs it because window.scrollTo alone doesn't reset
// Lenis's internal scroll state.
let activeLenis = null

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (activeLenis) {
      activeLenis.scrollTo(0, { immediate: true, force: true })
    }
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * Lenis smooth scrolling - inertia-based scroll smoothing over the whole
 * page. Skipped entirely when the user prefers reduced motion.
 */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    activeLenis = lenis

    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      activeLenis = null
    }
  }, [])
}

function RoutedContent() {
  const location = useLocation()
  // All docs pages share one key so moving between doc sections doesn't
  // replay the page fade transition.
  const pageKey =
    location.pathname === '/docs' || location.pathname.startsWith('/docs/')
      ? 'docs'
      : location.pathname

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pageKey}
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
        transition={{ duration: 0.45, ease: [0.83, 0, 0.17, 1] }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/docs/:slug/:section" element={<Docs />} />
          <Route path="/docs/:slug" element={<Docs />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  useSmoothScroll()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col text-white" style={{ backgroundColor: '#07080b' }}>
        <Header />
        <RoutedContent />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
