import Seo from '../components/Seo.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { ENROLL_OPTIONS } from '../data/courses.js'
import { FORM_ACTION, FORM_CC, DISPLAY_EMAIL, PHONE, PHONE_TEL, ADDRESS, HOURS, MAPS_EMBED, WHATSAPP_LINK, THANKYOU_URL } from '../lib/site.js'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const FAQS = [
  ['How soon will you respond?', 'We reply to all appointments and enquiries within 24 hours, usually much faster on WhatsApp.'],
  ['Is the counselling session really free?', 'Yes — it\'s a no-obligation call to understand your goals and recommend the right course. No payment required.'],
  ['Do you offer student discounts or EMI?', 'We offer scholarships and flexible EMI options for students. Mention it in your enquiry and we\'ll share details.'],
  ['Can I visit the Kothaguda campus?', 'Absolutely. Book an in-person appointment and we\'ll arrange a campus visit and demo class.'],
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact & Book Appointment | CreateWitty Hyderabad"
        description="Book a free counselling appointment or send a course enquiry to CreateWitty, Hyderabad's 100% online Digital Marketing academy in Kothaguda."
        canonical="/contact"
      />
      <Navbar solid />

      {/* HERO */}
      <header className="relative min-h-[70vh] w-full overflow-hidden bg-navy pt-14">
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
          <source src={VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(180deg,rgba(9,18,56,0.6),rgba(13,27,76,0.85) 60%,rgba(9,18,56,0.95))' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20 pb-24">
          <div className="animate-fade-rise inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90 mb-7">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> We reply within 24 hours
          </div>
          <h1 className="animate-fade-rise d1 font-display font-bold text-white leading-tight text-4xl sm:text-6xl">Let's plan your <span className="text-gradient-gold">next move.</span></h1>
          <p className="animate-fade-rise d2 text-white/80 text-lg max-w-2xl mx-auto mt-6">Book a free counselling appointment, send a course enquiry, or just say hello. Our team in Kothaguda is ready to help you choose the right path.</p>
        </div>
      </header>

      {/* QUICK CONTACT */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid sm:grid-cols-3 gap-5">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform flex items-center gap-4"><span className="text-3xl">💬</span><div><div className="font-semibold text-navy">WhatsApp</div><div className="text-slate-500 text-sm">Chat instantly</div></div></a>
          <a href={`tel:${PHONE_TEL}`} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform flex items-center gap-4"><span className="text-3xl">📞</span><div><div className="font-semibold text-navy">Call Us</div><div className="text-slate-500 text-sm">{PHONE}</div></div></a>
          <a href={`mailto:${DISPLAY_EMAIL}`} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform flex items-center gap-4"><span className="text-3xl">✉️</span><div><div className="font-semibold text-navy">Email</div><div className="text-slate-500 text-sm">Send a message</div></div></a>
        </div>
      </section>

      {/* FORMS */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-8">
        {/* Appointment */}
        <Reveal className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <p className="text-royal font-semibold uppercase text-xs tracking-wide">Book Appointment</p>
          <h2 className="font-display font-bold text-navy text-2xl sm:text-3xl mt-2">Free Counselling Session</h2>
          <p className="text-slate-500 mt-2 text-sm">Pick a preferred slot — we'll confirm by call/WhatsApp.</p>
          <form action={FORM_ACTION} method="POST" className="mt-6 space-y-4">
            <input type="hidden" name="_subject" value="New Appointment Booking 📅 — CreateWitty" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />
            {FORM_CC && <input type="hidden" name="_cc" value={FORM_CC} />}
            <input type="hidden" name="_next" value={THANKYOU_URL} />
            <input type="hidden" name="Form Type" value="Appointment Booking" />
            <input type="text" name="Full Name" required placeholder="Full name" className="field" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="email" name="Email" required placeholder="Email" className="field" />
              <input type="tel" name="Phone / WhatsApp" required pattern="[0-9]{10}" maxLength={10} inputMode="numeric" title="Please enter a 10-digit mobile number" placeholder="Phone (10 digits)" className="field" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="date" name="Preferred Date" className="field text-slate-600" />
              <select name="Preferred Time" className="field text-slate-600">
                <option value="">Preferred time</option>
                <option>Morning (10am–12pm)</option>
                <option>Afternoon (12pm–4pm)</option>
                <option>Evening (4pm–8pm)</option>
              </select>
            </div>
            <select name="Mode" className="field text-slate-600">
              <option value="">Mode of session</option>
              <option>Online (Google Meet / Zoom)</option>
              <option>In-person (Kothaguda)</option>
              <option>Phone call</option>
            </select>
            <textarea name="Goals" rows="2" placeholder="What do you want to achieve? (optional)" className="field" />
            <button type="submit" className="w-full bg-navy text-white rounded-xl py-3.5 font-semibold hover:bg-navy-deep transition-colors">Book My Free Session →</button>
          </form>
        </Reveal>

        {/* Enquiry */}
        <Reveal className="bg-navy text-white rounded-3xl p-8 shadow-sm">
          <p className="text-gold font-semibold uppercase text-xs tracking-wide">Course Enquiry</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl mt-2">Ask About a Course</h2>
          <p className="text-white/65 mt-2 text-sm">Tell us what you're curious about and we'll send full details.</p>
          <form action={FORM_ACTION} method="POST" className="mt-6 space-y-4">
            <input type="hidden" name="_subject" value="New Course Enquiry 🎓 — CreateWitty" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />
            {FORM_CC && <input type="hidden" name="_cc" value={FORM_CC} />}
            <input type="hidden" name="_next" value={THANKYOU_URL} />
            <input type="hidden" name="Form Type" value="Course Enquiry" />
            <input type="text" name="Full Name" required placeholder="Full name" className="field bg-white/10 border-white/20 text-white placeholder-white/50" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="email" name="Email" required placeholder="Email" className="field bg-white/10 border-white/20 text-white placeholder-white/50" />
              <input type="tel" name="Phone / WhatsApp" required pattern="[0-9]{10}" maxLength={10} inputMode="numeric" title="Please enter a 10-digit mobile number" placeholder="Phone (10 digits)" className="field bg-white/10 border-white/20 text-white placeholder-white/50" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10) }} />
            </div>
            <select name="Course" required className="field bg-white/10 border-white/20 text-white" defaultValue="">
              <option value="" className="text-navy">Course you're interested in</option>
              {ENROLL_OPTIONS.map((o) => <option key={o} className="text-navy">{o}</option>)}
            </select>
            <select name="Batch Preference" className="field bg-white/10 border-white/20 text-white" defaultValue="">
              <option value="" className="text-navy">Batch preference</option>
              <option className="text-navy">Online — Weekday</option>
              <option className="text-navy">Online — Weekend</option>
            </select>
            <textarea name="Message" rows="2" placeholder="Your question (optional)" className="field bg-white/10 border-white/20 text-white placeholder-white/50" />
            <button type="submit" className="w-full bg-gold text-navy rounded-xl py-3.5 font-semibold hover:scale-[1.02] transition-transform">Send Enquiry →</button>
          </form>
        </Reveal>
      </section>

      {/* WHATSAPP BANNER */}
      <section className="px-6 pb-20">
        <Reveal className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-[#1f8f4a] to-[#25D366] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl">Prefer to chat? Message us on WhatsApp.</h3>
            <p className="text-white/90 mt-2">Get instant answers about courses, fees, batches and scholarships.</p>
          </div>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-white text-[#1f8f4a] font-semibold rounded-full px-8 py-4 hover:scale-[1.03] transition-transform whitespace-nowrap">Chat on WhatsApp →</a>
        </Reveal>
      </section>

      {/* MAP + DETAILS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
          <Reveal className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 min-h-[340px]">
            <iframe title="CreateWitty — Kothaguda, Hyderabad" src={MAPS_EMBED} width="100%" height="100%" style={{ border: 0, minHeight: '340px' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </Reveal>
          <Reveal>
            <p className="text-royal font-semibold uppercase text-xs tracking-wide">Visit Us</p>
            <h2 className="font-display font-bold text-navy text-3xl mt-2">Find CreateWitty in Kothaguda</h2>
            <div className="gold-line mt-5" />
            <div className="mt-8 space-y-6">
              <div className="flex gap-4"><span className="text-2xl">📍</span><div><h3 className="font-semibold text-navy">Address</h3><p className="text-slate-500">{ADDRESS}</p></div></div>
              <div className="flex gap-4"><span className="text-2xl">🕘</span><div><h3 className="font-semibold text-navy">Hours</h3><p className="text-slate-500">{HOURS}</p></div></div>
              <div className="flex gap-4"><span className="text-2xl">📞</span><div><h3 className="font-semibold text-navy">Phone / WhatsApp</h3><p className="text-slate-500">{PHONE}</p></div></div>
              <div className="flex gap-4"><span className="text-2xl">✉️</span><div><h3 className="font-semibold text-navy">Email</h3><p className="text-slate-500">{FORM_EMAIL}</p></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center">
            <p className="text-royal font-semibold uppercase text-xs tracking-wide">FAQ</p>
            <h2 className="font-display font-bold text-navy text-3xl sm:text-4xl mt-2">Before you reach out</h2>
            <div className="gold-line mx-auto mt-5" />
          </Reveal>
          <div className="mt-10 space-y-4">
            {FAQS.map(([q, a]) => (
              <details key={q} className="bg-white rounded-2xl p-6 border border-slate-100">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-navy list-none">{q}<span className="faq-icon text-royal text-2xl">+</span></summary>
                <p className="text-slate-500 mt-4">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
