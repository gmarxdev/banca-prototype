import { useState } from 'react'
import { DollarSign, Ship, Ticket, TrendingUp, Clock, Anchor, Users, ArrowUpRight, MapPin } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PageHeader from '../../components/shared/PageHeader'
import StatCard from '../../components/shared/StatCard'
import StatusBadge from '../../components/shared/StatusBadge'
import DataTable from '../../components/shared/DataTable'
import dashboardStats from '../../data/dashboard_stats.json'
import vessels from '../../data/vessels.json'
import schedules from '../../data/schedules.json'
import bookings from '../../data/bookings.json'
import ports from '../../data/ports.json'

const operatorVessels = vessels.filter((v) => v.operator_id === 'op1')
const operatorVesselIds = operatorVessels.map((v) => v.id)
const operatorSchedules = schedules.filter((s) => operatorVesselIds.includes(s.vessel_id))

const portMap = {}
ports.forEach((p) => {
  portMap[p.id] = p.name.replace(' Port', '')
})

const vesselMap = {}
vessels.forEach((v) => {
  vesselMap[v.id] = v.name
})

const operatorBookings = bookings.filter((b) => {
  const schedule = schedules.find((s) => s.id === b.schedule_id)
  return schedule && operatorVesselIds.includes(schedule.vessel_id)
})

const revenueData = dashboardStats.revenue_trend

export default function OperatorDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')

  const todayScheduleColumns = [
    {
      key: 'vessel_id',
      label: 'Vessel',
      render: (val) => <span className="font-medium text-gray-900">{vesselMap[val] || val}</span>,
    },
    {
      key: 'origin_port',
      label: 'Route',
      render: (_, row) => (
        <span className="text-gray-600">
          {portMap[row.origin_port] || row.origin_port} → {portMap[row.destination_port] || row.destination_port}
        </span>
      ),
    },
    {
      key: 'departure_time',
      label: 'Departure',
      render: (val) => <span className="font-medium">{val}</span>,
    },
    {
      key: 'arrival_time',
      label: 'Arrival',
    },
    {
      key: 'available_seats',
      label: 'Seats Left',
      render: (val, row) => {
        const vessel = operatorVessels.find((v) => v.id === row.vessel_id)
        const capacity = vessel?.capacity_passengers || 0
        return (
          <span className={val <= 5 ? 'text-red-600 font-semibold' : 'text-gray-700'}>
            {val} / {capacity}
          </span>
        )
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ]

  const recentBookingColumns = [
    {
      key: 'reference_number',
      label: 'Reference',
      render: (val) => <span className="font-mono text-xs text-banca-600">{val}</span>,
    },
    {
      key: 'passengers',
      label: 'Passenger',
      render: (val) => <span className="text-gray-900">{val?.[0]?.name || '-'}</span>,
    },
    {
      key: 'total_amount',
      label: 'Amount',
      render: (val) => <span className="font-semibold text-gray-900">P{val?.toLocaleString()}</span>,
    },
    {
      key: 'payment_status',
      label: 'Payment',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'booking_status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operator Dashboard"
        subtitle="Welcome back, Roberto. Here's your fleet overview."
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={DollarSign}
          label="Weekly Revenue"
          value="P312,000"
          change={8.2}
          color="green"
        />
        <StatCard
          icon={Ship}
          label="Active Vessels"
          value="2 / 2"
          change={0}
          color="blue"
        />
        <StatCard
          icon={Ticket}
          label="Total Bookings"
          value="156"
          change={12.5}
          color="indigo"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg Occupancy"
          value="72%"
          change={3.1}
          color="cyan"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Revenue Trend</h3>
            <p className="text-xs text-gray-500 mt-0.5">Daily revenue for the past week</p>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
            {['daily', 'weekly', 'monthly'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedPeriod === period
                    ? 'bg-white text-banca-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                tickFormatter={(val) => `P${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                }}
                formatter={(value) => [`P${value.toLocaleString()}`, 'Revenue']}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ fill: '#2563eb', r: 4 }}
                activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Schedules */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900">Today's Schedule</h3>
          </div>
          <span className="text-xs text-gray-500">{operatorSchedules.length} trips</span>
        </div>
        <DataTable columns={todayScheduleColumns} data={operatorSchedules} />
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-900">Recent Bookings</h3>
          </div>
          <button className="text-xs text-banca-600 hover:text-banca-700 font-medium flex items-center gap-1 cursor-pointer">
            View All <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <DataTable columns={recentBookingColumns} data={operatorBookings.slice(0, 5)} />
      </div>

      {/* Fleet Status Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Anchor className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Fleet Status</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {operatorVessels.map((vessel) => {
            const vesselSchedules = operatorSchedules.filter((s) => s.vessel_id === vessel.id)
            const totalSeats = vessel.capacity_passengers
            const bookedToday = vesselSchedules.reduce(
              (sum, s) => sum + (totalSeats - s.available_seats),
              0
            )

            return (
              <div
                key={vessel.id}
                className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{vessel.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{vessel.registration_number}</p>
                  </div>
                  <StatusBadge status={vessel.status} />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">{vessel.capacity_passengers}</p>
                    <p className="text-[10px] text-gray-500">Capacity</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-banca-600">{vesselSchedules.length}</p>
                    <p className="text-[10px] text-gray-500">Trips Today</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-green-600">{bookedToday}</p>
                    <p className="text-[10px] text-gray-500">Pax Booked</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {vesselSchedules.slice(0, 2).map((sched) => (
                    <div key={sched.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>
                          {portMap[sched.origin_port]} → {portMap[sched.destination_port]}
                        </span>
                      </div>
                      <span className="text-gray-500">{sched.departure_time}</span>
                    </div>
                  ))}
                  {vesselSchedules.length > 2 && (
                    <p className="text-[10px] text-gray-400 text-center">
                      +{vesselSchedules.length - 2} more trips
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
