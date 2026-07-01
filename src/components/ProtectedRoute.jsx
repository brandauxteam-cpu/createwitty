import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Guards CMS routes — redirects to the login page if not signed in.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mist text-slate-500">
        Loading…
      </div>
    )
  }
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}
