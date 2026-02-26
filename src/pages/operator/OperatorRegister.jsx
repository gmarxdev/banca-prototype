import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, User, Phone, Mail, Ship, MapPin, Lock, Check, ArrowRight, ArrowLeft } from 'lucide-react'
import AuthLayout from '../../components/shared/AuthLayout'

const routes = [
  { id: 'surigao-dapa', label: 'Surigao - Dapa (Siargao)' },
  { id: 'surigao-san-jose', label: 'Surigao - San Jose (Dinagat)' },
  { id: 'dapa-general-luna', label: 'Dapa - General Luna' },
  { id: 'surigao-socorro', label: 'Surigao - Socorro (Bucas Grande)' },
  { id: 'dapa-del-carmen', label: 'Dapa - Del Carmen' },
]

export default function OperatorRegister() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobile: '',
    email: '',
    vesselCount: '1',
    selectedRoutes: [],
    pin: '',
    confirmPin: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const toggleRoute = (routeId) => {
    setFormData((prev) => ({
      ...prev,
      selectedRoutes: prev.selectedRoutes.includes(routeId)
        ? prev.selectedRoutes.filter((r) => r !== routeId)
        : [...prev.selectedRoutes, routeId],
    }))
    if (errors.selectedRoutes) {
      setErrors((prev) => ({ ...prev, selectedRoutes: '' }))
    }
  }

  const validateStep = (currentStep) => {
    const newErrors = {}
    if (currentStep === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
      if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact person is required'
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required'
      } else if (!/^09\d{9}$/.test(formData.mobile.trim())) {
        newErrors.mobile = 'Enter a valid PH mobile (09XXXXXXXXX)'
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address'
      }
    } else if (currentStep === 2) {
      if (!formData.vesselCount || parseInt(formData.vesselCount) < 1) {
        newErrors.vesselCount = 'At least 1 vessel is required'
      }
      if (formData.selectedRoutes.length === 0) {
        newErrors.selectedRoutes = 'Select at least one route'
      }
    } else if (currentStep === 3) {
      if (!formData.pin) {
        newErrors.pin = 'PIN is required'
      } else if (formData.pin.length < 4) {
        newErrors.pin = 'PIN must be at least 4 digits'
      }
      if (!formData.confirmPin) {
        newErrors.confirmPin = 'Confirm your PIN'
      } else if (formData.pin !== formData.confirmPin) {
        newErrors.confirmPin = 'PINs do not match'
      }
      if (!formData.agreeTerms) {
        newErrors.agreeTerms = 'You must agree to the terms and conditions'
      }
    }
    return newErrors
  }

  const handleNext = () => {
    const newErrors = validateStep(step)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateStep(3)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/operator/dashboard')
    }, 1500)
  }

  const stepLabels = ['Business Info', 'Fleet Info', 'Security']

  return (
    <AuthLayout title="Operator Registration" subtitle="Register your maritime business">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-6">
        {stepLabels.map((label, idx) => {
          const stepNum = idx + 1
          const isActive = step === stepNum
          const isCompleted = step > stepNum
          return (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-banca-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    isActive ? 'text-banca-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {idx < stepLabels.length - 1 && (
                <div
                  className={`h-0.5 w-full mx-1 mt-[-12px] ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Business Info */}
        {step === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contact Person
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.contactPerson ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.contactPerson && <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>}
            </div>

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
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-gray-400">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="company@email.com"
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>
          </>
        )}

        {/* Step 2: Fleet Info */}
        {step === 2 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Number of Vessels
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="vesselCount"
                  value={formData.vesselCount}
                  onChange={handleChange}
                  min={1}
                  max={50}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.vesselCount ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <Ship className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.vesselCount && <p className="text-xs text-red-500 mt-1">{errors.vesselCount}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Routes
              </label>
              <div className="space-y-2">
                {routes.map((route) => {
                  const isSelected = formData.selectedRoutes.includes(route.id)
                  return (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => toggleRoute(route.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 border rounded-xl text-sm text-left transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-banca-500 bg-banca-50 text-banca-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-banca-500 bg-banca-500' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{route.label}</span>
                    </button>
                  )
                })}
              </div>
              {errors.selectedRoutes && <p className="text-xs text-red-500 mt-1">{errors.selectedRoutes}</p>}
            </div>
          </>
        )}

        {/* Step 3: Security */}
        {step === 3 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Create PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="Enter 4-6 digit PIN"
                  maxLength={6}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.pin ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPin"
                  value={formData.confirmPin}
                  onChange={handleChange}
                  placeholder="Re-enter your PIN"
                  maxLength={6}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.confirmPin ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.confirmPin && <p className="text-xs text-red-500 mt-1">{errors.confirmPin}</p>}
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-banca-600 focus:ring-banca-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <span className="text-banca-600 font-medium">Terms and Conditions</span> and{' '}
                  <span className="text-banca-600 font-medium">Privacy Policy</span> of the BANCA
                  platform
                </span>
              </label>
              {errors.agreeTerms && <p className="text-xs text-red-500 mt-1">{errors.agreeTerms}</p>}
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registering...
                </span>
              ) : (
                'Complete Registration'
              )}
            </button>
          )}
        </div>

        {/* Login Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/operator/login" className="text-banca-600 hover:text-banca-700 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  )
}
