import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Lock, Eye, EyeOff, MapPin } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'
import ports from '../../data/ports.json'

export default function TerminalLogin() {
  const navigate = useNavigate()
  const [employeeId, setEmployeeId] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [selectedPort, setSelectedPort] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/terminal/dashboard')
  }

  return (
    <AuthLayout title="Terminal Staff Portal" subtitle="Staff access for port operations">
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Employee ID */}
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
              placeholder="e.g. EMP-2025-001"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-shadow"
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
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Port Assignment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Port Assignment
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
            <select
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent transition-shadow appearance-none bg-white cursor-pointer"
            >
              <option value="">Select your assigned port</option>
              {ports.map((port) => (
                <option key={port.id} value={port.id}>
                  {port.name} ({port.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
        >
          Sign In
        </button>

        {/* Help Text */}
        <p className="text-center text-xs text-gray-400">
          Contact your port supervisor if you need access credentials.
        </p>
      </form>
    </AuthLayout>
  )
}
