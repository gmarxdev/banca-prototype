import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send, Search, Package, ArrowRight, TrendingUp, Clock } from 'lucide-react'
import StatusBadge from '../../components/shared/StatusBadge'
import cargoData from '../../data/cargo.json'
import ports from '../../data/ports.json'

const portMap = Object.fromEntries(ports.map((p) => [p.id, p]))

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function CargoHome() {
  const navigate = useNavigate()
  const [userName] = useState('Roberto')

  const activeStatuses = ['in_transit', 'loaded', 'received', 'ready_for_pickup']
  const activeShipments = cargoData.filter((c) => activeStatuses.includes(c.status))
  const inTransitCount = cargoData.filter((c) => c.status === 'in_transit').length
  const loadedCount = cargoData.filter((c) => c.status === 'loaded').length
  const receivedCount = cargoData.filter((c) => c.status === 'received').length

  const recentShipments = [...cargoData]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3)

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      {/* Greeting Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-sm text-gray-500 mt-1">Manage your cargo shipments</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => navigate('/cargo/send')}
          className="flex items-center gap-3 p-4 bg-banca-600 hover:bg-banca-700 text-white rounded-xl transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold">Send Cargo</p>
            <p className="text-xs text-banca-200">New shipment</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/cargo/track')}
          className="flex items-center gap-3 p-4 bg-white border border-gray-100 hover:border-banca-200 rounded-xl transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 bg-banca-50 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-banca-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">Track</p>
            <p className="text-xs text-gray-500">Find shipment</p>
          </div>
        </button>
      </div>

      {/* Active Shipments Card */}
      <div
        onClick={() => navigate('/cargo/history')}
        className="bg-white border border-gray-100 rounded-xl p-4 mb-4 cursor-pointer hover:border-banca-200 transition-colors"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-banca-600" />
            <h2 className="text-sm font-semibold text-gray-900">Active Shipments</h2>
          </div>
          <div className="flex items-center gap-1 text-banca-600">
            <span className="text-2xl font-bold">{activeShipments.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
            <span>{inTransitCount} In Transit</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            <span>{loadedCount} Loaded</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
            <span>{receivedCount} Received</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <button
            onClick={() => navigate('/cargo/history')}
            className="text-xs text-banca-600 hover:text-banca-700 font-medium flex items-center gap-0.5 cursor-pointer"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-3">
          {recentShipments.map((shipment) => (
            <div
              key={shipment.id}
              onClick={() => navigate(`/cargo/shipment/${shipment.id}`)}
              className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {shipment.tracking_reference}
                  </p>
                  <StatusBadge status={shipment.status} />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {portMap[shipment.origin_port]?.code || shipment.origin_port} {' -> '}{' '}
                  {portMap[shipment.destination_port]?.code || shipment.destination_port}
                  {' | '}{formatDate(shipment.created_at)}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Cargo Rates Reference */}
      <div className="bg-gradient-to-br from-banca-50 to-banca-100 border border-banca-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-banca-600" />
          <h2 className="text-sm font-semibold text-banca-900">Cargo Rates</h2>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-banca-700">Standard Rate</span>
            <span className="font-semibold text-banca-900">P15/kg</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-banca-700">Express Rate</span>
            <span className="font-semibold text-banca-900">P25/kg</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-banca-700">Minimum Charge</span>
            <span className="font-semibold text-banca-900">P150</span>
          </div>
        </div>
      </div>
    </div>
  )
}
