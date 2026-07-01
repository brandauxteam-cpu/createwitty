import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../lib/site.js'

/**
 * Central SEO component — sets title, meta description, canonical, robots,
 * Open Graph and Twitter tags, and optional JSON-LD structured data.
 *
 * Props:
 *  - title, description, canonical (path or full URL), image, type
 *  - noindex (bool) -> for admin/thank-you pages
 *  - jsonLd (object | array) -> structured data
 */
export default function Seo({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  jsonLd,
}) {
  const { pathname } = useLocation()
  const url = canonical
    ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
    : `${SITE_URL}${pathname}`
  const ogImage = image || `${SITE_URL}/og-default.jpg`

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="CreateWitty" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  )
}
