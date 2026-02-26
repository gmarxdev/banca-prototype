import { useState } from 'react'
import { Plus, X, ToggleLeft, ToggleRight } from 'lucide-react'
import schedules from '../../data/schedules.json'
import vessels from '../../data/vessels.json'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'
import DataTable from '../../components/shared/DataTable'

const portName = (id) => ports.find(p => p.id === id)?.name || id

export default function AdminSchedules() {
  const [scheduleList, setScheduleList] = useState(schedules)
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [newSched, setNewSched] = useState({ vessel_id: '', origin_port: '', destination_port: '', departure_time: '', arrival_time: '', fare: '' })

  const filtered = scheduleList.filter(s => filterStatus === 'all' || s.status === filterStatus)

  const toggleSchedule = (id) => {
    setScheduleList(scheduleList.map(s => s.id === id ? { ...s, status: s.status === 'scheduled' ? 'inactive' : 'scheduled', available_seats: s.status === 'scheduled' ? 0 : s.available_seats } : s))
  }

  const handleAdd = () => {
    if (!newSched.vessel_id || !newSched.origin_port || !newSched.destination_port || !newSched.departure_time || !newSched.fare) return
    const vessel = vessels.find(v => v.id === newSched.vessel_id)
    setScheduleList([...scheduleList, { ...newSched, id: `s${Date.now()}`, fare: Number(newSched.fare), available_seats: vessel?.capacity_passengers || 50, status: 'scheduled' }])
    setShowModal(false)
    setNewSched({ vessel_id: '', origin_port: '', destination_port: '', departure_time: '', arrival_time: '', fare: '' })
  }

  const columns = [
    { key: 'origin_port', label: 'Route', render: (_, row) => (
      <span className="text-sm font-medium">{portName(row.origin_port)} → {portName(row.destination_port)}</span>
    )},
    { key: 'vessel_id', label: 'Vessel', render: (v) => vessels.find(ve => ve.id === v)?.name || 'N/A' },
    { key: 'departure_time', label: 'Departure' },
    { key: 'arrival_time', label: 'Arrival' },
    { key: 'fare', label: 'Fare', render: (v) => <span className="font-medium">₱{v}</span> },
    { key: 'available_seats', label: 'Available', render: (v, row) => (
      <span className={`font-medium ${v === 0 ? 'text-red-500' : v < 10 ? 'text-yellow-500' : 'text-green-600'}`}>{v}/{vessels.find(ve => ve.id === row.vessel_id)?.capacity_passengers || '?'}</span>
    )},
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
    { key: 'id', label: 'Action', render: (_, row) => (
      <button onClick={(e) => { e.stopPropagation(); toggleSchedule(row.id) }} className="cursor-pointer text-gray-400 hover:text-gray-600">
        {row.status === 'scheduled' ? <ToggleRight className="w-6 h-6 text-green-500" /> : <ToggleLeft className="w-6 h-6" />}
      </button>
    )},
  ]

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Schedule Management</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"><Plus className="w-4 h-4" /> Add Schedule</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[['Total Schedules', scheduleList.length], ['Active', scheduleList.filter(s => s.status === 'scheduled').length], ['Full', scheduleList.filter(s => s.status === 'full').length], ['Inactive', scheduleList.filter(s => s.status === 'inactive').length]].map(([l, v]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{v}</p><p className="text-xs text-gray-500">{l}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'scheduled', 'full', 'inactive'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer capitalize ${filterStatus === s ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{s}</button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add Schedule</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <select value={newSched.vessel_id} onChange={e => setNewSched({ ...newSched, vessel_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                <option value="">Select Vessel</option>
                {vessels.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <select value={newSched.origin_port} onChange={e => setNewSched({ ...newSched, origin_port: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                  <option value="">Origin</option>
                  {ports.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <select value={newSched.destination_port} onChange={e => setNewSched({ ...newSched, destination_port: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                  <option value="">Destination</option>
                  {ports.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="time" value={newSched.departure_time} onChange={e => setNewSched({ ...newSched, departure_time: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
                <input type="time" value={newSched.arrival_time} onChange={e => setNewSched({ ...newSched, arrival_time: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              </div>
              <input type="number" placeholder="Fare (₱)" value={newSched.fare} onChange={e => setNewSched({ ...newSched, fare: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <button onClick={handleAdd} className="w-full bg-banca-600 hover:bg-banca-700 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">Add Schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
