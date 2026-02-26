import { useState } from 'react'
import { Search, X, Ticket, Calendar, CreditCard, Users } from 'lucide-react'
import bookings from '../../data/bookings.json'
import schedules from '../../data/schedules.json'
import ports from '../../data/ports.json'
import vessels from '../../data/vessels.json'
import StatusBadge from '../../components/shared/StatusBadge'
import DataTable from '../../components/shared/DataTable'

const portName = (id) => ports.find(p => p.id === id)?.name || id

export default function OperatorBookings() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState(null)

  const enriched = bookings.map(b => {
    const sched = schedules.find(s => s.id === b.schedule_id)
    const vessel = vessels.find(v => v.id === sched?.vessel_id)
    return { ...b, schedule: sched, vessel }
  })

  const filtered = enriched.filter(b => {
    const matchStatus = filterStatus === 'all' || b.booking_status === filterStatus
    const matchSearch = !search ||
      b.reference_number.toLowerCase().includes(search.toLowerCase()) ||
      b.passengers.some(p => p.name.toLowerCase().includes(search.toLowerCase()))
    return matchStatus && matchSearch
  })

  const statuses = ['all', 'confirmed', 'boarding', 'in_transit', 'completed', 'cancelled']

  const columns = [
    { key: 'reference_number', label: 'Reference', render: (v) => <span className="font-medium text-banca-600">{v}</span> },
    { key: 'passengers', label: 'Passengers', render: (v) => (
      <div>
        <p className="font-medium">{v[0]?.name}</p>
        {v.length > 1 && <p className="text-xs text-gray-400">+{v.length - 1} more</p>}
      </div>
    )},
    { key: 'schedule', label: 'Route', render: (_, row) => row.schedule ? (
      <span className="text-xs">{portName(row.schedule.origin_port)} → {portName(row.schedule.destination_port)}</span>
    ) : '-' },
    { key: 'total_amount', label: 'Amount', render: (v) => <span className="font-medium">₱{v.toLocaleString()}</span> },
    { key: 'payment_method', label: 'Payment', render: (v) => <span className="capitalize text-xs">{v}</span> },
    { key: 'booking_status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  ]

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Booking Management</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          ['Total Bookings', enriched.length, Ticket, 'bg-blue-50 text-blue-600'],
          ['Confirmed', enriched.filter(b => b.booking_status === 'confirmed').length, Calendar, 'bg-green-50 text-green-600'],
          ['Passengers', enriched.reduce((sum, b) => sum + b.passengers.length, 0), Users, 'bg-indigo-50 text-indigo-600'],
          ['Revenue', `₱${enriched.filter(b => b.payment_status === 'paid').reduce((sum, b) => sum + b.total_amount, 0).toLocaleString()}`, CreditCard, 'bg-cyan-50 text-cyan-600'],
        ].map(([label, value, Icon, colors]) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${colors}`}><Icon className="w-4 h-4" /></div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by reference or passenger name..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer capitalize ${filterStatus === s ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {s === 'all' ? 'All Bookings' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={setSelected} />

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Booking Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-banca-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-banca-800">{selected.reference_number}</p>
              <div className="flex items-center gap-2 mt-1"><StatusBadge status={selected.booking_status} /><StatusBadge status={selected.payment_status} /></div>
            </div>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Route</span><span className="font-medium">{selected.schedule ? `${portName(selected.schedule.origin_port)} → ${portName(selected.schedule.destination_port)}` : 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Departure</span><span>{selected.schedule?.departure_time || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Vessel</span><span>{selected.vessel?.name || 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className="capitalize">{selected.payment_method} · ₱{selected.total_amount.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Booked</span><span>{new Date(selected.created_at).toLocaleDateString()}</span></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Passengers ({selected.passengers.length})</h4>
            <div className="space-y-2 mb-4">
              {selected.passengers.map((p, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{p.type} · {p.id_type}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
