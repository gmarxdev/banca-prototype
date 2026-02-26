import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ports from '../../data/ports.json'

const idTypes = ['Philippine National ID', "Driver's License", 'Passport', 'SSS ID', 'PhilHealth ID', "Voter's ID", 'Senior Citizen ID', 'PWD ID', 'Student ID']

export default function PassengerBookPassengers() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { passengers: count, schedule, vessel, operator, origin, destination, date } = state || {}
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const [passengerList, setPassengerList] = useState(
    Array.from({ length: count || 1 }, (_, i) => ({ name: '', idType: '', idNumber: '', type: 'adult' }))
  )

  const update = (idx, field, value) => {
    const copy = [...passengerList]
    copy[idx] = { ...copy[idx], [field]: value }
    setPassengerList(copy)
  }

  const handleContinue = () => {
    navigate('/passenger/book/summary', { state: { ...state, passengerList } })
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 mb-4 pt-4 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="bg-banca-50 rounded-xl p-3 mb-4">
        <p className="text-sm font-semibold text-banca-800">{portName(origin)} → {portName(destination)}</p>
        <p className="text-xs text-banca-600">{date} · {schedule?.departure_time} · {vessel?.name}</p>
      </div>

      <h1 className="text-lg font-bold text-gray-900 mb-4">Passenger Details</h1>
      <div className="space-y-4">
        {passengerList.map((p, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Passenger {i + 1}</p>
            <div className="space-y-3">
              <input placeholder="Full Name" value={p.name} onChange={e => update(i, 'name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
              <select value={p.idType} onChange={e => update(i, 'idType', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none">
                <option value="">Select ID Type</option>
                {idTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input placeholder="ID Number" value={p.idNumber} onChange={e => update(i, 'idNumber', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
              <select value={p.type} onChange={e => update(i, 'type', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none">
                <option value="adult">Adult</option>
                <option value="child">Child</option>
                <option value="senior">Senior Citizen (20% off)</option>
                <option value="student">Student (20% off)</option>
                <option value="pwd">PWD (20% off)</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleContinue} className="w-full mt-6 bg-banca-600 hover:bg-banca-700 text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors">
        Continue
      </button>
    </div>
  )
}
