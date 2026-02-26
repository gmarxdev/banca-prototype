import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'

export default function PassengerLogin() {
  const navigate = useNavigate()
  const [mobile, setMobile] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/passenger/home')
  }

  return (
    <AuthLayout title="Welcome Back, Traveler" subtitle="Sign in to your BANCA account">
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Mobile Number */}
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
              placeholder="917 123 4567"
              className="w-full pl-[5.5rem] pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-shadow"
            />
          </div>
        </div>

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
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-shadow tracking-widest"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-banca-600 border-gray-300 rounded focus:ring-banca-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-banca-600 hover:text-banca-700 font-medium">
            Forgot PIN?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
        >
          Sign In
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/passenger/register" className="text-banca-600 hover:text-banca-700 font-semibold">
            Register
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
