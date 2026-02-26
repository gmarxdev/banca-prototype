import { useState } from 'react'
import { MapPin, X } from 'lucide-react'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'

export default function AuthorityPorts() {
  const [portList, setPortList] = useState(ports)
  const [selected, setSelected] = useState(null)

  const toggleStatus = (id) => {
    setPortList(portList.map(p => p.id === id ? { ...p, status: p.status === 'operational' ? 'closed' : 'operational' } : p))
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Port Management</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {portList.map(p => (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-banca-50 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-banca-600" />
                </div>
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
            <div className="flex gap-2">
              <button onClick={() => setSelected(p)} className="text-xs text-banca-600 font-medium cursor-pointer">View Details</button>
              <button onClick={() => toggleStatus(p.id)} className="text-xs text-gray-500 font-medium cursor-pointer hover:text-gray-700">
                {p.status === 'operational' ? 'Close Port' : 'Open Port'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Code</span><span className="font-medium">{selected.code}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Location</span><span>{selected.location}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><StatusBadge status={selected.status} /></div>
              <div className="flex justify-between"><span className="text-gray-500">Coordinates</span><span>{selected.coordinates.lat}, {selected.coordinates.lng}</span></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Facilities</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {selected.facilities.map(f => <span key={f} className="text-xs bg-banca-50 text-banca-700 px-2.5 py-1 rounded-full">{f}</span>)}
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Today</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-lg font-bold">5</p><p className="text-xs text-gray-500">Departures</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-lg font-bold">4</p><p className="text-xs text-gray-500">Arrivals</p></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
