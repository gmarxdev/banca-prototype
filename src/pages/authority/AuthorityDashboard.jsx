import { Ship, Users, AlertTriangle, ShieldCheck } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import StatCard from '../../components/shared/StatCard'
import StatusBadge from '../../components/shared/StatusBadge'
import stats from '../../data/dashboard_stats.json'
import advisories from '../../data/advisories.json'
import ports from '../../data/ports.json'

export default function AuthorityDashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Ship} label="Active Vessels" value="8" color="blue" change={5} />
        <StatCard icon={Users} label="Passengers Today" value={stats.daily.passengers} color="green" change={12} />
        <StatCard icon={AlertTriangle} label="Active Advisories" value={advisories.filter(a => a.status === 'active').length} color="yellow" />
        <StatCard icon={ShieldCheck} label="Compliance Rate" value="94%" color="indigo" change={2} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Passenger Flow (7 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={stats.passenger_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#2563EB" fill="#DBEAFE" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Route Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.route_breakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="route" type="category" tick={{ fontSize: 10 }} width={120} />
              <Tooltip />
              <Bar dataKey="passengers" fill="#2563EB" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Port Status</h3>
          <div className="space-y-3">
            {ports.map(p => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div><p className="text-sm font-medium text-gray-900">{p.name}</p><p className="text-xs text-gray-400">{p.code}</p></div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Active Advisories</h3>
          <div className="space-y-3">
            {advisories.filter(a => a.status === 'active').map(a => (
              <div key={a.id} className={`p-3 rounded-lg ${a.severity === 'critical' ? 'bg-red-50' : a.severity === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge status={a.severity} />
                  <span className="text-xs text-gray-500 capitalize">{a.type.replace('_', ' ')}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{a.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
