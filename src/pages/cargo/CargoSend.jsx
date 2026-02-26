import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info, X, Package, CheckCircle, Copy } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import ports from '../../data/ports.json'

export default function CargoSend() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    senderName: 'Roberto Santos',
    senderMobile: '9221234572',
    recipientName: '',
    recipientMobile: '',
    originPort: '',
    destinationPort: '',
    description: '',
    weight: '',
    declaredValue: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [generatedTracking, setGeneratedTracking] = useState('')
  const [copied, setCopied] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const estimatedFee = (() => {
    const weight = parseFloat(form.weight) || 0
    if (weight <= 0) return 0
    const calculated = weight * 15
    return Math.max(calculated, 150)
  })()

  const validate = () => {
    const newErrors = {}
    if (!form.senderName.trim()) newErrors.senderName = 'Sender name is required'
    if (!form.senderMobile.trim()) newErrors.senderMobile = 'Sender mobile is required'
    if (!form.recipientName.trim()) newErrors.recipientName = 'Recipient name is required'
    if (!form.recipientMobile.trim()) newErrors.recipientMobile = 'Recipient mobile is required'
    else if (form.recipientMobile.length !== 10) newErrors.recipientMobile = 'Enter a valid 10-digit number'
    if (!form.originPort) newErrors.originPort = 'Origin port is required'
    if (!form.destinationPort) newErrors.destinationPort = 'Destination port is required'
    if (form.originPort && form.destinationPort && form.originPort === form.destinationPort)
      newErrors.destinationPort = 'Destination must differ from origin'
    if (!form.description.trim()) newErrors.description = 'Cargo description is required'
    if (!form.weight || parseFloat(form.weight) <= 0) newErrors.weight = 'Valid weight is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateTrackingRef = () => {
    const now = new Date()
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '')
    const rand = String(Math.floor(Math.random() * 900) + 100)
    return `BNCA-CRG-${dateStr}-${rand}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      const tracking = generateTrackingRef()
      setGeneratedTracking(tracking)
      setLoading(false)
      setShowSuccessModal(true)
    }, 1000)
  }

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(generatedTracking).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputClass = (field) =>
    `w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
      errors[field] ? 'border-red-300' : 'border-gray-200'
    }`

  const selectClass = (field, hasValue) =>
    `w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent appearance-none bg-white ${
      errors[field] ? 'border-red-300' : 'border-gray-200'
    } ${!hasValue ? 'text-gray-400' : 'text-gray-900'}`

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <PageHeader title="Send Cargo" subtitle="Create a new shipment" />

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl mb-6">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800">
          <span className="font-semibold">Note:</span> Physical cargo drop-off at port terminal is required.
          This form pre-registers your shipment for faster processing at the counter.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sender Details */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Sender Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={form.senderName}
                onChange={(e) => updateField('senderName', e.target.value)}
                className={inputClass('senderName')}
              />
              {errors.senderName && <p className="text-xs text-red-500 mt-1">{errors.senderName}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Mobile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-sm text-gray-500 font-medium">+63</span>
                </div>
                <input
                  type="tel"
                  value={form.senderMobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                    updateField('senderMobile', val)
                  }}
                  className={`w-full pl-12 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.senderMobile ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.senderMobile && <p className="text-xs text-red-500 mt-1">{errors.senderMobile}</p>}
            </div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recipient Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={form.recipientName}
                onChange={(e) => updateField('recipientName', e.target.value)}
                placeholder="Recipient's full name"
                className={inputClass('recipientName')}
              />
              {errors.recipientName && <p className="text-xs text-red-500 mt-1">{errors.recipientName}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Mobile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-sm text-gray-500 font-medium">+63</span>
                </div>
                <input
                  type="tel"
                  value={form.recipientMobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                    updateField('recipientMobile', val)
                  }}
                  placeholder="9XX XXX XXXX"
                  className={`w-full pl-12 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.recipientMobile ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
              </div>
              {errors.recipientMobile && <p className="text-xs text-red-500 mt-1">{errors.recipientMobile}</p>}
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Shipment Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Origin Port</label>
              <select
                value={form.originPort}
                onChange={(e) => updateField('originPort', e.target.value)}
                className={selectClass('originPort', form.originPort)}
              >
                <option value="">Select origin port</option>
                {ports.map((port) => (
                  <option key={port.id} value={port.id}>
                    {port.name} ({port.code})
                  </option>
                ))}
              </select>
              {errors.originPort && <p className="text-xs text-red-500 mt-1">{errors.originPort}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Destination Port</label>
              <select
                value={form.destinationPort}
                onChange={(e) => updateField('destinationPort', e.target.value)}
                className={selectClass('destinationPort', form.destinationPort)}
              >
                <option value="">Select destination port</option>
                {ports
                  .filter((p) => p.id !== form.originPort)
                  .map((port) => (
                    <option key={port.id} value={port.id}>
                      {port.name} ({port.code})
                    </option>
                  ))}
              </select>
              {errors.destinationPort && (
                <p className="text-xs text-red-500 mt-1">{errors.destinationPort}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Cargo Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe your cargo (e.g., 2 boxes of household supplies)"
                rows={3}
                className={`${inputClass('description')} resize-none`}
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Approx. Weight (kg)
                </label>
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => updateField('weight', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.1"
                  className={inputClass('weight')}
                />
                {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Declared Value <span className="text-gray-400">(opt)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-sm text-gray-400">P</span>
                  </div>
                  <input
                    type="number"
                    value={form.declaredValue}
                    onChange={(e) => updateField('declaredValue', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Fee Display */}
        {estimatedFee > 0 && (
          <div className="bg-banca-50 border border-banca-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-banca-600 font-medium">Estimated Shipping Fee</p>
                <p className="text-xs text-banca-500 mt-0.5">
                  {parseFloat(form.weight) || 0} kg x P15/kg (min P150)
                </p>
              </div>
              <p className="text-2xl font-bold text-banca-700">
                P{estimatedFee.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-banca-600 hover:bg-banca-700 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Package className="w-4 h-4" />
          {loading ? 'Processing...' : 'Proceed to Port Counter'}
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Shipment Pre-Registered!</h3>
              <p className="text-sm text-gray-500 mb-4">
                Present this tracking reference at the port counter.
              </p>

              {/* Tracking Reference */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-gray-500 mb-1">Tracking Reference</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-lg font-bold text-banca-700 font-mono">{generatedTracking}</p>
                  <button
                    onClick={handleCopyTracking}
                    className="p-1 text-gray-400 hover:text-banca-600 transition-colors cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/cargo/track`)}
                  className="w-full py-2.5 bg-banca-600 hover:bg-banca-700 text-white font-semibold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Track Shipment
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false)
                    navigate('/cargo/home')
                  }}
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
