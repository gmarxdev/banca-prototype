import { useState } from 'react'
import { DollarSign, TrendingUp, CreditCard, Wallet, Download } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import stats from '../../data/dashboard_stats.json'
import bookings from '../../data/bookings.json'
import cargo from '../../data/cargo.json'

export default function OperatorFinancials() {
  const [period, setPeriod] = useState('monthly')
  const data = stats[period] || stats.monthly

  const passengerRevenue = bookings.filter(b => b.payment_status === 'paid').reduce((sum, b) => sum + b.total_amount, 0)
  const cargoRevenue = cargo.reduce((sum, c) => sum + c.fee, 0)
  const totalRevenue = passengerRevenue + cargoRevenue

  const transactions = [
    ...bookings.filter(b => b.payment_status === 'paid').map(b => ({
      id: b.id, type: 'passenger', ref: b.reference_number, amount: b.total_amount,
      method: b.payment_method, date: b.created_at, name: b.passengers[0]?.name
    })),
    ...cargo.map(c => ({
      id: c.id, type: 'cargo', ref: c.tracking_reference, amount: c.fee,
      method: 'cash', date: c.created_at, name: c.sender.name
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Financial Overview</h1>
        <button onClick={() => toast.success('Report downloaded')} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['daily', 'weekly', 'monthly'].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer capitalize ${period === p ? 'bg-banca-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{p}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          ['Total Revenue', `₱${(data.revenue / 1000).toFixed(0)}K`, DollarSign, 'bg-blue-50 text-blue-600'],
          ['Passenger Fares', `₱${passengerRevenue.toLocaleString()}`, CreditCard, 'bg-green-50 text-green-600'],
          ['Cargo Fees', `₱${cargoRevenue.toLocaleString()}`, Wallet, 'bg-yellow-50 text-yellow-600'],
          ['Avg per Trip', `₱${Math.round(data.revenue / (data.trips_completed || 1)).toLocaleString()}`, TrendingUp, 'bg-cyan-50 text-cyan-600'],
        ].map(([label, value, Icon, colors]) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${colors}`}><Icon className="w-4 h-4" /></div>
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.revenue_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₱${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₱${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="amount" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Passenger Volume</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={stats.passenger_trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Revenue Split</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Passenger Fares</span><span className="font-medium">{totalRevenue > 0 ? Math.round(passengerRevenue / totalRevenue * 100) : 0}%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-banca-600 h-2 rounded-full" style={{ width: `${totalRevenue > 0 ? (passengerRevenue / totalRevenue * 100) : 0}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">Cargo Fees</span><span className="font-medium">{totalRevenue > 0 ? Math.round(cargoRevenue / totalRevenue * 100) : 0}%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${totalRevenue > 0 ? (cargoRevenue / totalRevenue * 100) : 0}%` }} /></div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Methods</h3>
          <div className="space-y-2">
            {['cash', 'gcash', 'maya'].map(m => {
              const count = bookings.filter(b => b.payment_method === m && b.payment_status === 'paid').length
              return <div key={m} className="flex items-center justify-between"><span className="text-sm capitalize text-gray-600">{m}</span><span className="text-sm font-medium">{count} bookings</span></div>
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Route Revenue</h3>
          <div className="space-y-2">
            {stats.route_breakdown.slice(0, 4).map(r => (
              <div key={r.route} className="flex items-center justify-between"><span className="text-xs text-gray-600">{r.route}</span><span className="text-xs font-medium">{r.percentage}%</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Recent Transactions</h3></div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Reference</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Method</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.slice(0, 15).map(t => (
                <tr key={t.id + t.type} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs font-medium text-banca-600">{t.ref}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${t.type === 'passenger' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>{t.type}</span></td>
                  <td className="px-4 py-3 text-sm">{t.name}</td>
                  <td className="px-4 py-3 text-xs capitalize text-gray-500">{t.method}</td>
                  <td className="px-4 py-3 text-right font-medium">₱{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-gray-100">
          {transactions.slice(0, 15).map(t => (
            <div key={t.id + t.type} className="p-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-banca-600">{t.ref}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">₱{t.amount.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.type === 'passenger' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>{t.type}</span>
                <span className="text-xs capitalize text-gray-400">{t.method}</span>
                <span className="text-xs text-gray-400 ml-auto">{new Date(t.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
