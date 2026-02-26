import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Users } from 'lucide-react'
import schedules from '../../data/schedules.json'
import vessels from '../../data/vessels.json'
import operators from '../../data/operators.json'
import ports from '../../data/ports.json'

export default function PassengerBookResults() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('time')

  const { origin, destination, date, passengers } = state || {}
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  let results = schedules.filter(s => s.origin_port === origin && s.destination_port === destination && s.status !== 'full')
  if (filter === 'morning') results = results.filter(s => parseInt(s.departure_time) < 12)
  if (filter === 'afternoon') results = results.filter(s => parseInt(s.departure_time) >= 12)
  if (sort === 'price_low') results.sort((a, b) => a.fare - b.fare)
  else if (sort === 'price_high') results.sort((a, b) => b.fare - a.fare)

  const seatColor = (n) => n > 20 ? 'text-green-600 bg-green-50' : n > 5 ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 mb-4 pt-4 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="bg-white rounded-xl border border-gray-100 p-3 mb-4">
        <p className="text-sm font-semibold text-gray-900">{portName(origin)} → {portName(destination)}</p>
        <p className="text-xs text-gray-500">{date} · {passengers} passenger{passengers > 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['all', 'morning', 'afternoon'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer ${filter === f ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {f === 'all' ? 'All' : f === 'morning' ? 'Morning' : 'Afternoon'}
          </button>
        ))}
        <select value={sort} onChange={e => setSort(e.target.value)} className="ml-auto text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none">
          <option value="time">By Time</option>
          <option value="price_low">Price: Low</option>
          <option value="price_high">Price: High</option>
        </select>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12 text-sm text-gray-400">No trips available. Try another date.</div>
      ) : (
        <div className="space-y-3">
          {results.map(s => {
            const vessel = vessels.find(v => v.id === s.vessel_id)
            const operator = operators.find(o => o.id === vessel?.operator_id)
            return (
              <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{vessel?.name}</p>
                    <p className="text-xs text-gray-400">{operator?.name}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${seatColor(s.available_seats)}`}>
                    {s.available_seats} seats
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{s.departure_time}</p>
                    <p className="text-[10px] text-gray-400">Depart</p>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="h-px flex-1 bg-gray-200" />
                    <Clock className="w-3 h-3 text-gray-300" />
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{s.arrival_time}</p>
                    <p className="text-[10px] text-gray-400">Arrive</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-banca-600">₱{s.fare}</p>
                  <button onClick={() => navigate('/passenger/book/passengers', { state: { ...state, schedule: s, vessel, operator } })}
                    className="bg-banca-600 hover:bg-banca-700 text-white text-sm font-medium px-5 py-2 rounded-lg cursor-pointer transition-colors">
                    Select
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
