/**
 * Generates public/sitemap.xml from your static routes + published posts.
 * Run with:  npm run sitemap   (needs VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env)
 * Then rebuild:  npm run build
 */
import { createClient } from '@supabase/supabase-js'
import { writeFileSync, readFileSync, existsSync } from 'node:fs'

// Load .env manually (no dependency needed)
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const SITE = (process.env.VITE_SITE_URL || 'https://www.createwitty.com').replace(/\/$/, '')
const staticRoutes = ['/', '/contact', '/blog', '/news']

let posts = []
const url = process.env.VITE_SUPABASE_URL
const key = process.env.VITE_SUPABASE_ANON_KEY
if (url && key && !url.includes('YOUR-PROJECT')) {
  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from('posts')
    .select('type, slug, published_at')
    .eq('status', 'published')
  if (error) console.warn('Supabase fetch failed:', error.message)
  else posts = data || []
}

const urls = [
  ...staticRoutes.map((r) => ({ loc: SITE + r, lastmod: null })),
  ...posts.map((p) => ({ loc: `${SITE}/${p.type}/${p.slug}`, lastmod: p.published_at })),
]

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${new Date(u.lastmod).toISOString().slice(0, 10)}</lastmod>` : ''}\n  </url>`)
    .join('\n') +
  `\n</urlset>\n`

writeFileSync('public/sitemap.xml', xml)
console.log(`✓ Wrote public/sitemap.xml with ${urls.length} URLs`)
