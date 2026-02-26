import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'

export default function AuthorityLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ empId: '', pin: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPin, setShowPin] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.empId.trim()) e.empId = 'Employee ID is required'
    if (!form.pin || form.pin.length < 4) e.pin = 'PIN must be at least 4 digits'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => navigate('/authority/dashboard'), 800)
  }

  return (
    <AuthLayout title="Port Authority Portal" subtitle="Maritime monitoring and compliance">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={form.empId}
              onChange={e => setForm({ ...form, empId: e.target.value.toUpperCase() })}
              placeholder="PA-2025-001"
              className={`w-full border ${errors.empId ? 'border-red-300' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none`}
            />
          </div>
          {errors.empId && <p className="text-xs text-red-500 mt-1">{errors.empId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              value={form.pin}
              onChange={e => setForm({ ...form, pin: e.target.value.replace(/\D/g, '').slice(0, 6) })}
              placeholder="••••••"
              maxLength={6}
              className={`w-full border ${errors.pin ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none`}
            />
            <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-banca-600 hover:bg-banca-700 text-white font-semibold py-2.5 rounded-lg cursor-pointer transition-colors disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : 'Login'}
        </button>

        <p className="text-xs text-center text-gray-400 mt-4">
          Access restricted to authorized MARINA personnel
        </p>
      </form>
    </AuthLayout>
  )
}
