import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Seo from './Seo.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import RichContent from './RichContent.jsx'
import { getBySlug, readingTime } from '../lib/posts.js'
import { SITE_URL } from '../lib/site.js'

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Reusable single-article page for Blog and News.
export default function ArticleView({ type, base, backLabel }) {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    getBySlug(type, slug).then((p) => setPost(p ?? null)).catch(() => setPost(null))
  }, [type, slug])

  if (post === undefined) {
    return (
      <>
        <Navbar solid />
        <div className="min-h-screen flex items-center justify-center text-slate-400">Loading…</div>
      </>
    )
  }

  if (post === null) {
    return (
      <>
        <Seo title="Article not found | CreateWitty" noindex />
        <Navbar solid />
        <div className="min-h-screen bg-mist flex items-center justify-center px-6 text-center">
          <div>
            <div className="font-display font-bold text-navy text-5xl">Not found</div>
            <p className="text-slate-500 mt-4">This article doesn't exist or hasn't been published.</p>
            <Link to={`/${base}`} className="inline-block mt-8 bg-navy text-white rounded-full px-8 py-3.5 font-semibold hover:bg-navy-deep transition-colors">{backLabel}</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const canonical = post.canonical_url || `${SITE_URL}/${base}/${post.slug}`
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': type === 'news' ? 'NewsArticle' : 'BlogPosting',
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    image: post.cover_image ? [post.cover_image] : undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { '@type': 'Organization', name: post.author || 'CreateWitty' },
    publisher: { '@type': 'Organization', name: 'CreateWitty' },
    mainEntityOfPage: canonical,
  }

  return (
    <>
      <Seo
        title={post.meta_title || `${post.title} | CreateWitty`}
        description={post.meta_description || post.excerpt}
        canonical={canonical}
        image={post.cover_image}
        type="article"
        jsonLd={articleLd}
      />
      <Navbar solid />

      <article className="bg-white pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to={`/${base}`} className="text-royal text-sm font-medium hover:underline">← {backLabel}</Link>
          <div className="text-xs text-slate-400 mt-6">{formatDate(post.published_at)} • {readingTime(post.body)} min read</div>
          <h1 className="font-display font-bold text-navy text-3xl sm:text-5xl mt-3 leading-tight">{post.title}</h1>
          {post.excerpt && <p className="text-slate-500 text-lg mt-4">{post.excerpt}</p>}
          {post.cover_image && (
            <img src={post.cover_image} alt={post.cover_alt || post.title} className="w-full rounded-3xl mt-8 object-cover" loading="lazy" />
          )}
          <div className="mt-10">
            <RichContent html={post.body} />
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
