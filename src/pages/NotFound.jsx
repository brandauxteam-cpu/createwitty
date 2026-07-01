import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | CreateWitty" description="The page you're looking for doesn't exist." noindex />
      <div className="min-h-screen bg-mist flex items-center justify-center px-6 text-center">
        <div>
          <div className="font-display font-bold text-navy text-7xl">404</div>
          <p className="text-slate-500 mt-4 text-lg">We couldn't find that page.</p>
          <Link to="/" className="inline-block mt-8 bg-navy text-white rounded-full px-8 py-3.5 font-semibold hover:bg-navy-deep transition-colors">Back to Home</Link>
        </div>
      </div>
    </>
  )
}
