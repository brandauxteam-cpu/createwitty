import { useEnroll } from '../context/EnrollContext.jsx'
import { ENROLL_OPTIONS } from '../data/courses.js'
import { FORM_ACTION, SITE_URL } from '../lib/site.js'

// Single global enrollment form used across the whole site.
export default function EnrollModal() {
  const { open, course, closeEnroll } = useEnroll()
  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={closeEnroll} role="dialog" aria-modal="true" aria-label="Join CreateWitty">
      <div className="modal-panel bg-white rounded-3xl my-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-br from-navy to-navy-deep text-white p-7 relative">
          <button onClick={closeEnroll} aria-label="Close" className="absolute top-5 right-5 text-white/70 hover:text-white text-2xl leading-none">&times;</button>
          <span className="text-xs uppercase tracking-wide text-gold font-semibold">Enrollment</span>
          <h3 className="font-display font-bold text-2xl mt-2">Join CreateWitty</h3>
          <p className="text-white/70 text-sm mt-1">Fill this once — we'll confirm your seat within 24 hours.</p>
        </div>
        <form action={FORM_ACTION} method="POST" className="p-7 space-y-4">
          <input type="hidden" name="_subject" value="New Course Enrollment 🎓 — CreateWitty" />
          <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_cc" value="createwity1@gmail.com" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={`${SITE_URL}/thank-you`} />

          <input type="text" name="Full Name" required placeholder="Full name" className="field" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="email" name="Email" required placeholder="Email" className="field" />
            <input type="tel" name="Phone / WhatsApp" required placeholder="Phone / WhatsApp" className="field" />
          </div>
          <select name="Selected Course" required defaultValue={course || ''} className="field text-slate-600">
            <option value="">Select a course</option>
            {ENROLL_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <select name="I am a" className="field text-slate-600">
            <option value="">I am a…</option>
            <option>Student</option>
            <option>Fresh Graduate</option>
            <option>Working Professional</option>
            <option>Freelancer</option>
            <option>Business Owner / Entrepreneur</option>
            <option>Career Switcher</option>
          </select>
          <textarea name="Message" rows="2" placeholder="Anything you'd like us to know? (optional)" className="field" />
          <button type="submit" className="w-full bg-gold text-navy rounded-xl py-3.5 font-semibold hover:scale-[1.02] transition-transform">
            Submit Enrollment →
          </button>
          <p className="text-slate-400 text-xs text-center">By submitting you agree to be contacted by CreateWitty.</p>
        </form>
      </div>
    </div>
  )
}
