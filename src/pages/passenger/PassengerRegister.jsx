import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { User, Phone, Mail, CreditCard, Heart, Lock, Eye, EyeOff, Check, X } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'

const ID_TYPES = [
  'Philippine National ID',
  "Driver's License",
  'Passport',
  'SSS ID',
  'PhilHealth ID',
  "Voter's ID",
  'Senior Citizen ID',
  'PWD ID',
]

const STEPS = ['Personal Info', 'Identification', 'Emergency Contact', 'Security']

export default function PassengerRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [showPin, setShowPin] = useState(false)
  const [showConfirmPin, setShowConfirmPin] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef([])

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    idType: '',
    idNumber: '',
    emergencyName: '',
    emergencyMobile: '',
    emergencyRelationship: '',
    pin: '',
    confirmPin: '',
    agreeTerms: false,
  })

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setShowOtp(true)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    navigate('/passenger/home')
  }

  const handleResendOtp = () => {
    setOtp(['', '', '', '', '', ''])
    otpRefs.current[0]?.focus()
  }

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateForm('fullName', e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">+63</span>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => updateForm('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="917 123 4567"
                  className="w-full pl-[5.5rem] pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  placeholder="juan@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ID Type</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={form.idType}
                  onChange={(e) => updateForm('idType', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select ID Type</option>
                  {ID_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">ID Number</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.idNumber}
                  onChange={(e) => updateForm('idNumber', e.target.value)}
                  placeholder="Enter your ID number"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Name</label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={form.emergencyName}
                  onChange={(e) => updateForm('emergencyName', e.target.value)}
                  placeholder="Emergency contact full name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Mobile</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <span className="absolute left-9 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">+63</span>
                <input
                  type="tel"
                  value={form.emergencyMobile}
                  onChange={(e) => updateForm('emergencyMobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="918 765 4321"
                  className="w-full pl-[5.5rem] pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Relationship</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={form.emergencyRelationship}
                  onChange={(e) => updateForm('emergencyRelationship', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Partner">Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Create PIN</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPin ? 'text' : 'password'}
                  value={form.pin}
                  onChange={(e) => updateForm('pin', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit PIN"
                  maxLength={6}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm PIN</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPin ? 'text' : 'password'}
                  value={form.confirmPin}
                  onChange={(e) => updateForm('confirmPin', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Re-enter 6-digit PIN"
                  maxLength={6}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPin(!showConfirmPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPin && form.pin !== form.confirmPin && (
                <p className="text-xs text-red-500 mt-1">PINs do not match</p>
              )}
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={(e) => updateForm('agreeTerms', e.target.checked)}
                className="w-4 h-4 text-banca-600 border-gray-300 rounded focus:ring-banca-500 mt-0.5"
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <button type="button" className="text-banca-600 hover:underline font-medium">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-banca-600 hover:underline font-medium">Privacy Policy</button>
              </span>
            </label>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join BANCA for seamless maritime travel">
      {/* Step Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i < step
                    ? 'bg-banca-600 text-white'
                    : i === step
                    ? 'bg-banca-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-6 sm:w-10 h-0.5 mx-1 ${i < step ? 'bg-banca-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-gray-500">
          Step {step + 1} of {STEPS.length}: <span className="font-medium text-gray-700">{STEPS[step]}</span>
        </p>
      </div>

      {/* Step Content */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleNext()
        }}
      >
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="flex-1 py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            {step === 3 ? 'Create Account' : 'Next'}
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/passenger/login" className="text-banca-600 hover:text-banca-700 font-semibold">
            Sign In
          </Link>
        </p>
      </form>

      {/* OTP Verification Modal */}
      {showOtp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Verify Your Number</h3>
              <button
                onClick={() => setShowOtp(false)}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              We sent a 6-digit code to <span className="font-medium text-gray-700">+63{form.mobile}</span>
            </p>

            {/* OTP Input Boxes */}
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="w-10 h-12 text-center text-lg font-bold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer mb-3"
            >
              Verify
            </button>

            <p className="text-center text-sm text-gray-500">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-banca-600 hover:text-banca-700 font-semibold cursor-pointer"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}
