import { useState } from 'react'
import { Search, X, Package, Truck, MapPin } from 'lucide-react'
import cargo from '../../data/cargo.json'
import ports from '../../data/ports.json'
import vessels from '../../data/vessels.json'
import StatusBadge from '../../components/shared/StatusBadge'
import DataTable from '../../components/shared/DataTable'

const portName = (id) => ports.find(p => p.id === id)?.name || id

export default function OperatorCargo() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState(null)

  const statuses = ['all', 'received', 'loaded', 'in_transit', 'delivered', 'ready_for_pickup']

  const filtered = cargo.filter(c => {
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    const matchSearch = !search ||
      c.tracking_reference.toLowerCase().includes(search.toLowerCase()) ||
      c.sender.name.toLowerCase().includes(search.toLowerCase()) ||
      c.recipient.name.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const totalWeight = cargo.reduce((sum, c) => sum + c.weight, 0)
  const totalRevenue = cargo.reduce((sum, c) => sum + c.fee, 0)

  const columns = [
    { key: 'tracking_reference', label: 'Tracking #', render: (v) => <span className="font-medium text-banca-600 text-xs">{v}</span> },
    { key: 'sender', label: 'Sender', render: (v) => <span className="text-sm">{v.name}</span> },
    { key: 'origin_port', label: 'Route', render: (_, row) => <span className="text-xs">{portName(row.origin_port)} → {portName(row.destination_port)}</span> },
    { key: 'weight', label: 'Weight', render: (v) => `${v} kg` },
    { key: 'fee', label: 'Fee', render: (v) => <span className="font-medium">₱{v.toLocaleString()}</span> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  ]

  const timelineSteps = ['received', 'loaded', 'in_transit', 'delivered']
  const getTimeline = (status) => {
    if (status === 'ready_for_pickup') return timelineSteps.map(s => ({ step: s, done: s !== 'delivered' }))
    const idx = timelineSteps.indexOf(status)
    return timelineSteps.map((s, i) => ({ step: s, done: i <= idx }))
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Cargo Management</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          ['Total Shipments', cargo.length, Package, 'bg-blue-50 text-blue-600'],
          ['In Transit', cargo.filter(c => c.status === 'in_transit').length, Truck, 'bg-yellow-50 text-yellow-600'],
          ['Total Weight', `${totalWeight.toLocaleString()} kg`, Package, 'bg-green-50 text-green-600'],
          ['Revenue', `₱${totalRevenue.toLocaleString()}`, Package, 'bg-cyan-50 text-cyan-600'],
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
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by tracking #, sender, or recipient..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer capitalize ${filterStatus === s ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {s === 'all' ? 'All' : s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={setSelected} />

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Shipment Details</h3>
              <button onClick={() => setSelected(null)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="bg-banca-50 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-banca-800">{selected.tracking_reference}</p>
              <StatusBadge status={selected.status} />
            </div>
            <div className="flex items-center gap-2 mb-4">
              {getTimeline(selected.status).map((t, i) => (
                <div key={t.step} className="flex items-center flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${t.done ? 'bg-banca-600 text-white' : 'bg-gray-200 text-gray-400'}`}>{i + 1}</div>
                  {i < 3 && <div className={`flex-1 h-0.5 mx-1 ${t.done ? 'bg-banca-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mb-4">
              <span>Received</span><span>Loaded</span><span>In Transit</span><span>Delivered</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Sender</p>
                <p className="text-sm font-medium">{selected.sender.name}</p>
                <p className="text-xs text-gray-500">{selected.sender.mobile}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Recipient</p>
                <p className="text-sm font-medium">{selected.recipient.name}</p>
                <p className="text-xs text-gray-500">{selected.recipient.mobile}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Route</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{portName(selected.origin_port)} → {portName(selected.destination_port)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Description</span><span>{selected.description}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Weight</span><span>{selected.weight} kg</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Fee</span><span className="font-medium">₱{selected.fee.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Vessel</span><span>{vessels.find(v => v.id === selected.vessel_id)?.name || 'Pending'}</span></div>
            </div>
            <button onClick={() => setSelected(null)} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
