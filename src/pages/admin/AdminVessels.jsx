import { useState } from 'react'
import { Search, Plus, X, Ship } from 'lucide-react'
import vessels from '../../data/vessels.json'
import operators from '../../data/operators.json'
import StatusBadge from '../../components/shared/StatusBadge'
import DataTable from '../../components/shared/DataTable'

const vesselTypes = { motorized_banca: 'Motorized Banca', fast_craft: 'Fast Craft' }

export default function AdminVessels() {
  const [vesselList, setVesselList] = useState(vessels)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [newVessel, setNewVessel] = useState({ name: '', operator_id: '', type: 'motorized_banca', capacity_passengers: '', capacity_cargo: '', registration_number: '' })

  const filtered = vesselList.filter(v => {
    const matchStatus = filterStatus === 'all' || v.status === filterStatus
    const matchSearch = !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.registration_number.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const columns = [
    { key: 'name', label: 'Vessel Name', render: (v) => <span className="font-medium">{v}</span> },
    { key: 'operator_id', label: 'Operator', render: (v) => operators.find(o => o.id === v)?.name || 'N/A' },
    { key: 'type', label: 'Type', render: (v) => vesselTypes[v] || v },
    { key: 'capacity_passengers', label: 'Passengers', render: (v) => v },
    { key: 'capacity_cargo', label: 'Cargo (kg)', render: (v) => v.toLocaleString() },
    { key: 'registration_number', label: 'Registration', render: (v) => <span className="text-xs font-mono">{v}</span> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v} /> },
  ]

  const handleAdd = () => {
    if (!newVessel.name || !newVessel.operator_id) return
    setVesselList([...vesselList, { ...newVessel, id: `v${Date.now()}`, capacity_passengers: Number(newVessel.capacity_passengers), capacity_cargo: Number(newVessel.capacity_cargo), status: 'active' }])
    setShowModal(false)
    setNewVessel({ name: '', operator_id: '', type: 'motorized_banca', capacity_passengers: '', capacity_cargo: '', registration_number: '' })
  }

  const toggleStatus = (id) => {
    setVesselList(vesselList.map(v => v.id === id ? { ...v, status: v.status === 'active' ? 'maintenance' : 'active' } : v))
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Vessel Management</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"><Plus className="w-4 h-4" /> Add Vessel</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[['Total Vessels', vesselList.length], ['Active', vesselList.filter(v => v.status === 'active').length], ['Maintenance', vesselList.filter(v => v.status === 'maintenance').length], ['Docked', vesselList.filter(v => v.status === 'docked').length]].map(([l, v]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{v}</p>
            <p className="text-xs text-gray-500">{l}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vessels..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'maintenance', 'docked'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer capitalize ${filterStatus === s ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{s}</button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={setSelected} />

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Operator</span><span className="font-medium">{operators.find(o => o.id === selected.operator_id)?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Type</span><span>{vesselTypes[selected.type]}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Registration</span><span className="font-mono text-xs">{selected.registration_number}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Passenger Capacity</span><span>{selected.capacity_passengers}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Cargo Capacity</span><span>{selected.capacity_cargo.toLocaleString()} kg</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><StatusBadge status={selected.status} /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { toggleStatus(selected.id); setSelected(null) }} className="flex-1 bg-yellow-50 text-yellow-700 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-yellow-100">
                {selected.status === 'active' ? 'Set Maintenance' : 'Set Active'}
              </button>
              <button onClick={() => setSelected(null)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200">Close</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Vessel</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Vessel Name" value={newVessel.name} onChange={e => setNewVessel({ ...newVessel, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <select value={newVessel.operator_id} onChange={e => setNewVessel({ ...newVessel, operator_id: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                <option value="">Select Operator</option>
                {operators.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
              <select value={newVessel.type} onChange={e => setNewVessel({ ...newVessel, type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                <option value="motorized_banca">Motorized Banca</option>
                <option value="fast_craft">Fast Craft</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Passenger Capacity" value={newVessel.capacity_passengers} onChange={e => setNewVessel({ ...newVessel, capacity_passengers: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
                <input type="number" placeholder="Cargo Capacity (kg)" value={newVessel.capacity_cargo} onChange={e => setNewVessel({ ...newVessel, capacity_cargo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              </div>
              <input placeholder="Registration Number" value={newVessel.registration_number} onChange={e => setNewVessel({ ...newVessel, registration_number: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <button onClick={handleAdd} className="w-full bg-banca-600 hover:bg-banca-700 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">Add Vessel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
