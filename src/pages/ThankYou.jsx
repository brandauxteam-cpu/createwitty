import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { WHATSAPP_LINK } from '../lib/site.js'

export default function ThankYou() {
  return (
    <>
      <Seo title="Thank You | CreateWitty" description="Your request has been received." noindex />
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-navy-deep flex items-center justify-center px-6 text-center">
        <div>
          <div className="w-24 h-24 mx-auto rounded-full bg-gold flex items-center justify-center text-navy text-5xl font-bold mb-8">✓</div>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl">Thank you!</h1>
          <p className="text-white/80 text-lg max-w-md mx-auto mt-5">Your request has reached <span className="text-gradient-gold font-semibold">CreateWitty</span>. Our team will get back to you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/" className="bg-gold text-navy rounded-full px-8 py-3.5 font-semibold hover:scale-[1.03] transition-transform">Back to Home</Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="border border-white/30 text-white rounded-full px-8 py-3.5 font-medium hover:bg-white/10 transition-colors">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  )
}
