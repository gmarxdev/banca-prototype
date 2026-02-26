import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Lock, LogIn } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'

export default function OperatorLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    mobile: '',
    businessName: '',
    pin: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPin, setShowPin] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^09\d{9}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Enter a valid PH mobile number (09XXXXXXXXX)'
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required'
    }
    if (!formData.pin.trim()) {
      newErrors.pin = 'PIN is required'
    } else if (formData.pin.length < 4) {
      newErrors.pin = 'PIN must be at least 4 digits'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/operator/dashboard')
    }, 1200)
  }

  return (
    <AuthLayout title="Operator Portal" subtitle="Manage your fleet and operations">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Business Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Island Link Maritime Corp."
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-colors ${
                errors.businessName ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LogIn className="w-4 h-4" />
            </div>
          </div>
          {errors.businessName && (
            <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Mobile Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="09171234567"
              maxLength={11}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-colors ${
                errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          {errors.mobile && (
            <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* PIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            PIN
          </label>
          <div className="relative">
            <input
              type={showPin ? 'text' : 'password'}
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              placeholder="Enter your PIN"
              maxLength={6}
              className={`w-full pl-10 pr-16 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-colors ${
                errors.pin ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-banca-600 hover:text-banca-700 font-medium cursor-pointer"
            >
              {showPin ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.pin && (
            <p className="text-xs text-red-500 mt-1">{errors.pin}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-banca-600 hover:bg-banca-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Register Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/operator/register"
              className="text-banca-600 hover:text-banca-700 font-semibold"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
