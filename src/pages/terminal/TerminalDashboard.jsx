import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Ship, Package, Anchor, ScanLine, Ticket, PackagePlus, ClipboardList, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import StatCard from '../../components/shared/StatCard'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import vessels from '../../data/vessels.json'
import ports from '../../data/ports.json'
import schedules from '../../data/schedules.json'

const portMap = Object.fromEntries(ports.map(p => [p.id, p.name]))
const vesselMap = Object.fromEntries(vessels.map(v => [v.id, v.name]))

const todaySchedules = [
  { id: 1, time: '06:00 AM', vessel: 'MV Island Explorer', route: 'Surigao → Dapa', status: 'completed', passengers: 58 },
  { id: 2, time: '07:00 AM', vessel: 'MV Wave Rider', route: 'Surigao → San Jose', status: 'completed', passengers: 42 },
  { id: 3, time: '08:00 AM', vessel: 'MV Siargao Star', route: 'Surigao → Dapa', status: 'boarding', passengers: 65 },
  { id: 4, time: '10:00 AM', vessel: 'MV Pacific Sun', route: 'Surigao → Dapa', status: 'scheduled', passengers: 30 },
  { id: 5, time: '11:00 AM', vessel: 'MV Dinagat Pride', route: 'Surigao → San Jose', status: 'scheduled', passengers: 30 },
  { id: 6, time: '01:00 PM', vessel: 'MV Surigao Express', route: 'Surigao → Dapa', status: 'scheduled', passengers: 97 },
  { id: 7, time: '03:00 PM', vessel: 'MV Ocean Breeze', route: 'Surigao → Dapa', status: 'scheduled', passengers: 42 },
]

const recentActivity = [
  { id: 1, action: 'Boarding pass scanned', detail: 'BANCA-2025-00108', time: '8:15 AM', type: 'scan' },
  { id: 2, action: 'Ticket issued', detail: 'Walk-in #247 - Pedro Santos', time: '8:12 AM', type: 'ticket' },
  { id: 3, action: 'Cargo received', detail: 'BNCA-CRG-20250614C - 12kg', time: '8:05 AM', type: 'cargo' },
  { id: 4, action: 'Boarding pass scanned', detail: 'BANCA-2025-00105', time: '7:58 AM', type: 'scan' },
  { id: 5, action: 'Cargo loaded', detail: 'BNCA-CRG-20250613B → MV Siargao Star', time: '7:45 AM', type: 'cargo' },
]

const activityIcons = {
  scan: CheckCircle,
  ticket: Ticket,
  cargo: Package,
}

const activityColors = {
  scan: 'text-green-500',
  ticket: 'text-banca-500',
  cargo: 'text-indigo-500',
}

export default function TerminalDashboard() {
  const navigate = useNavigate()

  const scheduleColumns = [
    { key: 'time', label: 'Time' },
    { key: 'vessel', label: 'Vessel' },
    { key: 'route', label: 'Route' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'passengers',
      label: 'Passengers',
      render: (val) => <span className="font-medium">{val} booked</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex gap-2">
          {row.status === 'boarding' && (
            <button
              onClick={() => navigate('/terminal/boarding')}
              className="text-xs px-2.5 py-1 bg-banca-50 text-banca-700 rounded-lg font-medium hover:bg-banca-100 transition-colors cursor-pointer"
            >
              Board
            </button>
          )}
          <button
            onClick={() => navigate('/terminal/manifests')}
            className="text-xs px-2.5 py-1 bg-gray-50 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Manifest
          </button>
        </div>
      ),
    },
  ]

  const quickActions = [
    { label: 'Scan Boarding Pass', icon: ScanLine, color: 'bg-banca-50 text-banca-700 hover:bg-banca-100', path: '/terminal/boarding' },
    { label: 'Issue Ticket', icon: Ticket, color: 'bg-green-50 text-green-700 hover:bg-green-100', path: '/terminal/ticketing' },
    { label: 'Receive Cargo', icon: PackagePlus, color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100', path: '/terminal/cargo-receive' },
    { label: 'View Manifest', icon: ClipboardList, color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100', path: '/terminal/manifests' },
  ]

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Surigao City Port - Today's Operations"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Today's Passengers" value={127} color="blue" change={8} />
        <StatCard icon={Ship} label="Departures Today" value={12} color="green" change={0} />
        <StatCard icon={Package} label="Cargo Received" value={23} color="yellow" change={12} />
        <StatCard icon={Anchor} label="Active Vessels" value={8} color="cyan" />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-colors cursor-pointer ${action.color}`}
            >
              <action.icon className="w-5 h-5 shrink-0" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Today's Schedule</h2>
        <DataTable columns={scheduleColumns} data={todaySchedules} />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h2>
        <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-50">
          {recentActivity.map((item) => {
            const Icon = activityIcons[item.type]
            return (
              <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                <div className={`shrink-0 ${activityColors[item.type]}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
