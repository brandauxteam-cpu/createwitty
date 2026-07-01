import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Seo from '../../components/Seo.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { isSupabaseConfigured } from '../../lib/supabaseClient.js'

export default function Login() {
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (user) navigate('/admin', { replace: true }) }, [user, navigate])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!isSupabaseConfigured) { setError('Supabase is not configured yet. Add your keys to the .env file.'); return }
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) setError(error.message)
    else navigate('/admin', { replace: true })
  }

  return (
    <>
      <Seo title="CMS Login | CreateWitty" noindex />
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-navy-deep flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <span className="font-display text-2xl font-bold text-navy">Create<span className="text-royal">Witty</span></span>
            <h1 className="font-semibold text-navy text-xl mt-4">CMS Login</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to manage blog &amp; news posts.</p>
          </div>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="field" autoComplete="username" />
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="field" autoComplete="current-password" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-navy text-white rounded-xl py-3.5 font-semibold hover:bg-navy-deep transition-colors disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="text-slate-400 text-xs text-center mt-6">Accounts are created by the site owner in Supabase. Contact your administrator for access.</p>
        </div>
      </div>
    </>
  )
}
