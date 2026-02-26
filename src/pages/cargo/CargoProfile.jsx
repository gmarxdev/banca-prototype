import { useNavigate } from 'react-router-dom'
import { User, Users, Bell, HelpCircle, ChevronRight, LogOut } from 'lucide-react'

const menuItems = [
  { icon: User, label: 'Personal Information' },
  { icon: Users, label: 'Saved Recipients' },
  { icon: Bell, label: 'Notification Settings' },
  { icon: HelpCircle, label: 'Help & Support' },
]

export default function CargoProfile() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4 mt-4 text-center">
        <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-xl font-bold text-cyan-700">RS</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900">Roberto Santos</h2>
        <p className="text-sm text-gray-500">+63 922 123 4572</p>
        <p className="text-xs text-gray-400 mt-1">Member since February 2025</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {menuItems.map(item => (
          <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer hover:bg-gray-50">
            <item.icon className="w-5 h-5 text-gray-400" />
            <span className="flex-1 text-sm text-gray-700">{item.label}</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        ))}
      </div>

      <button onClick={() => navigate('/')} className="w-full mt-4 flex items-center justify-center gap-2 text-red-600 text-sm font-medium py-3 cursor-pointer hover:bg-red-50 rounded-xl">
        <LogOut className="w-4 h-4" /> Logout
      </button>
      <p className="text-center text-xs text-gray-400 mt-4">BANCA v1.0.0</p>
    </div>
  )
}
