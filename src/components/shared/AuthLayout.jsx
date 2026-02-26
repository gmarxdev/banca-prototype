import { Link } from 'react-router-dom'
import { Ship, ArrowLeft } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-banca-600 via-banca-700 to-banca-900 flex items-center justify-center p-4">
      {/* Back to Home */}
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Home
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">{title || 'BANCA'}</h1>
          {subtitle && <p className="text-sm text-banca-200 mt-1">{subtitle}</p>}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
