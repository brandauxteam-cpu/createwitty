import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEnroll } from '../context/EnrollContext.jsx'
import { LOGO } from '../lib/site.js'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/#courses' },
  { label: 'Mentors', to: '/#mentors' },
  { label: 'Placements', to: '/#placements' },
  { label: 'Blog', to: '/blog' },
  { label: 'News', to: '/news' },
]

export default function Navbar({ solid = false }) {
  const { openEnroll } = useEnroll()
  const [show, setShow] = useState(solid)

  useEffect(() => {
    if (solid) return
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  return (
    <nav className={`sticky-nav ${solid || show ? 'show' : ''}`}>
      <Bar openEnroll={openEnroll} />
    </nav>
  )
}

function Bar({ openEnroll }) {
  return (
    <div className="max-w-8xl mx-auto px-5 sm:px-8 py-2.5 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img src={LOGO} alt="CreateWitty" className="h-8 sm:h-9 w-auto" />
      </Link>
      <div className="hidden md:flex items-center gap-7 text-sm text-white/75">
        {LINKS.map((l) => (
          <Link key={l.label} to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
        ))}
        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      <button
        onClick={() => openEnroll('')}
        className="bg-gold text-navy rounded-full px-5 py-2 text-sm font-semibold hover:scale-[1.03] transition-transform"
      >
        Join Course
      </button>
    </div>
  )
}
