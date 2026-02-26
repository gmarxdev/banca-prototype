import { useState } from 'react'
import { ShieldCheck, ShieldAlert, Clock } from 'lucide-react'
import operators from '../../data/operators.json'
import vessels from '../../data/vessels.json'
import StatusBadge from '../../components/shared/StatusBadge'

const complianceDetails = {
  op1: { status: 'compliant', lastInspection: 'Mar 15, 2025', violations: 0 },
  op2: { status: 'compliant', lastInspection: 'Feb 20, 2025', violations: 0 },
  op3: { status: 'expiring', lastInspection: 'Jan 10, 2025', violations: 1 },
  op4: { status: 'compliant', lastInspection: 'Apr 5, 2025', violations: 0 },
  op5: { status: 'pending', lastInspection: 'N/A', violations: 0 },
}

const violations = [
  { date: 'Jun 10, 2025', operator: 'Siargao Fast Ferry Inc.', vessel: 'MV Coral Queen', type: 'Expired Safety Certificate', severity: 'warning', status: 'open' },
  { date: 'May 28, 2025', operator: 'Blue Waves Shipping', vessel: 'MV Mindanao Pearl', type: 'Overloading Passengers', severity: 'critical', status: 'resolved' },
  { date: 'May 15, 2025', operator: 'Dinagat Sea Transport', vessel: 'MV Dinagat Pride', type: 'Missing Life Jackets', severity: 'warning', status: 'resolved' },
]

export default function AuthorityCompliance() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Compliance Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <ShieldCheck className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900">4/5</p>
          <p className="text-xs text-gray-500">Compliant Operators</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <ShieldAlert className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900">8/10</p>
          <p className="text-xs text-gray-500">Valid Documents</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900">2</p>
          <p className="text-xs text-gray-500">Pending Inspections</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Operator</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Vessels</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Last Inspection</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Rating</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {operators.map(op => {
                const comp = complianceDetails[op.id]
                const opVessels = vessels.filter(v => v.operator_id === op.id)
                return (
                  <tr key={op.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{op.name}</td>
                    <td className="px-4 py-3 text-gray-500">{opVessels.length}</td>
                    <td className="px-4 py-3"><StatusBadge status={comp?.status || 'pending'} /></td>
                    <td className="px-4 py-3 text-gray-500">{comp?.lastInspection}</td>
                    <td className="px-4 py-3 text-gray-500">{op.rating}/5</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setExpanded(expanded === op.id ? null : op.id)} className="text-xs text-banca-600 font-medium cursor-pointer">
                        {expanded === op.id ? 'Hide' : 'Details'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-gray-100">
          {operators.map(op => {
            const comp = complianceDetails[op.id]
            const opVessels = vessels.filter(v => v.operator_id === op.id)
            return (
              <div key={op.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{op.name}</p>
                  <StatusBadge status={comp?.status || 'pending'} />
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span>{opVessels.length} vessels</span>
                  <span>{op.rating}/5 rating</span>
                  <span>{comp?.lastInspection}</span>
                </div>
                <button onClick={() => setExpanded(expanded === op.id ? null : op.id)} className="text-xs text-banca-600 font-medium cursor-pointer">
                  {expanded === op.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            )
          })}
        </div>

        {expanded && (() => {
          const op = operators.find(o => o.id === expanded)
          const comp = complianceDetails[expanded]
          const opVessels = vessels.filter(v => v.operator_id === expanded)
          return (
            <div className="border-t border-gray-100 p-5 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900">{op?.name} — Compliance Details</h4>
                <StatusBadge status={comp?.status || 'pending'} />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="bg-white rounded-lg p-3 text-center"><p className="text-lg font-bold text-gray-900">{comp?.violations || 0}</p><p className="text-xs text-gray-500">Violations</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><p className="text-lg font-bold text-gray-900">{op?.rating}/5</p><p className="text-xs text-gray-500">Rating</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><p className="text-lg font-bold text-gray-900">{opVessels.length}</p><p className="text-xs text-gray-500">Vessels</p></div>
                <div className="bg-white rounded-lg p-3 text-center"><p className="text-sm font-medium text-gray-900">{comp?.lastInspection}</p><p className="text-xs text-gray-500">Last Inspection</p></div>
              </div>
              <h5 className="text-xs font-semibold text-gray-500 mb-2">REGISTERED VESSELS</h5>
              <div className="space-y-2">
                {opVessels.map(v => (
                  <div key={v.id} className="bg-white rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-gray-400">{v.registration_number} · Cap: {v.capacity_passengers} pax</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Violations Log</h3>
        <div className="space-y-3">
          {violations.map((v, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{v.type}</p>
                <p className="text-xs text-gray-400">{v.date} · {v.operator} · {v.vessel}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={v.severity} />
                <span className={`text-xs font-medium ${v.status === 'open' ? 'text-red-600' : 'text-green-600'}`}>{v.status === 'open' ? 'Open' : 'Resolved'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
