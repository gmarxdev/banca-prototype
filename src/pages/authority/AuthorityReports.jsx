import { useState } from 'react'
import { Download } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import stats from '../../data/dashboard_stats.json'

export default function AuthorityReports() {
  const [period, setPeriod] = useState('monthly')
  const data = stats[period] || stats.monthly

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Reports & Analytics</h1>
        <button onClick={() => toast.success('Report generated')} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"><Download className="w-4 h-4" /> Generate Report</button>
      </div>

      <div className="flex gap-2 mb-6">
        {['daily', 'weekly', 'monthly'].map(p => (
          <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer capitalize ${period === p ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{p}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[['Total Passengers', data.passengers.toLocaleString()], ['Cargo Shipments', data.cargo_shipments], ['Revenue', `₱${(data.revenue / 1000).toFixed(0)}K`], ['Avg Occupancy', `${data.average_occupancy}%`]].map(([l, v]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-2xl font-bold text-gray-900">{v}</p>
            <p className="text-xs text-gray-500 mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Passenger Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats.passenger_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.revenue_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Route Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-100">
              <th className="text-left py-2 text-xs font-semibold text-gray-500">Route</th>
              <th className="text-right py-2 text-xs font-semibold text-gray-500">Passengers</th>
              <th className="text-right py-2 text-xs font-semibold text-gray-500">Share</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {stats.route_breakdown.map(r => (
                <tr key={r.route}>
                  <td className="py-2 font-medium">{r.route}</td>
                  <td className="py-2 text-right text-gray-500">{r.passengers}</td>
                  <td className="py-2 text-right text-gray-500">{r.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Safety Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div><p className="text-2xl font-bold text-green-600">0</p><p className="text-xs text-gray-500">Incidents</p></div>
          <div><p className="text-2xl font-bold text-banca-600">100%</p><p className="text-xs text-gray-500">Advisory Compliance</p></div>
          <div><p className="text-2xl font-bold text-banca-600">94%</p><p className="text-xs text-gray-500">Inspection Rate</p></div>
        </div>
      </div>
    </div>
  )
}
