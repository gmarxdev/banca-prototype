import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Phone, Mail, Anchor, Lock, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'
import ports from '../../data/ports.json'

export default function CargoRegister() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    preferredPort: '',
    pin: '',
    confirmPin: '',
    agreeTerms: false,
  })
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required'
    else if (form.mobile.length !== 10) newErrors.mobile = 'Enter a valid 10-digit number'
    if (!form.preferredPort) newErrors.preferredPort = 'Please select a port'
    if (!form.pin.trim()) newErrors.pin = 'PIN is required'
    else if (form.pin.length < 4) newErrors.pin = 'PIN must be at least 4 digits'
    if (!form.confirmPin.trim()) newErrors.confirmPin = 'Please confirm your PIN'
    else if (form.pin !== form.confirmPin) newErrors.confirmPin = 'PINs do not match'
    if (!form.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/cargo/home')
    }, 1000)
  }

  return (
    <AuthLayout title="BANCA Cargo" subtitle="Create your cargo account">
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Enter your full name"
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                errors.fullName ? 'border-red-300' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>

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
              value={form.mobile}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                updateField('mobile', val)
              }}
              placeholder="9XX XXX XXXX"
              className={`w-full pl-[4.5rem] pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                errors.mobile ? 'border-red-300' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="email@example.com"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Preferred Port */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Port</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Anchor className="w-4 h-4 text-gray-400" />
            </div>
            <select
              value={form.preferredPort}
              onChange={(e) => updateField('preferredPort', e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent appearance-none bg-white ${
                errors.preferredPort ? 'border-red-300' : 'border-gray-200'
              } ${!form.preferredPort ? 'text-gray-400' : 'text-gray-900'}`}
            >
              <option value="">Select your preferred port</option>
              {ports.map((port) => (
                <option key={port.id} value={port.id}>
                  {port.name} ({port.code})
                </option>
              ))}
            </select>
          </div>
          {errors.preferredPort && <p className="text-xs text-red-500 mt-1">{errors.preferredPort}</p>}
        </div>

        {/* PIN Setup */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Set PIN</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              value={form.pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                updateField('pin', val)
              }}
              placeholder="Create a 4-6 digit PIN"
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

        {/* Confirm PIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm PIN</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type={showConfirmPin ? 'text' : 'password'}
              value={form.confirmPin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                updateField('confirmPin', val)
              }}
              placeholder="Re-enter your PIN"
              maxLength={6}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                errors.confirmPin ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPin(!showConfirmPin)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPin && <p className="text-xs text-red-500 mt-1">{errors.confirmPin}</p>}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="terms"
            checked={form.agreeTerms}
            onChange={(e) => updateField('agreeTerms', e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-gray-300 text-banca-600 focus:ring-banca-500"
          />
          <label htmlFor="terms" className="text-xs text-gray-500">
            I agree to the{' '}
            <span className="text-banca-600 font-medium cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-banca-600 font-medium cursor-pointer">Privacy Policy</span>
          </label>
        </div>
        {errors.agreeTerms && <p className="text-xs text-red-500 -mt-2">{errors.agreeTerms}</p>}

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-banca-600 hover:bg-banca-700 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/cargo/login" className="text-banca-600 hover:text-banca-700 font-medium">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
