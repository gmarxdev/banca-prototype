import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'

export default function CargoLogin() {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!mobile.trim()) newErrors.mobile = 'Mobile number is required'
    else if (mobile.length !== 10) newErrors.mobile = 'Enter a valid 10-digit number'
    if (!pin.trim()) newErrors.pin = 'PIN is required'
    else if (pin.length < 4) newErrors.pin = 'PIN must be at least 4 digits'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/cargo/home')
    }, 800)
  }

  return (
    <AuthLayout title="BANCA Cargo" subtitle="Ship cargo across the islands">
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Phone className="w-4 h-4 text-gray-400" />
            </div>
            <div className="absolute inset-y-0 left-9 flex items-center pointer-events-none">
              <span className="text-sm text-gray-500 font-medium">+63</span>
            </div>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                setMobile(val)
              }}
              placeholder="9XX XXX XXXX"
              className={`w-full pl-[4.5rem] pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                errors.mobile ? 'border-red-300' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
        </div>

        {/* PIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                setPin(val)
              }}
              placeholder="Enter your PIN"
              maxLength={6}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                errors.pin ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-banca-600 hover:bg-banca-700 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Links */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/cargo/register" className="text-banca-600 hover:text-banca-700 font-medium">
              Register
            </Link>
          </p>
          <button
            type="button"
            onClick={() => navigate('/cargo/track')}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            Continue as Guest
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
