import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Lock, Eye, EyeOff, Phone } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'

export default function CrewLogin() {
  const navigate = useNavigate()
  const [loginMethod, setLoginMethod] = useState('employee') // 'employee' | 'mobile'
  const [employeeId, setEmployeeId] = useState('')
  const [mobile, setMobile] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (loginMethod === 'employee') {
      if (!employeeId.trim()) newErrors.employeeId = 'Employee ID is required'
    } else {
      if (!mobile.trim()) newErrors.mobile = 'Mobile number is required'
      else if (mobile.length !== 10) newErrors.mobile = 'Enter a valid 10-digit number'
    }
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
      navigate('/crew/dashboard')
    }, 800)
  }

  return (
    <AuthLayout title="Boat Crew Portal" subtitle="Sign in to manage your vessel operations">
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Login Method Toggle */}
        <div className="flex rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => { setLoginMethod('employee'); setErrors({}) }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              loginMethod === 'employee'
                ? 'bg-white text-banca-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Employee ID
          </button>
          <button
            type="button"
            onClick={() => { setLoginMethod('mobile'); setErrors({}) }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
              loginMethod === 'mobile'
                ? 'bg-white text-banca-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Mobile Number
          </button>
        </div>

        {/* Employee ID Input */}
        {loginMethod === 'employee' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Employee ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <BadgeCheck className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                placeholder="e.g. CREW-2025-0001"
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-shadow ${
                  errors.employeeId ? 'border-red-300' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.employeeId && <p className="text-xs text-red-500 mt-1">{errors.employeeId}</p>}
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mobile Number
            </label>
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
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="9XX XXX XXXX"
                className={`w-full pl-[5.5rem] pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-shadow ${
                  errors.mobile ? 'border-red-300' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>
        )}

        {/* PIN */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            PIN
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="6-digit PIN"
              maxLength={6}
              className={`w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-shadow tracking-widest ${
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

        {/* Help */}
        <div className="text-center space-y-2">
          <button
            type="button"
            className="text-sm text-banca-600 hover:text-banca-700 font-medium cursor-pointer"
          >
            Forgot PIN?
          </button>
          <p className="text-xs text-gray-400">
            Contact your operator admin for account issues
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
