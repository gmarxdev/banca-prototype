import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function PassengerEditProfile() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: 'Juan Dela Cruz', email: 'juan@email.com', idType: 'Philippine National ID', idNumber: 'PSN-1234-5678-9012' })
  const update = (field, value) => setForm({ ...form, [field]: value })

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 mb-4 pt-4 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back</button>
      <h1 className="text-lg font-bold text-gray-900 mb-4">Edit Profile</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
          <input value={form.name} onChange={e => update('name', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Mobile Number</label>
          <div className="flex items-center gap-2">
            <input value="+63 917 123 4567" disabled className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-400" />
            <span className="text-xs text-banca-600 font-medium cursor-pointer">Change</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
          <input value={form.email} onChange={e => update('email', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">ID Type</label>
          <select value={form.idType} onChange={e => update('idType', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none">
            {['Philippine National ID', "Driver's License", 'Passport', 'SSS ID', 'PhilHealth ID', "Voter's ID"].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">ID Number</label>
          <input value={form.idNumber} onChange={e => update('idNumber', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
        </div>
      </div>
      <button onClick={() => { toast.success('Profile updated successfully!'); navigate(-1) }}
        className="w-full mt-4 bg-banca-600 hover:bg-banca-700 text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors">
        Save Changes
      </button>
    </div>
  )
}
