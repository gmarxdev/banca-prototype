import { useState } from 'react'
import { MapPin, Plus, X, Ship, ArrowRight } from 'lucide-react'
import ports from '../../data/ports.json'
import schedules from '../../data/schedules.json'
import StatusBadge from '../../components/shared/StatusBadge'

export default function AdminPortsRoutes() {
  const [portList, setPortList] = useState(ports)
  const [showAddPort, setShowAddPort] = useState(false)
  const [selectedPort, setSelectedPort] = useState(null)
  const [newPort, setNewPort] = useState({ name: '', code: '', location: '', lat: '', lng: '' })

  const routes = [...new Set(schedules.map(s => `${s.origin_port}|${s.destination_port}`))].map(r => {
    const [o, d] = r.split('|')
    const routeSchedules = schedules.filter(s => s.origin_port === o && s.destination_port === d)
    return { origin: o, destination: d, trips: routeSchedules.length, avgFare: Math.round(routeSchedules.reduce((s, r) => s + r.fare, 0) / routeSchedules.length) }
  })

  const togglePort = (id) => {
    setPortList(portList.map(p => p.id === id ? { ...p, status: p.status === 'operational' ? 'closed' : 'operational' } : p))
  }

  const handleAddPort = () => {
    if (!newPort.name || !newPort.code) return
    setPortList([...portList, { id: newPort.code.toLowerCase(), name: newPort.name, code: newPort.code, location: newPort.location, coordinates: { lat: Number(newPort.lat), lng: Number(newPort.lng) }, facilities: [], status: 'operational' }])
    setShowAddPort(false)
    setNewPort({ name: '', code: '', location: '', lat: '', lng: '' })
  }

  const portName = (id) => portList.find(p => p.id === id)?.name || id

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Ports & Routes</h1>
        <button onClick={() => setShowAddPort(true)} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"><Plus className="w-4 h-4" /> Add Port</button>
      </div>

      <h2 className="text-sm font-semibold text-gray-900 mb-3">Registered Ports ({portList.length})</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {portList.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-banca-50 rounded-lg flex items-center justify-center"><MapPin className="w-5 h-5 text-banca-600" /></div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{p.name}</h3>
                  <p className="text-xs text-gray-400">{p.code} · {p.location}</p>
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.facilities.map(f => <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{f}</span>)}
            </div>
            <div className="text-xs text-gray-400 mb-3">Coordinates: {p.coordinates.lat}, {p.coordinates.lng}</div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedPort(p)} className="text-xs text-banca-600 font-medium cursor-pointer">Details</button>
              <button onClick={() => togglePort(p.id)} className="text-xs text-gray-500 font-medium cursor-pointer hover:text-gray-700">{p.status === 'operational' ? 'Close Port' : 'Open Port'}</button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-900 mb-3">Active Routes ({routes.length})</h2>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Route</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Daily Trips</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Avg Fare</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {routes.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium flex items-center gap-2">
                  <Ship className="w-4 h-4 text-banca-600" />
                  {portName(r.origin)} <ArrowRight className="w-3 h-3 text-gray-300" /> {portName(r.destination)}
                </td>
                <td className="px-4 py-3 text-right text-gray-500">{r.trips}</td>
                <td className="px-4 py-3 text-right font-medium">₱{r.avgFare}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {selectedPort && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedPort.name}</h3>
              <button onClick={() => setSelectedPort(null)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Code</span><span className="font-medium">{selectedPort.code}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Location</span><span>{selectedPort.location}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><StatusBadge status={selectedPort.status} /></div>
              <div className="flex justify-between"><span className="text-gray-500">Coordinates</span><span>{selectedPort.coordinates.lat}, {selectedPort.coordinates.lng}</span></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Facilities</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedPort.facilities.map(f => <span key={f} className="text-xs bg-banca-50 text-banca-700 px-2.5 py-1 rounded-full">{f}</span>)}
            </div>
            <button onClick={() => setSelectedPort(null)} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}

      {showAddPort && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Port</h3>
              <button onClick={() => setShowAddPort(false)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Port Name" value={newPort.name} onChange={e => setNewPort({ ...newPort, name: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <input placeholder="Port Code (e.g., SRG)" value={newPort.code} onChange={e => setNewPort({ ...newPort, code: e.target.value.toUpperCase() })} maxLength={3} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <input placeholder="Location" value={newPort.location} onChange={e => setNewPort({ ...newPort, location: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" step="any" placeholder="Latitude" value={newPort.lat} onChange={e => setNewPort({ ...newPort, lat: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
                <input type="number" step="any" placeholder="Longitude" value={newPort.lng} onChange={e => setNewPort({ ...newPort, lng: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              </div>
              <button onClick={handleAddPort} className="w-full bg-banca-600 hover:bg-banca-700 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">Add Port</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
