import { useState } from 'react'
import { AlertTriangle, Info, CloudRain, Anchor, ChevronDown, ChevronUp } from 'lucide-react'
import advisories from '../../data/advisories.json'
import ports from '../../data/ports.json'

const typeIcons = { weather: CloudRain, safety: AlertTriangle, port_update: Anchor }
const severityColors = { info: 'bg-blue-50 border-blue-200 text-blue-700', warning: 'bg-yellow-50 border-yellow-200 text-yellow-700', critical: 'bg-red-50 border-red-200 text-red-700' }
const filterTabs = ['All', 'Weather', 'Safety', 'Port Updates']

export default function PassengerAdvisories() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const filtered = advisories.filter(a => {
    if (filter === 'All') return true
    if (filter === 'Weather') return a.type === 'weather'
    if (filter === 'Safety') return a.type === 'safety'
    return a.type === 'port_update'
  })

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-4 pt-4">Travel Advisories</h1>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {filterTabs.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer ${filter === t ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12"><Info className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-sm text-gray-400">No active advisories. Safe travels!</p></div>
      ) : (
        <div className="space-y-3">
          {filtered.map(a => {
            const Icon = typeIcons[a.type] || Info
            const colors = severityColors[a.severity] || severityColors.info
            const isExpanded = expanded === a.id
            return (
              <button key={a.id} onClick={() => setExpanded(isExpanded ? null : a.id)}
                className={`w-full text-left rounded-xl border p-4 cursor-pointer transition-colors ${colors}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-medium uppercase">{a.type.replace('_', ' ')}</span>
                      <p className="font-semibold text-sm mt-0.5">{a.title}</p>
                      <p className="text-xs opacity-70 mt-1">Issued: {new Date(a.issued_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                </div>
                {isExpanded && (
                  <div className="mt-3 ml-8 space-y-2">
                    <p className="text-sm leading-relaxed">{a.description}</p>
                    {a.affected_ports.length > 0 && (
                      <p className="text-xs"><strong>Affected Ports:</strong> {a.affected_ports.map(portName).join(', ')}</p>
                    )}
                    <p className="text-xs"><strong>Expires:</strong> {new Date(a.expires_at).toLocaleDateString()}</p>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
