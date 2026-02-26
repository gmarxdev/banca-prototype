import { useState } from 'react'
import { Users, Building2, Ship, Clock, UserCheck, DollarSign, Navigation, Loader, Activity, Database, MessageSquare, CreditCard, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PageHeader from '../../components/shared/PageHeader'
import StatCard from '../../components/shared/StatCard'
import dashboardStats from '../../data/dashboard_stats.json'

const recentActivity = [
  { id: 1, action: 'New user registered', detail: 'Ana Garcia (Passenger)', time: '2 min ago', type: 'user' },
  { id: 2, action: 'Booking confirmed', detail: 'BANCA-2025-00115 - Dapa to Gen. Luna', time: '8 min ago', type: 'booking' },
  { id: 3, action: 'Operator verified', detail: 'Pacific Maritime Services approved', time: '15 min ago', type: 'operator' },
  { id: 4, action: 'Vessel status updated', detail: 'MV Coral Queen -> Maintenance', time: '32 min ago', type: 'vessel' },
  { id: 5, action: 'Advisory published', detail: 'Tropical Depression Warning issued', time: '1 hr ago', type: 'advisory' },
  { id: 6, action: 'Schedule modified', detail: 'S16 marked as Full', time: '1.5 hrs ago', type: 'schedule' },
  { id: 7, action: 'Cargo delivered', detail: 'BNCA-CRG-20250601 completed', time: '2 hrs ago', type: 'cargo' },
  { id: 8, action: 'System config updated', detail: 'Base fare rate adjusted', time: '3 hrs ago', type: 'config' },
]

const activityColors = {
  user: 'bg-blue-100 text-blue-600',
  booking: 'bg-green-100 text-green-600',
  operator: 'bg-indigo-100 text-indigo-600',
  vessel: 'bg-yellow-100 text-yellow-600',
  advisory: 'bg-red-100 text-red-600',
  schedule: 'bg-cyan-100 text-cyan-600',
  cargo: 'bg-orange-100 text-orange-600',
  config: 'bg-purple-100 text-purple-600',
}

const systemServices = [
  { name: 'API Server', status: 'green' },
  { name: 'Database', status: 'green' },
  { name: 'SMS Gateway', status: 'green' },
  { name: 'Payment Gateway', status: 'green' },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('daily')

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Platform overview and system health" />

      {/* Primary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Users" value="11" color="blue" change={12} />
        <StatCard icon={Building2} label="Active Operators" value="5" color="indigo" change={8} />
        <StatCard icon={Ship} label="Vessels" value="10" color="cyan" change={5} />
        <StatCard icon={Clock} label="Uptime" value="99.9%" color="green" />
      </div>

      {/* Platform Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center">
              <UserCheck className="w-4.5 h-4.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">127</p>
              <p className="text-xs text-gray-500">Today's Passengers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4.5 h-4.5 text-yellow-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{'\u20B1'}48,500</p>
              <p className="text-xs text-gray-500">Revenue</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
              <Navigation className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Active Trips</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center">
              <Loader className="w-4.5 h-4.5 text-orange-600" />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">2</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Revenue Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Last 7 days</p>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardStats.revenue_trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value) => [`\u20B1${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            {systemServices.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${service.status === 'green' ? 'bg-green-500' : service.status === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-gray-700">{service.name}</span>
                </div>
                <span className={`text-xs font-medium ${service.status === 'green' ? 'text-green-600' : service.status === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {service.status === 'green' ? 'Operational' : service.status === 'yellow' ? 'Degraded' : 'Down'}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg Response</span>
                <span className="font-medium text-gray-900">45ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">CPU Usage</span>
                <span className="font-medium text-gray-900">23%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Memory</span>
                <span className="font-medium text-gray-900">1.2 GB / 4 GB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Disk</span>
                <span className="font-medium text-gray-900">18 GB / 50 GB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
          <Activity className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-3">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${activityColors[item.type]}`}>
                <Activity className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-500 truncate">{item.detail}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
