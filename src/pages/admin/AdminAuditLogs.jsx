import { useState } from 'react'
import { Search, Download, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const auditLogs = [
  { id: 1, timestamp: '2025-06-14 14:32:10', user: 'System Administrator', role: 'admin', action: 'user_update', details: 'Updated user status: Elena Torres → active', ip: '192.168.1.10' },
  { id: 2, timestamp: '2025-06-14 13:15:22', user: 'Roberto Santos', role: 'operator', action: 'schedule_create', details: 'Created new schedule: Surigao → Dapa, 15:00', ip: '192.168.1.45' },
  { id: 3, timestamp: '2025-06-14 12:05:08', user: 'Gloria Reyes', role: 'terminal', action: 'booking_verify', details: 'Verified boarding: BANCA-2025-00108', ip: '192.168.1.20' },
  { id: 4, timestamp: '2025-06-14 11:48:33', user: 'Dir. Ramon Cruz', role: 'authority', action: 'advisory_create', details: 'Published weather advisory: Tropical Depression Warning', ip: '192.168.1.50' },
  { id: 5, timestamp: '2025-06-14 10:22:15', user: 'System Administrator', role: 'admin', action: 'operator_approve', details: 'Approved operator: Blue Waves Shipping', ip: '192.168.1.10' },
  { id: 6, timestamp: '2025-06-14 09:15:44', user: 'Miguel Fernandez', role: 'crew', action: 'status_update', details: 'Vessel status changed: MV Island Explorer → departed', ip: '10.0.0.5' },
  { id: 7, timestamp: '2025-06-13 17:30:00', user: 'System Administrator', role: 'admin', action: 'system_config', details: 'Updated fare settings: base cargo rate ₱15/kg → ₱18/kg', ip: '192.168.1.10' },
  { id: 8, timestamp: '2025-06-13 16:45:12', user: 'Gloria Reyes', role: 'terminal', action: 'cargo_receive', details: 'Received cargo: BNCA-CRG-20250613B, Medical supplies', ip: '192.168.1.20' },
  { id: 9, timestamp: '2025-06-13 14:20:30', user: 'Roberto Santos', role: 'operator', action: 'crew_assign', details: 'Assigned crew: Miguel Fernandez → MV Siargao Star', ip: '192.168.1.45' },
  { id: 10, timestamp: '2025-06-13 11:05:18', user: 'System', role: 'system', action: 'backup', details: 'Automated daily backup completed successfully', ip: 'localhost' },
  { id: 11, timestamp: '2025-06-13 08:00:00', user: 'System', role: 'system', action: 'report_generate', details: 'Daily operations report generated and sent', ip: 'localhost' },
  { id: 12, timestamp: '2025-06-12 16:10:05', user: 'System Administrator', role: 'admin', action: 'user_create', details: 'Created new user: Carlos Mendoza (passenger)', ip: '192.168.1.10' },
  { id: 13, timestamp: '2025-06-12 14:55:40', user: 'Dir. Ramon Cruz', role: 'authority', action: 'port_update', details: 'Port status changed: Dapa Port → maintenance', ip: '192.168.1.50' },
  { id: 14, timestamp: '2025-06-12 10:30:22', user: 'Gloria Reyes', role: 'terminal', action: 'manifest_export', details: 'Exported manifest: MV Island Explorer, Jun 12 06:00', ip: '192.168.1.20' },
  { id: 15, timestamp: '2025-06-12 09:00:10', user: 'System Administrator', role: 'admin', action: 'login', details: 'Admin login successful', ip: '192.168.1.10' },
]

const actionColors = {
  user_update: 'bg-blue-50 text-blue-600',
  user_create: 'bg-blue-50 text-blue-600',
  schedule_create: 'bg-green-50 text-green-600',
  booking_verify: 'bg-indigo-50 text-indigo-600',
  advisory_create: 'bg-orange-50 text-orange-600',
  operator_approve: 'bg-green-50 text-green-600',
  status_update: 'bg-yellow-50 text-yellow-600',
  system_config: 'bg-purple-50 text-purple-600',
  cargo_receive: 'bg-cyan-50 text-cyan-600',
  crew_assign: 'bg-indigo-50 text-indigo-600',
  backup: 'bg-gray-100 text-gray-600',
  report_generate: 'bg-gray-100 text-gray-600',
  port_update: 'bg-yellow-50 text-yellow-600',
  manifest_export: 'bg-cyan-50 text-cyan-600',
  login: 'bg-green-50 text-green-600',
}

const roleColors = {
  admin: 'bg-red-50 text-red-600',
  operator: 'bg-blue-50 text-blue-600',
  terminal: 'bg-green-50 text-green-600',
  authority: 'bg-purple-50 text-purple-600',
  crew: 'bg-yellow-50 text-yellow-600',
  system: 'bg-gray-100 text-gray-500',
}

export default function AdminAuditLogs() {
  const [search, setSearch] = useState('')
  const [filterAction, setFilterAction] = useState('all')

  const actions = ['all', ...new Set(auditLogs.map(l => l.action))]

  const filtered = auditLogs.filter(l => {
    const matchAction = filterAction === 'all' || l.action === filterAction
    const matchSearch = !search ||
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase())
    return matchAction && matchSearch
  })

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Audit Logs</h1>
        <button onClick={() => toast.success('Logs exported')} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer">
          <Download className="w-4 h-4" /> Export Logs
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[['Total Events', auditLogs.length], ['Today', auditLogs.filter(l => l.timestamp.startsWith('2025-06-14')).length], ['Admin Actions', auditLogs.filter(l => l.role === 'admin').length], ['System Events', auditLogs.filter(l => l.role === 'system').length]].map(([l, v]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{v}</p>
            <p className="text-xs text-gray-500">{l}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select value={filterAction} onChange={e => setFilterAction(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-banca-500 outline-none appearance-none bg-white cursor-pointer">
            {actions.map(a => <option key={a} value={a}>{a === 'all' ? 'All Actions' : a.replace(/_/g, ' ')}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Timestamp</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">User</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Action</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Details</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap font-mono">{l.timestamp}</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{l.user}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full capitalize ${roleColors[l.role] || 'bg-gray-100 text-gray-600'}`}>{l.role}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${actionColors[l.action] || 'bg-gray-100 text-gray-600'}`}>{l.action.replace(/_/g, ' ')}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{l.details}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-gray-100">
          {filtered.map(l => (
            <div key={l.id} className="p-4">
              <div className="flex items-start justify-between mb-1.5">
                <p className="text-sm font-medium text-gray-900">{l.user}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${roleColors[l.role] || 'bg-gray-100 text-gray-600'}`}>{l.role}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{l.details}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full ${actionColors[l.action] || 'bg-gray-100 text-gray-600'}`}>{l.action.replace(/_/g, ' ')}</span>
                <span className="text-[10px] text-gray-400 font-mono">{l.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && <div className="text-center py-8 text-sm text-gray-400">No logs found</div>}
      </div>
    </div>
  )
}
