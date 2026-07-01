import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import ScrollProgress from '../components/ScrollProgress.jsx'
import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import CourseModal from '../components/CourseModal.jsx'
import { COURSES } from '../data/courses.js'
import { useEnroll } from '../context/EnrollContext.jsx'
import { listPublished, slugify } from '../lib/posts.js'
import { SITE_URL, LOGO } from '../lib/site.js'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const BENEFITS = [
  ['💻', '100% Live Online', 'Interactive, instructor-led classes you join from anywhere.'],
  ['🛠️', 'Real Client Projects', 'Practical assignments & live project experience.'],
  ['🤖', 'AI-Powered Tools', 'Work faster with the latest AI marketing workflows.'],
  ['♾️', 'Lifetime Resources*', 'Session recordings & learning material access.'],
  ['❓', 'Weekly Doubt-Clearing', 'Dedicated weekly sessions to unblock you.'],
  ['📄', 'Resume & Portfolio', 'Build a portfolio & a recruiter-ready resume.'],
  ['🎤', 'Mock Interviews', 'HR & technical mock interviews to build confidence.'],
  ['💼', 'Internship + Job Help', 'Internship opportunity & job assistance.*'],
]

const MENTORS = [
  { name: 'Sagar Dutt', role: 'Lead Digital Marketing Trainer', since: '2014', photo: '/mentors/sagar.jpg', linkedin: 'https://www.linkedin.com/in/sagardutt15/', bio: 'A digital marketing trainer and practitioner since 2017, helping learners master strategy, advertising and growth.', skills: ['Digital Strategy', 'Google Ads', 'Social Media', 'Branding'] },
  { name: 'Paraag Choudhary', role: 'Performance Marketing & Ads Mentor', since: '2015', photo: '/mentors/paraag.jpg', linkedin: 'https://www.linkedin.com/in/paraag-c-5a199b112/', bio: 'Performance marketer and mentor since 2018, focused on paid campaigns, funnels and measurable ROI.', skills: ['Meta Ads', 'Google Ads', 'Analytics', 'CRO'] },
  { name: 'Pranith Kumar Gorityala', role: 'SEO, Web & AI Marketing Mentor', since: '2022', photo: '/mentors/pranith.jpg', linkedin: 'https://www.linkedin.com/in/pranith-kumar-gorityala/', bio: 'SEO, web and AI-marketing mentor since 2022, teaching modern search, GEO and AI-powered workflows.', skills: ['SEO / GEO', 'AI Tools', 'WordPress', 'Content'] },
]

const RECOGNITIONS = ['Google Ads', 'Meta Blueprint', 'Google GA4', 'HubSpot', 'Google Digital Garage', 'CreateWitty Certified']
const PARTNERS = [
  { name: 'ISB', logo: '/partners/isb.svg' },
  { name: 'Deloitte', logo: '/partners/deloitte.svg' },
  { name: 'Wipro', logo: '/partners/wipro.svg' },
  { name: 'Cognizant', logo: '/partners/cognizant.svg' },
  { name: 'Accenture', logo: '/partners/accenture.svg' },
  { name: 'Incorvia', logo: '/partners/incorvia.svg' },
  { name: 'iPac', logo: '/partners/ipac.svg' },
  { name: 'Google', logo: '/partners/google.png' },
]
const AUDIENCE = ['🎓 Students', '🪄 Fresh Graduates', '💼 Working Professionals', '🏢 Business Owners', '🚀 Entrepreneurs', '🧑‍💻 Freelancers', '🔁 Career Switchers', '📈 Marketing Professionals']

const FAQS = [
  ['Are the classes 100% online?', 'Yes — all programs are 100% live, interactive, instructor-led online sessions. Learn from anywhere, with session recordings and weekly doubt-clearing.'],
  ['Do you provide internship & job assistance?', 'Every program includes an internship opportunity, live project experience, resume & LinkedIn optimization, mock interviews and job assistance — subject to performance and eligibility.'],
  ['What are the fees and durations?', 'Package 1 — ₹14,990 (8 weeks). Package 2 — ₹19,990 (9 weeks). Package 3 — ₹24,990 (11 weeks). Tap "More Info" on any course for the full breakdown.'],
  ['Will I get a certificate?', 'Yes — an industry-recognized Course Completion Certificate, plus preparation for Google, Meta and other certifications.'],
  ['How do I enroll?', 'Click any "Join Course" or "Join" button to open the enrollment form, or book a free counselling call from the contact page. We\'ll confirm within 24 hours.'],
]

const JSON_LD = [
  {
    '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: 'CreateWitty',
    description: '100% online Digital Marketing certification academy in Hyderabad.',
    url: SITE_URL, email: 'pranith.gorityala49@gmail.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Kothaguda', addressRegion: 'Telangana', addressCountry: 'IN' },
  },
  {
    '@context': 'https://schema.org', '@type': 'ItemList',
    itemListElement: COURSES.map((c) => ({
      '@type': 'Course', name: c.fullTitle, provider: { '@type': 'Organization', name: 'CreateWitty' },
      offers: { '@type': 'Offer', price: c.price.replace(/[₹,]/g, ''), priceCurrency: 'INR', category: 'Online Course' },
    })),
  },
  {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
]

export default function Home() {
  const { openEnroll } = useEnroll()
  const [activeCourse, setActiveCourse] = useState(null)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    listPublished('blog', 3).then(setRecent).catch(() => {})
  }, [])

  return (
    <>
      <Seo
        title="CreateWitty | 100% Online Digital Marketing Courses in Hyderabad (SEO, Google Ads, AI)"
        description="CreateWitty offers 100% live online Digital Marketing certification programs in Hyderabad (Kothaguda). Master SEO/GEO, Google Ads, Meta Ads, Social Media, AI Marketing, Neuromarketing & Branding. Real projects, internship & job assistance. Fees from ₹14,990."
        canonical="/"
        jsonLd={JSON_LD}
      />
      <ScrollProgress />
      <Navbar />

      {/* HERO */}
      <header className="relative min-h-screen w-full overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
          <source src={VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(180deg,rgba(9,18,56,0.55),rgba(13,27,76,0.7) 50%,rgba(9,18,56,0.94))' }} />

        <nav className="relative z-10 max-w-8xl mx-auto px-5 sm:px-8 pt-5">
          <div className="glass-nav rounded-2xl flex items-center justify-between px-5 sm:px-7 py-4">
            <Link to="/" className="flex items-center">
              <img src={LOGO} alt="CreateWitty" className="h-9 sm:h-11 w-auto" />
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-sm text-white/75">
              <a href="#home" className="text-white font-medium">Home</a>
              <a href="#courses" className="hover:text-white transition-colors">Courses</a>
              <a href="#benefits" className="hover:text-white transition-colors">Benefits</a>
              <a href="#mentors" className="hover:text-white transition-colors">Mentors</a>
              <a href="#placements" className="hover:text-white transition-colors">Placements</a>
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/contact" className="hidden sm:inline-flex liquid-glass rounded-full px-5 py-2.5 text-sm text-white font-medium hover:scale-[1.03] transition-transform">Contact</Link>
              <button onClick={() => openEnroll('')} className="bg-gold text-navy rounded-full px-5 py-2.5 text-sm font-semibold hover:scale-[1.03] transition-transform shadow-lg shadow-gold/30">Join Course</button>
            </div>
          </div>
        </nav>

        <div id="home" className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 sm:pt-24 pb-28">
          <div className="animate-fade-rise inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90 mb-7">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" /> 100% Live Online • Learn from Anywhere • Hyderabad
          </div>
          <h1 className="animate-fade-rise d1 text-white font-display font-bold leading-[1.04] tracking-tight text-4xl sm:text-6xl md:text-7xl">
            Learn from anywhere.
            <span className="block text-gradient-gold mt-2">Build a career everywhere.</span>
          </h1>
          <p className="animate-fade-rise d2 text-white/80 text-base sm:text-lg max-w-2xl mx-auto mt-7 leading-relaxed">
            100% live online Digital Marketing certification programs for students, graduates, professionals, freelancers &amp; business owners. Real client projects, AI-powered tools, internship &amp; job assistance — all from home.
          </p>
          <div className="animate-fade-rise d3 flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button onClick={() => openEnroll('')} className="bg-gold text-navy rounded-full px-9 py-4 text-base font-semibold hover:scale-[1.03] transition-transform shadow-xl shadow-gold/30 w-full sm:w-auto">Join a Course →</button>
            <a href="#courses" className="liquid-glass rounded-full px-9 py-4 text-base text-white font-medium hover:scale-[1.03] transition-transform w-full sm:w-auto">View Programs</a>
          </div>
          <div className="animate-fade-rise d4 grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-14">
            <div className="text-center"><div className="text-2xl sm:text-4xl font-extrabold text-white"><CountUp to={800} suffix="+" /></div><div className="text-xs sm:text-sm text-white/65 mt-1">Learners Trained</div></div>
            <div className="text-center border-x border-white/15"><div className="text-2xl sm:text-4xl font-extrabold text-white"><CountUp to={90} suffix="%" /></div><div className="text-xs sm:text-sm text-white/65 mt-1">Job Assistance</div></div>
            <div className="text-center"><div className="text-2xl sm:text-4xl font-extrabold text-white">4.9<span className="text-gold">★</span></div><div className="text-xs sm:text-sm text-white/65 mt-1">Learner Rating</div></div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 py-5 overflow-hidden">
          <div className="marquee text-white/45 text-sm uppercase tracking-[0.2em] font-medium">
            {['SEO / GEO', 'Google Ads', 'Meta Ads', 'Social Media', 'AI Marketing', 'Neuromarketing', 'Brand Management'].concat(['SEO / GEO', 'Google Ads', 'Meta Ads', 'Social Media', 'AI Marketing', 'Neuromarketing', 'Brand Management']).map((t, i) => (
              <span key={i}>{t}<span className="mx-6">•</span></span>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* BENEFITS */}
        <section id="benefits" className="bg-mist py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="text-royal font-semibold tracking-wide uppercase text-sm">Why Choose Our Online Training</p>
              <h2 className="font-display font-bold text-navy text-3xl sm:text-5xl mt-3 leading-tight">Everything you need to go from learner to hired.</h2>
              <div className="gold-line mx-auto mt-7" />
            </Reveal>
            <Reveal variant="stagger" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
              {BENEFITS.map(([icon, title, desc]) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover">
                  <div className="text-3xl mb-3">{icon}</div>
                  <h3 className="font-semibold text-navy">{title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{desc}</p>
                </div>
              ))}
            </Reveal>
            <p className="text-center text-slate-400 text-xs mt-8">*Subject to performance, attendance, assessment results, eligibility &amp; hiring-partner requirements.</p>
          </div>
        </section>

        {/* COURSES */}
        <section id="courses" className="bg-white py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="text-royal font-semibold tracking-wide uppercase text-sm">Certification Programs</p>
              <h2 className="font-display font-bold text-navy text-3xl sm:text-5xl mt-3">Choose the program that fits your goals.</h2>
              <p className="text-slate-500 mt-5 text-lg">Three structured, career-focused paths. See the highlights, then tap <strong>More Info</strong> for the full curriculum.</p>
              <div className="gold-line mx-auto mt-7" />
            </Reveal>
            <div className="grid lg:grid-cols-3 gap-8 mt-16 items-start">
              {COURSES.map((c) => (
                <article key={c.id} className={`card-hover rounded-3xl p-8 flex flex-col ${c.highlight ? 'bg-navy text-white relative shadow-2xl lg:scale-[1.04] lg:-mt-2' : 'border border-slate-200 bg-mist'}`}>
                  {c.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${c.highlight ? 'text-gold' : 'text-royal'}`}>{c.tag}</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${c.highlight ? 'bg-white/10 text-white' : 'bg-navy/5 text-navy'}`}>{c.meta}</span>
                  </div>
                  <h3 className={`font-display font-bold text-2xl mt-4 ${c.highlight ? 'text-gradient-gold' : 'text-navy'}`}>{c.title}</h3>
                  <div className="mt-4 flex items-end gap-2">
                    <span className={`text-4xl font-extrabold ${c.highlight ? '' : 'text-navy'}`}>{c.price}</span>
                    <span className={`text-sm mb-1 ${c.highlight ? 'text-white/50' : 'text-slate-400'}`}>100% Online</span>
                  </div>
                  <ul className={`mt-6 space-y-3 text-sm flex-1 ${c.highlight ? 'text-white/85' : 'text-slate-600'}`}>
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2"><span className={c.highlight ? 'text-gold' : 'text-royal'}>✓</span> {p}</li>
                    ))}
                  </ul>
                  <div className="mt-7 flex gap-3">
                    <button onClick={() => setActiveCourse(c)} className={`flex-1 rounded-full py-3 font-semibold transition-colors ${c.highlight ? 'border border-white/40 text-white hover:bg-white/10' : 'border border-navy text-navy hover:bg-navy hover:text-white'}`}>More Info</button>
                    <button onClick={() => openEnroll(c.enrollValue)} className={`flex-1 rounded-full py-3 font-semibold transition-transform ${c.highlight ? 'bg-gold text-navy hover:scale-[1.02]' : 'bg-navy text-white hover:bg-navy-deep'}`}>Join</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-navy py-24 px-6 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-royal/20 rounded-full blur-3xl float" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl float" style={{ animationDelay: '1.5s' }} />
          <div className="max-w-5xl mx-auto relative z-10">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="text-gold font-semibold tracking-wide uppercase text-sm">How It Works</p>
              <h2 className="font-display font-bold text-white text-3xl sm:text-5xl mt-3">Your journey, week by week.</h2>
            </Reveal>
            <Reveal variant="stagger" className="grid md:grid-cols-4 gap-6 mt-16">
              {[['01', 'Enroll & Onboard', 'Pick a program, join your live cohort.'], ['02', 'Learn Live', 'Instructor-led classes + weekly assignments.'], ['03', 'Build Projects', 'Real client work + AI-powered campaigns.'], ['04', 'Get Hired', 'Internship, mock interviews & job assistance.']].map(([n, t, d], i) => (
                <div key={n} className="glass-card rounded-3xl p-7 text-center">
                  <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-xl font-bold ${i % 2 ? 'bg-royal text-white' : 'bg-gold text-navy'}`}>{n}</div>
                  <h3 className="text-white font-semibold mt-5">{t}</h3>
                  <p className="text-white/65 text-sm mt-2">{d}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* MENTORS */}
        <section id="mentors" className="bg-mist py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="text-royal font-semibold tracking-wide uppercase text-sm">Meet Your Mentors</p>
              <h2 className="font-display font-bold text-navy text-3xl sm:text-5xl mt-3">Learn from people who do this every day.</h2>
              <div className="gold-line mx-auto mt-7" />
            </Reveal>
            <Reveal variant="stagger" className="grid md:grid-cols-3 gap-8 mt-16">
              {MENTORS.map((m) => (
                <div key={m.name} className="card-hover bg-white rounded-3xl p-8 border border-slate-100 text-center">
                  <img src={m.photo} alt={m.name} className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-mist shadow" loading="lazy" />
                  <h3 className="font-semibold text-xl text-navy mt-5">{m.name}</h3>
                  <p className="text-royal text-sm font-medium">{m.role}</p>
                  <p className="text-slate-400 text-xs mt-1">Training since {m.since}</p>
                  <p className="text-slate-500 text-sm mt-3">{m.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-5">
                    {m.skills.map((s) => <span key={s} className="text-xs bg-navy/5 text-navy px-3 py-1 rounded-full">{s}</span>)}
                  </div>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="inline-flex items-center gap-2 mt-5 text-[#0A66C2] font-medium text-sm hover:underline">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
                    LinkedIn
                  </a>
                </div>
              ))}
            </Reveal>
            
        </section>

        {/* RECOGNITIONS */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="text-royal font-semibold tracking-wide uppercase text-sm">Recognitions &amp; Certifications</p>
              <h2 className="font-display font-bold text-navy text-3xl sm:text-4xl mt-3">Skills that the industry actually recognises.</h2>
              <p className="text-slate-500 mt-4">Prepare for and work towards globally respected certifications during your program.</p>
            </Reveal>
            <Reveal variant="stagger" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
              {RECOGNITIONS.map((r) => (
                <div key={r} className="rounded-2xl border border-slate-100 bg-mist py-6 px-3 text-center font-semibold text-navy text-sm card-hover">{r}</div>
              ))}
            </Reveal>
            
        </section>

        {/* PLACEMENTS */}
        <section id="placements" className="bg-navy py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-royal/15 rounded-full blur-3xl" />
          <div className="max-w-6xl mx-auto relative z-10">
            <Reveal className="text-center max-w-3xl mx-auto">
              <p className="text-gold font-semibold tracking-wide uppercase text-sm">Our Network</p>
              <h2 className="font-display font-bold text-white text-3xl sm:text-5xl mt-3">Learn the skills leading brands hire for.</h2>
              <p className="text-white/70 mt-4">From global consulting firms to fast-growing startups — our training is built around what top companies actually look for.</p>
            </Reveal>
            <Reveal variant="stagger" className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {PARTNERS.map((p) => (
                <div key={p.name} className="bg-white rounded-2xl h-24 flex items-center justify-center p-5">
                  <img src={p.logo} alt={p.name} className="max-h-10 w-auto max-w-full object-contain" />
                </div>
              ))}
            </Reveal>
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
              <div className="text-center"><div className="text-4xl font-extrabold text-gradient-gold"><CountUp to={92} suffix="%" /></div><p className="text-white/65 text-sm mt-2">Job assistance rate*</p></div>
              <div className="text-center border-x border-white/15"><div className="text-4xl font-extrabold text-white"><CountUp to={40} suffix="+" /></div><p className="text-white/65 text-sm mt-2">Hiring partners</p></div>
              <div className="text-center"><div className="text-4xl font-extrabold text-gradient-royal"><CountUp to={4800} suffix="+" /></div><p className="text-white/65 text-sm mt-2">Learners trained</p></div>
            </div>
            <p className="text-center text-white/40 text-xs mt-8">*Job assistance is subject to performance &amp; eligibility.</p>
          </div>
        </section>

        {/* WHO CAN JOIN */}
        <section className="bg-mist py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal>
              <p className="text-royal font-semibold tracking-wide uppercase text-sm">Who Can Join?</p>
              <h2 className="font-display font-bold text-navy text-3xl sm:text-5xl mt-3">Built for anyone ready to grow.</h2>
              <div className="gold-line mx-auto mt-7" />
            </Reveal>
            <Reveal variant="stagger" className="flex flex-wrap justify-center gap-3 mt-12">
              {AUDIENCE.map((a) => (
                <span key={a} className="bg-white border border-slate-200 rounded-full px-6 py-3 font-medium text-navy card-hover">{a}</span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* RECENT BLOG */}
        {recent.length > 0 && (
          <section className="bg-white py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <Reveal className="flex items-end justify-between flex-wrap gap-4">
                <div>
                  <p className="text-royal font-semibold tracking-wide uppercase text-sm">From the Blog</p>
                  <h2 className="font-display font-bold text-navy text-3xl sm:text-4xl mt-3">Latest marketing insights.</h2>
                </div>
                <Link to="/blog" className="text-royal font-medium hover:underline">View all →</Link>
              </Reveal>
              <Reveal variant="stagger" className="grid md:grid-cols-3 gap-6 mt-12">
                {recent.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="card-hover bg-mist rounded-3xl overflow-hidden border border-slate-100 block">
                    {post.cover_image && <img src={post.cover_image} alt={post.cover_alt || post.title} className="w-full h-44 object-cover" loading="lazy" />}
                    <div className="p-6">
                      <h3 className="font-semibold text-navy text-lg">{post.title}</h3>
                      <p className="text-slate-500 text-sm mt-2 line-clamp-3">{post.excerpt}</p>
                      <span className="inline-block mt-4 text-royal text-sm font-medium">Read more →</span>
                    </div>
                  </Link>
                ))}
              </Reveal>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section id="faq" className="bg-mist py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center">
              <p className="text-royal font-semibold tracking-wide uppercase text-sm">FAQ</p>
              <h2 className="font-display font-bold text-navy text-3xl sm:text-5xl mt-3">Questions, answered.</h2>
              <div className="gold-line mx-auto mt-7" />
            </Reveal>
            <div className="mt-12 space-y-4">
              {FAQS.map(([q, a]) => (
                <details key={q} className="bg-white rounded-2xl p-6 border border-slate-100">
                  <summary className="flex justify-between items-center cursor-pointer font-semibold text-navy list-none">{q}<span className="faq-icon text-royal text-2xl">+</span></summary>
                  <p className="text-slate-500 mt-4">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-gradient-to-br from-navy via-navy to-navy-deep py-24 px-6 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-royal/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/15 rounded-full blur-3xl" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <Reveal>
              <h2 className="font-display font-bold text-white text-3xl sm:text-5xl leading-tight">Learn anytime. Learn anywhere.</h2>
              <p className="text-white/75 mt-5 text-lg">100% Online • Live Interactive Classes • Industry Experts • Practical Learning • Career-Focused Training.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
                <button onClick={() => openEnroll('')} className="bg-gold text-navy rounded-full px-9 py-4 font-semibold hover:scale-[1.03] transition-transform">Join a Course →</button>
                <Link to="/contact" className="liquid-glass rounded-full px-9 py-4 text-white font-medium hover:scale-[1.03] transition-transform">Book Free Counselling</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <CourseModal course={activeCourse} onClose={() => setActiveCourse(null)} />
    </>
  )
}
