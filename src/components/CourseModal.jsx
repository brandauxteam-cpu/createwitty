import { useEffect } from 'react'
import { useEnroll } from '../context/EnrollContext.jsx'

// Shows the full curriculum for a course. `course` is a COURSES entry (or null).
export default function CourseModal({ course, onClose }) {
  const { openEnroll } = useEnroll()

  useEffect(() => {
    document.body.classList.toggle('modal-lock', Boolean(course))
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('modal-lock') }
  }, [course, onClose])

  if (!course) return null

  const join = () => { onClose(); setTimeout(() => openEnroll(course.enrollValue), 120) }

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={course.fullTitle}>
      <div className="modal-panel bg-white rounded-3xl my-8 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-navy text-white p-7 relative">
          <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 text-white/70 hover:text-white text-2xl leading-none">&times;</button>
          <span className="text-xs uppercase tracking-wide text-gold font-semibold">{course.tag} • {course.meta}</span>
          <h3 className="font-display font-bold text-2xl mt-2">{course.fullTitle}</h3>
          <div className="text-3xl font-extrabold mt-3">{course.price} <span className="text-white/50 text-sm font-normal">• 100% Online</span></div>
        </div>
        <div className="p-7">
          {course.note && (
            <div className="bg-mist rounded-xl p-4 text-sm text-navy font-medium">{course.note}</div>
          )}
          {course.sections.map((sec) => (
            <div key={sec.heading} className={course.note ? 'mt-5' : ''}>
              <h4 className="font-semibold text-navy">{sec.heading}</h4>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-3 text-sm text-slate-600">
                {sec.items.map((it) => (
                  <span key={it}>✓ {it}</span>
                ))}
              </div>
            </div>
          ))}
          <p className="text-slate-400 text-xs mt-4">*Job assistance subject to meeting eligibility criteria.</p>
          <button onClick={join} className="w-full mt-6 bg-gold text-navy rounded-xl py-3.5 font-semibold hover:scale-[1.02] transition-transform">
            Join This Course →
          </button>
        </div>
      </div>
    </div>
  )
}
