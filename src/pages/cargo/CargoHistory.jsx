import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package } from 'lucide-react'
import cargoData from '../../data/cargo.json'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'

export default function CargoHistory() {
  const [tab, setTab] = useState('sent')
  const [statusFilter, setStatusFilter] = useState('all')
  const navigate = useNavigate()
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const userMobile = '09171234567'
  let items = tab === 'sent'
    ? cargoData.filter(c => c.sender.mobile === userMobile)
    : cargoData.filter(c => c.recipient.mobile === userMobile)

  if (statusFilter === 'in_transit') items = items.filter(c => ['in_transit', 'loaded'].includes(c.status))
  if (statusFilter === 'delivered') items = items.filter(c => c.status === 'delivered')

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-4 pt-4">Shipment History</h1>
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
        {['sent', 'received'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 text-sm font-medium py-2 rounded-md cursor-pointer capitalize ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>{t}</button>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        {['all', 'in_transit', 'delivered'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer ${statusFilter === s ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
            {s === 'all' ? 'All' : s === 'in_transit' ? 'In Transit' : 'Delivered'}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Package} title={`No ${tab} shipments`} description={tab === 'sent' ? 'Send your first cargo!' : 'No packages received yet.'} />
      ) : (
        <div className="space-y-3">
          {items.map(c => (
            <button key={c.id} onClick={() => navigate(`/cargo/shipment/${c.id}`)}
              className="w-full bg-white rounded-xl border border-gray-100 p-4 text-left cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-500">{c.tracking_reference}</span>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-sm font-semibold text-gray-900">{portName(c.origin_port)} → {portName(c.destination_port)}</p>
              <p className="text-xs text-gray-500 mt-1">{c.description}</p>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{tab === 'sent' ? `To: ${c.recipient.name}` : `From: ${c.sender.name}`}</span>
                <span>{new Date(c.created_at).toLocaleDateString()}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
