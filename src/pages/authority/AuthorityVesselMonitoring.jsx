import { useState } from 'react'
import { Ship, X } from 'lucide-react'
import vessels from '../../data/vessels.json'
import operators from '../../data/operators.json'
import StatusBadge from '../../components/shared/StatusBadge'

const complianceData = { v1: 'compliant', v2: 'compliant', v3: 'compliant', v4: 'expiring', v5: 'compliant', v6: 'non_compliant', v7: 'compliant', v8: 'compliant', v9: 'compliant', v10: 'expiring' }
const complianceColors = { compliant: 'bg-green-50 text-green-700', expiring: 'bg-yellow-50 text-yellow-700', non_compliant: 'bg-red-50 text-red-700' }

export default function AuthorityVesselMonitoring() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  let filtered = vessels
  if (filter !== 'all') filtered = filtered.filter(v => v.status === filter)

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Vessel Monitoring</h1>
      <div className="flex gap-2 mb-4 flex-wrap">
        {['all', 'active', 'docked', 'maintenance'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer capitalize ${filter === f ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vessel</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Operator</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Capacity</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Compliance</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(v => {
                const op = operators.find(o => o.id === v.operator_id)
                const comp = complianceData[v.id] || 'compliant'
                return (
                  <tr key={v.id} onClick={() => setSelected(v)} className="cursor-pointer hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{v.name}</td>
                    <td className="px-4 py-3 text-gray-500">{op?.name}</td>
                    <td className="px-4 py-3 text-gray-500 capitalize">{v.type.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-gray-500">{v.capacity_passengers} pax</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${complianceColors[comp]}`}>{comp.replace('_', ' ')}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-gray-100">
          {filtered.map(v => {
            const op = operators.find(o => o.id === v.operator_id)
            const comp = complianceData[v.id] || 'compliant'
            return (
              <div key={v.id} onClick={() => setSelected(v)} className="p-4 cursor-pointer active:bg-gray-50">
                <div className="flex items-start justify-between mb-1.5">
                  <p className="text-sm font-medium text-gray-900">{v.name}</p>
                  <StatusBadge status={v.status} />
                </div>
                <p className="text-xs text-gray-500 mb-2">{op?.name}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-400 capitalize">{v.type.replace('_', ' ')}</span>
                  <span className="text-gray-400">{v.capacity_passengers} pax</span>
                  <span className={`font-medium px-2 py-0.5 rounded-full capitalize ${complianceColors[comp]}`}>{comp.replace('_', ' ')}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gradient-to-br from-banca-50 to-banca-100 rounded-xl p-8 flex items-center justify-center min-h-[200px]">
        <div className="text-center">
          <Ship className="w-10 h-10 text-banca-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-banca-700">Vessel Position Map</p>
          <p className="text-xs text-banca-500">Real-time tracking visualization</p>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-gray-500">Registration</span><span className="font-medium">{selected.registration_number}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Type</span><span className="capitalize">{selected.type.replace('_', ' ')}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Passengers</span><span>{selected.capacity_passengers}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Cargo</span><span>{selected.capacity_cargo} kg</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><StatusBadge status={selected.status} /></div>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Documents</h4>
            <div className="space-y-1.5 text-sm mb-4">
              {[['Registration', 'Valid until Dec 2025', 'green'], ['Insurance', 'Valid until Mar 2026', 'green'], ['Safety Certificate', 'Valid until Sep 2025', 'green']].map(([doc, exp, c]) => (
                <div key={doc} className="flex justify-between items-center"><span className="text-gray-500">{doc}</span><span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-${c}-50 text-${c}-700`}>{exp}</span></div>
              ))}
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Inspection History</h4>
            <div className="space-y-1.5 text-sm">
              {[['Mar 15, 2025', 'Routine Inspection', 'Passed'], ['Dec 10, 2024', 'Annual Survey', 'Passed'], ['Sep 5, 2024', 'Safety Audit', 'Passed']].map(([d, t, r]) => (
                <div key={d} className="flex justify-between"><span className="text-gray-500">{d} - {t}</span><span className="text-green-600 font-medium">{r}</span></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
