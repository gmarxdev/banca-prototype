import { useState } from 'react'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

export default function AdminSettings() {
  const [notifs, setNotifs] = useState({
    userRegistrations: true, operatorApprovals: true, systemAlerts: true,
    dailyReports: true, securityAlerts: true, advisoryUpdates: true
  })
  const [pin, setPin] = useState({ current: '', newPin: '', confirm: '' })
  const [showPin, setShowPin] = useState(false)

  const handlePinChange = () => {
    if (!pin.current) return toast.error('Enter current password')
    if (pin.newPin.length < 6) return toast.error('New password must be at least 6 characters')
    if (pin.newPin !== pin.confirm) return toast.error('Passwords do not match')
    toast.success('Password updated successfully')
    setPin({ current: '', newPin: '', confirm: '' })
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Admin Settings</h1>

      <div className="max-w-2xl space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Account Profile</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">System Administrator</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Username</span><span className="font-medium">admin@banca.gov.ph</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Role</span><span className="text-banca-600 font-medium">Super Admin</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Last Login</span><span>Jun 14, 2025 · 09:00 AM</span></div>
            <div className="flex justify-between"><span className="text-gray-500">IP Address</span><span className="font-mono text-xs">192.168.1.10</span></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Notification Preferences</h3>
          <div className="space-y-1">
            {Object.entries({
              userRegistrations: 'New User Registrations',
              operatorApprovals: 'Operator Approval Requests',
              systemAlerts: 'System Health Alerts',
              dailyReports: 'Daily Operations Reports',
              securityAlerts: 'Security & Login Alerts',
              advisoryUpdates: 'Advisory Updates'
            }).map(([k, label]) => (
              <label key={k} className="flex items-center justify-between py-2 cursor-pointer">
                <span className="text-sm text-gray-700">{label}</span>
                <input type="checkbox" checked={notifs[k]} onChange={e => setNotifs({ ...notifs, [k]: e.target.checked })}
                  className="w-4 h-4 text-banca-600 rounded border-gray-300 focus:ring-banca-500" />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Change Password</h3>
          <div className="space-y-3">
            <div className="relative">
              <input type={showPin ? 'text' : 'password'} placeholder="Current Password" value={pin.current}
                onChange={e => setPin({ ...pin, current: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <button type="button" onClick={() => setShowPin(!showPin)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <input type={showPin ? 'text' : 'password'} placeholder="New Password" value={pin.newPin}
              onChange={e => setPin({ ...pin, newPin: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            <input type={showPin ? 'text' : 'password'} placeholder="Confirm New Password" value={pin.confirm}
              onChange={e => setPin({ ...pin, confirm: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            <button onClick={handlePinChange} className="bg-banca-600 hover:bg-banca-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">Update Password</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Security</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <div><span className="text-gray-700">Two-Factor Authentication</span><p className="text-xs text-gray-400">Add an extra layer of security</p></div>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-600">Not Enabled</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div><span className="text-gray-700">Active Sessions</span><p className="text-xs text-gray-400">Manage devices with active logins</p></div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600">1 Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">About</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Platform</span><span>BANCA Digital Sea Transport</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Version</span><span>v1.0.0</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Environment</span><span className="text-green-600">Production</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Support</span><span className="text-banca-600">support@banca.gov.ph</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
