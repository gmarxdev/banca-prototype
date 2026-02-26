import { useState } from 'react'
import { Search, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import bookings from '../../data/bookings.json'
import StatusBadge from '../../components/shared/StatusBadge'

const mockPassengers = bookings.filter(b => b.schedule_id === 's1').flatMap(b => b.passengers.map(p => ({ ...p, boarded: Math.random() > 0.3, ref: b.reference_number })))
const extras = [
  { name: 'Elena Torres', type: 'pwd', id_type: 'PWD ID', id_number: 'PWD-2024-11223', boarded: true, ref: 'BANCA-2025-00111' },
  { name: 'Carlos Mendoza', type: 'adult', id_type: 'SSS ID', id_number: 'SSS-33-1234567-8', boarded: true, ref: 'BANCA-2025-00109' },
  { name: 'Rosa Mendoza', type: 'adult', id_type: 'PhilHealth ID', id_number: 'PH-12-098765432-1', boarded: false, ref: 'BANCA-2025-00110' },
  { name: 'Lola Santos', type: 'senior', id_type: 'Senior Citizen ID', id_number: 'SC-2024-7890', boarded: true, ref: 'BANCA-2025-00106' },
]
const allPassengers = [...mockPassengers, ...extras]

export default function CrewPassengers() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  let filtered = allPassengers
  if (filter === 'boarded') filtered = filtered.filter(p => p.boarded)
  if (filter === 'not_boarded') filtered = filtered.filter(p => !p.boarded)
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const adults = allPassengers.filter(p => p.type === 'adult').length
  const seniors = allPassengers.filter(p => p.type === 'senior').length
  const pwd = allPassengers.filter(p => p.type === 'pwd').length
  const children = allPassengers.filter(p => p.type === 'child').length

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <div className="flex items-center justify-between pt-4 mb-4">
        <h1 className="text-lg font-bold text-gray-900">Passenger Manifest</h1>
        <button onClick={() => toast.success('Manifest exported')} className="flex items-center gap-1 text-xs text-banca-600 font-medium cursor-pointer"><Download className="w-3.5 h-3.5" /> Export</button>
      </div>

      <div className="bg-banca-50 rounded-xl p-3 mb-4 flex flex-wrap gap-3 text-xs font-medium text-banca-700">
        <span>Total: {allPassengers.length}</span>
        <span>Adults: {adults}</span>
        <span>Seniors: {seniors}</span>
        <span>PWD: {pwd}</span>
        <span>Children: {children}</span>
      </div>

      <div className="relative mb-3">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search passenger" className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-banca-500" />
      </div>

      <div className="flex gap-2 mb-4">
        {[['all', 'All'], ['boarded', 'Boarded'], ['not_boarded', 'Not Boarded']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer ${filter === k ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{l}</button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((p, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{p.name}</p>
              <p className="text-xs text-gray-400">{p.id_type} · {p.ref}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={p.type} />
              <span className={`w-2.5 h-2.5 rounded-full ${p.boarded ? 'bg-green-500' : 'bg-gray-300'}`} title={p.boarded ? 'Boarded' : 'Not boarded'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
