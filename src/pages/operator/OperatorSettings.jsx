import { useState } from 'react'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function OperatorSettings() {
  const [notifs, setNotifs] = useState({ bookings: true, cargo: true, crew: true, financial: true, advisory: true })
  const [pin, setPin] = useState({ current: '', newPin: '', confirm: '' })
  const [showPin, setShowPin] = useState(false)

  const handlePinChange = () => {
    if (!pin.current) return toast.error('Enter current PIN')
    if (pin.newPin.length < 4) return toast.error('New PIN must be at least 4 digits')
    if (pin.newPin !== pin.confirm) return toast.error('PINs do not match')
    toast.success('PIN updated successfully')
    setPin({ current: '', newPin: '', confirm: '' })
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="max-w-2xl space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Company Profile</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Company</span><span className="font-medium">Island Link Maritime Corp.</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Contact Person</span><span className="font-medium">Roberto Santos</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Mobile</span><span>09171234567</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Email</span><span>islandlink@email.com</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Status</span><span className="text-green-600 font-medium">Verified</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Vessels</span><span>MV Island Explorer, MV Siargao Star</span></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Notification Preferences</h3>
          <div className="space-y-1">
            {Object.entries({ bookings: 'New Booking Alerts', cargo: 'Cargo Shipment Updates', crew: 'Crew Assignment Changes', financial: 'Financial Reports', advisory: 'Weather & Safety Advisories' }).map(([k, label]) => (
              <label key={k} className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm text-gray-700">{label}</span>
                <input type="checkbox" checked={notifs[k]} onChange={e => setNotifs({ ...notifs, [k]: e.target.checked })} className="w-4 h-4 text-banca-600 rounded border-gray-300 focus:ring-banca-500" />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Change PIN</h3>
          <div className="space-y-3">
            <div className="relative">
              <input type={showPin ? 'text' : 'password'} placeholder="Current PIN" value={pin.current}
                onChange={e => setPin({ ...pin, current: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <input type={showPin ? 'text' : 'password'} placeholder="New PIN" value={pin.newPin}
              onChange={e => setPin({ ...pin, newPin: e.target.value.replace(/\D/g, '').slice(0, 6) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            <input type={showPin ? 'text' : 'password'} placeholder="Confirm New PIN" value={pin.confirm}
              onChange={e => setPin({ ...pin, confirm: e.target.value.replace(/\D/g, '').slice(0, 6) })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            <button onClick={handlePinChange} className="bg-banca-600 hover:bg-banca-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">Update PIN</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">About</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">App Version</span><span>BANCA v1.0.0</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Platform</span><span>Operator Portal</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Support</span><span className="text-banca-600">support@banca.gov.ph</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
