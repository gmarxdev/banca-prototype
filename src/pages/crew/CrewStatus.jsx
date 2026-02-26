import { useState } from 'react'
import { Ship, AlertTriangle, Check, Circle } from 'lucide-react'

const statuses = ['docked', 'boarding', 'departing', 'in_transit', 'arriving', 'arrived']
const statusLabels = { docked: 'Docked', boarding: 'Boarding', departing: 'Departing', in_transit: 'In Transit', arriving: 'Arriving', arrived: 'Arrived' }
const statusColors = { docked: 'bg-gray-100 text-gray-700', boarding: 'bg-yellow-100 text-yellow-700', departing: 'bg-orange-100 text-orange-700', in_transit: 'bg-blue-100 text-blue-700', arriving: 'bg-indigo-100 text-indigo-700', arrived: 'bg-green-100 text-green-700' }

export default function CrewStatus() {
  const [current, setCurrent] = useState('docked')
  const [showConfirm, setShowConfirm] = useState(null)
  const [showDistress, setShowDistress] = useState(false)
  const [timeline, setTimeline] = useState([{ status: 'docked', time: '05:30 AM' }])

  const changeStatus = (s) => {
    setCurrent(s)
    setTimeline([{ status: s, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...timeline])
    setShowConfirm(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <h1 className="text-lg font-bold text-gray-900 mb-4 pt-4">Trip Status</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4 text-center">
        <p className="text-xs text-gray-400 mb-2">Current Status</p>
        <span className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold ${statusColors[current]}`}>
          <Ship className="w-4 h-4" />{statusLabels[current]}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Change Status</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {statuses.map(s => (
            <button key={s} onClick={() => setShowConfirm(s)} disabled={s === current}
              className={`py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${s === current ? 'bg-banca-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50'}`}>
              {statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Status Timeline</p>
        {timeline.map((t, i) => (
          <div key={i} className="flex items-center gap-3 mb-2">
            {i === 0 ? <Check className="w-4 h-4 text-banca-600" /> : <Circle className="w-4 h-4 text-gray-300" />}
            <span className={`text-sm ${i === 0 ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{statusLabels[t.status]}</span>
            <span className="text-xs text-gray-400 ml-auto">{t.time}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-2 text-sm">
        <p className="font-semibold text-gray-900">Vessel Details</p>
        <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">MV Island Explorer</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Registration</span><span>MARINA-2024-0451</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Capacity</span><span>60 pax / 2,000 kg</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Route</span><span>Surigao → Dapa</span></div>
        <div className="flex justify-between"><span className="text-gray-500">Scheduled</span><span>06:00 – 08:30</span></div>
      </div>

      <button onClick={() => setShowDistress(true)} className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-semibold cursor-pointer mb-2">Send Distress Signal</button>
      <button className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium cursor-pointer hover:bg-gray-50">Report Issue</button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Change Status</h3>
            <p className="text-sm text-gray-500 mb-4">Change vessel status to <strong>{statusLabels[showConfirm]}</strong>?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(null)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm cursor-pointer">Cancel</button>
              <button onClick={() => changeStatus(showConfirm)} className="flex-1 bg-banca-600 text-white py-2 rounded-lg text-sm cursor-pointer">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showDistress && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-6 h-6 text-red-500" /><h3 className="text-lg font-bold text-red-700">Distress Signal</h3></div>
            <p className="text-sm text-gray-500 mb-4">This will alert the Coast Guard and Port Authority. Only use in genuine emergencies.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDistress(false)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm cursor-pointer">Cancel</button>
              <button onClick={() => setShowDistress(false)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm cursor-pointer">Send Signal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
