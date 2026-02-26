import { useNavigate } from 'react-router-dom'
import { Lock, Bell, HelpCircle, Info, ChevronRight, LogOut } from 'lucide-react'

export default function CrewProfile() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4 mt-4 text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-xl font-bold text-indigo-700">MF</span>
        </div>
        <h2 className="text-lg font-bold text-gray-900">Miguel Fernandez</h2>
        <p className="text-sm text-gray-500">Captain · MV Island Explorer</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-gray-500">Employee ID</span><span className="font-medium">CRW-2025-001</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Operator</span><span className="font-medium">Island Link Maritime Corp.</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Mobile</span><span>+63 931 123 4567</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Email</span><span>miguel@email.com</span></div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
        {[{ icon: Lock, label: 'Change PIN' }, { icon: Bell, label: 'Notification Settings' }, { icon: HelpCircle, label: 'Help & Support' }, { icon: Info, label: 'About BANCA' }].map(item => (
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
