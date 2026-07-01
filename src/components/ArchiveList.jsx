import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from './Seo.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import Reveal from './Reveal.jsx'
import { listPublished, readingTime } from '../lib/posts.js'
import { isSupabaseConfigured } from '../lib/supabaseClient.js'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Reusable listing page for both Blog and News.
export default function ArchiveList({ type, base, eyebrow, title, subtitle, seoTitle, seoDesc }) {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    listPublished(type, 100).then(setPosts).catch(() => setPosts([]))
  }, [type])

  return (
    <>
      <Seo title={seoTitle} description={seoDesc} canonical={`/${base}`} />
      <Navbar solid />

      <header className="bg-navy pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-royal/20 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-gold font-semibold tracking-wide uppercase text-sm">{eyebrow}</p>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl mt-3">{title}</h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">{subtitle}</p>
        </div>
      </header>

      <main className="bg-mist min-h-[50vh] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {posts === null && <p className="text-center text-slate-400">Loading…</p>}

          {posts && posts.length === 0 && (
            <div className="text-center text-slate-500 max-w-lg mx-auto">
              <div className="text-5xl mb-4">📝</div>
              <p className="font-semibold text-navy text-lg">No posts published yet.</p>
              <p className="mt-2 text-sm">
                {isSupabaseConfigured
                  ? 'Check back soon — new articles are on the way.'
                  : 'Connect Supabase and publish from the CMS to see posts here.'}
              </p>
            </div>
          )}

          {posts && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <Reveal key={post.id}>
                  <Link to={`/${base}/${post.slug}`} className="card-hover bg-white rounded-3xl overflow-hidden border border-slate-100 block h-full">
                    {post.cover_image
                      ? <img src={post.cover_image} alt={post.cover_alt || post.title} className="w-full h-48 object-cover" loading="lazy" />
                      : <div className="w-full h-48 bg-gradient-to-br from-navy to-royal" />}
                    <div className="p-6">
                      <div className="text-xs text-slate-400">{formatDate(post.published_at)} • {readingTime(post.body)} min read</div>
                      <h2 className="font-semibold text-navy text-lg mt-2">{post.title}</h2>
                      <p className="text-slate-500 text-sm mt-2 line-clamp-3">{post.excerpt}</p>
                      <span className="inline-block mt-4 text-royal text-sm font-medium">Read more →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
