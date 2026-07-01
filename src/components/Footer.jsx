import { Link } from 'react-router-dom'
import { useEnroll } from '../context/EnrollContext.jsx'
import { DISPLAY_EMAIL, PHONE, ADDRESS, HOURS, LOGO, BRANDAUX_URL, BRANDAUX_LOGO } from '../lib/site.js'

export default function Footer() {
  const { openEnroll } = useEnroll()
  return (
    <footer className="bg-navy-deep text-white pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <img src={LOGO} alt="CreateWitty" className="h-10 w-auto" />
          <p className="text-white/60 text-sm mt-4">100% online Digital Marketing academy. Built to transform careers, not just sell courses.</p>
          <p className="text-white/50 text-sm mt-4">📍 {ADDRESS}</p>
          <p className="text-white/50 text-sm mt-2">🕘 {HOURS}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gold">Programs</h3>
          <ul className="mt-4 space-y-2 text-white/60 text-sm">
            <li><Link to="/#courses" className="hover:text-white">DM Professional — ₹14,990</Link></li>
            <li><Link to="/#courses" className="hover:text-white">DM + AI — ₹19,990</Link></li>
            <li><Link to="/#courses" className="hover:text-white">AI + Neuromarketing — ₹24,990</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gold">Company</h3>
          <ul className="mt-4 space-y-2 text-white/60 text-sm">
            <li><Link to="/#mentors" className="hover:text-white">Mentors</Link></li>
            <li><Link to="/#placements" className="hover:text-white">Placements</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/news" className="hover:text-white">News</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact &amp; Booking</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gold">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-white/60 text-sm">
            <li>✉️ {DISPLAY_EMAIL}</li>
            <li>📞 {PHONE}</li>
            <li><button onClick={() => openEnroll('')} className="text-gold hover:underline">Join a course →</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col items-center gap-6">
        <a href={BRANDAUX_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 text-sm hover:text-white transition-colors">
          <span>In association with</span>
          <img src={BRANDAUX_LOGO} alt="BrandAux" className="h-9 w-auto bg-white/95 rounded-lg px-2.5 py-1" />
        </a>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-3 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} CreateWitty. All rights reserved.</p>
          <p>Made in Hyderabad with ambition.</p>
        </div>
      </div>
    </footer>
  )
}
