import { useState } from 'react'
import toast from 'react-hot-toast'

export default function TerminalSettings() {
  const [notifs, setNotifs] = useState({ boarding: true, cargo: true, advisory: true })

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Settings</h1>
      <div className="max-w-2xl space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Profile</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">Gloria Reyes</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Employee ID</span><span className="font-medium">TS-2025-001</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Assigned Port</span><span className="font-medium">Surigao City Port</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Role</span><span className="font-medium">Terminal Staff</span></div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Notifications</h3>
          {Object.entries({ boarding: 'Boarding Alerts', cargo: 'Cargo Updates', advisory: 'Advisory Notifications' }).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm text-gray-700">{label}</span>
              <input type="checkbox" checked={notifs[key]} onChange={e => setNotifs({ ...notifs, [key]: e.target.checked })} className="rounded" />
            </label>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Change PIN</h3>
          <div className="space-y-3">
            <input type="password" placeholder="Current PIN" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            <input type="password" placeholder="New PIN" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            <input type="password" placeholder="Confirm New PIN" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            <button onClick={() => toast.success('PIN updated')} className="bg-banca-600 hover:bg-banca-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer">Update PIN</button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
          <p className="text-sm text-gray-500">BANCA Terminal v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
