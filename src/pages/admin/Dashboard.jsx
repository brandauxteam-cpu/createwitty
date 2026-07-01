import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { listAll, deletePost } from '../../lib/posts.js'

function StatusBadge({ status }) {
  const map = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-amber-100 text-amber-700',
  }
  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${map[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>
}

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    listAll()
      .then((d) => { setPosts(d); setError('') })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const remove = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return
    try { await deletePost(id); load() } catch (e) { alert(e.message) }
  }

  const logout = async () => { await signOut(); navigate('/admin/login') }

  const shown = posts.filter((p) => filter === 'all' || p.type === filter)

  return (
    <>
      <Seo title="CMS Dashboard | CreateWitty" noindex />
      <div className="min-h-screen bg-mist">
        {/* Top bar */}
        <div className="bg-navy text-white">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl font-bold">Create<span className="text-gold">Witty</span> CMS</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="hidden sm:inline text-white/60">{user?.email}</span>
              <Link to="/" className="text-white/80 hover:text-white">View site ↗</Link>
              <button onClick={logout} className="bg-white/10 hover:bg-white/20 rounded-full px-4 py-1.5">Log out</button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display font-bold text-navy text-2xl">Posts</h1>
              <p className="text-slate-500 text-sm mt-1">Create and manage blog articles &amp; news announcements.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white border border-slate-200 rounded-full p-1 text-sm">
                {['all', 'blog', 'news'].map((f) => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full capitalize ${filter === f ? 'bg-navy text-white' : 'text-slate-500'}`}>{f}</button>
                ))}
              </div>
              <Link to="/admin/new" className="bg-gold text-navy rounded-full px-5 py-2.5 font-semibold hover:scale-[1.03] transition-transform">+ New Post</Link>
            </div>
          </div>

          {error && <p className="mt-6 text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl p-4">Error: {error}</p>}

          <div className="mt-8 bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {loading ? (
              <p className="p-8 text-center text-slate-400">Loading…</p>
            ) : shown.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <div className="text-4xl mb-3">🗂️</div>
                <p className="font-semibold text-navy">No posts yet.</p>
                <p className="text-sm mt-1">Click “New Post” to write your first article.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-mist text-slate-500 text-left">
                  <tr>
                    <th className="px-5 py-3 font-medium">Title</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">Type</th>
                    <th className="px-5 py-3 font-medium hidden sm:table-cell">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shown.map((p) => (
                    <tr key={p.id} className="border-t border-slate-100">
                      <td className="px-5 py-4">
                        <div className="font-medium text-navy">{p.title}</div>
                        <div className="text-slate-400 text-xs">/{p.type}/{p.slug}</div>
                      </td>
                      <td className="px-5 py-4 capitalize hidden sm:table-cell">{p.type}</td>
                      <td className="px-5 py-4 hidden sm:table-cell"><StatusBadge status={p.status} /></td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <Link to={`/admin/edit/${p.id}`} className="text-royal font-medium hover:underline">Edit</Link>
                        <button onClick={() => remove(p.id)} className="text-red-500 font-medium hover:underline ml-4">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
