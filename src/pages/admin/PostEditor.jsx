import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import Seo from '../../components/Seo.jsx'
import { getById, createPost, updatePost, uploadImage, slugify } from '../../lib/posts.js'
import { SITE_URL } from '../../lib/site.js'

const EMPTY = {
  type: 'blog',
  title: '',
  slug: '',
  excerpt: '',
  cover_image: '',
  cover_alt: '',
  meta_title: '',
  meta_description: '',
  canonical_url: '',
  body: '',
  author: 'CreateWitty',
  status: 'draft',
}

function CharCount({ value, ideal }) {
  const len = (value || '').length
  const color = len === 0 ? 'text-slate-400' : len <= ideal ? 'text-green-600' : 'text-amber-600'
  return <span className={`text-xs ${color}`}>{len}/{ideal} chars</span>
}

export default function PostEditor() {
  const { id } = useParams()
  const editing = Boolean(id)
  const navigate = useNavigate()
  const quillRef = useRef(null)

  const [form, setForm] = useState(EMPTY)
  const [slugEdited, setSlugEdited] = useState(false)
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!editing) return
    getById(id)
      .then((d) => { if (d) { setForm({ ...EMPTY, ...d }); setSlugEdited(true) } })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id, editing])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onTitle = (e) => {
    const title = e.target.value
    setForm((f) => ({ ...f, title, slug: slugEdited ? f.slug : slugify(title) }))
  }

  // ---- Rich text: upload images to Supabase and insert the URL ----
  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        const url = await uploadImage(file)
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection(true)
        editor.insertEmbed(range.index, 'image', url, 'user')
        editor.setSelection(range.index + 1)
      } catch (err) {
        alert('Image upload failed: ' + err.message)
      }
    }
    input.click()
  }, [])

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: { image: imageHandler },
    },
  }), [imageHandler])

  // ---- Cover image upload ----
  const onCover = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await uploadImage(file)
      setForm((f) => ({ ...f, cover_image: url }))
    } catch (err) {
      alert('Cover upload failed: ' + err.message)
    }
  }

  const save = async (publish) => {
    setError('')
    if (!form.title.trim()) { setError('Please add a title.'); return }
    if (!form.slug.trim()) { setError('Please add a URL slug.'); return }

    const status = publish ? 'published' : form.status
    const payload = {
      type: form.type,
      title: form.title.trim(),
      slug: slugify(form.slug),
      excerpt: form.excerpt.trim(),
      cover_image: form.cover_image || null,
      cover_alt: form.cover_alt.trim(),
      meta_title: form.meta_title.trim() || form.title.trim(),
      meta_description: form.meta_description.trim() || form.excerpt.trim(),
      canonical_url: form.canonical_url.trim() || null,
      body: form.body,
      author: form.author.trim() || 'CreateWitty',
      status,
    }
    if (status === 'published' && !form.published_at) {
      payload.published_at = new Date().toISOString()
    }

    setSaving(true)
    try {
      if (editing) await updatePost(id, payload)
      else await createPost(payload)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading…</div>

  const previewCanonical = form.canonical_url || `${SITE_URL}/${form.type}/${slugify(form.slug || form.title)}`

  return (
    <>
      <Seo title={`${editing ? 'Edit' : 'New'} Post | CreateWitty CMS`} noindex />
      <div className="min-h-screen bg-mist">
        <div className="bg-navy text-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/admin" className="text-white/80 hover:text-white text-sm">← Back to dashboard</Link>
            <span className="font-display font-bold">Create<span className="text-gold">Witty</span> CMS</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          <h1 className="font-display font-bold text-navy text-2xl">{editing ? 'Edit post' : 'New post'}</h1>

          {error && <p className="mt-4 text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl p-4">{error}</p>}

          <div className="grid lg:grid-cols-3 gap-8 mt-6">
            {/* MAIN */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-navy">Title (H1)</label>
                  <input value={form.title} onChange={onTitle} placeholder="Post title" className="field mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy">Excerpt / summary</label>
                  <textarea value={form.excerpt} onChange={set('excerpt')} rows="2" placeholder="Short summary shown on cards and search results" className="field mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy">Body</label>
                  <p className="text-xs text-slate-400 mb-2">Use the toolbar for headings, bold, links, bullet lists, images and video (paste a YouTube/Vimeo URL after clicking the video button).</p>
                  <ReactQuill ref={quillRef} theme="snow" value={form.body} onChange={(html) => setForm((f) => ({ ...f, body: html }))} modules={modules} />
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-5">
              {/* Publish box */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-navy">Type</label>
                  <select value={form.type} onChange={set('type')} className="field mt-1">
                    <option value="blog">Blog</option>
                    <option value="news">News</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-navy">Status</label>
                  <select value={form.status} onChange={set('status')} className="field mt-1">
                    <option value="draft">Draft (hidden)</option>
                    <option value="published">Published (live)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-navy">Author</label>
                  <input value={form.author} onChange={set('author')} className="field mt-1" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button disabled={saving} onClick={() => save(false)} className="flex-1 border border-navy text-navy rounded-xl py-2.5 font-semibold hover:bg-navy hover:text-white transition-colors disabled:opacity-60">Save draft</button>
                  <button disabled={saving} onClick={() => save(true)} className="flex-1 bg-gold text-navy rounded-xl py-2.5 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60">{saving ? 'Saving…' : 'Publish'}</button>
                </div>
              </div>

              {/* SEO box */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
                <h3 className="font-semibold text-navy">SEO settings</h3>
                <div>
                  <label className="text-sm font-medium text-navy">URL slug</label>
                  <input value={form.slug} onChange={(e) => { setSlugEdited(true); setForm((f) => ({ ...f, slug: e.target.value })) }} placeholder="my-post-url" className="field mt-1" />
                  <p className="text-xs text-slate-400 mt-1 break-all">{previewCanonical}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-navy">Meta title</label>
                    <CharCount value={form.meta_title} ideal={60} />
                  </div>
                  <input value={form.meta_title} onChange={set('meta_title')} placeholder="Defaults to the post title" className="field mt-1" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-navy">Meta description</label>
                    <CharCount value={form.meta_description} ideal={155} />
                  </div>
                  <textarea value={form.meta_description} onChange={set('meta_description')} rows="3" placeholder="Defaults to the excerpt" className="field mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-navy">Canonical URL (optional)</label>
                  <input value={form.canonical_url} onChange={set('canonical_url')} placeholder="Leave blank to use the default" className="field mt-1" />
                </div>
              </div>

              {/* Cover image box */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
                <h3 className="font-semibold text-navy">Cover image</h3>
                {form.cover_image && <img src={form.cover_image} alt={form.cover_alt || 'cover preview'} className="w-full h-36 object-cover rounded-xl" />}
                <input type="file" accept="image/*" onChange={onCover} className="text-sm" />
                <div>
                  <label className="text-sm font-medium text-navy">Image alt text (SEO)</label>
                  <input value={form.cover_alt} onChange={set('cover_alt')} placeholder="Describe the image" className="field mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
