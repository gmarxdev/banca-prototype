import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ship, Ticket } from 'lucide-react'
import bookings from '../../data/bookings.json'
import schedules from '../../data/schedules.json'
import vessels from '../../data/vessels.json'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'

const tabs = [
  { id: 'upcoming', label: 'Upcoming', statuses: ['confirmed', 'boarding', 'in_transit'] },
  { id: 'completed', label: 'Completed', statuses: ['completed'] },
  { id: 'cancelled', label: 'Cancelled', statuses: ['cancelled'] },
]

export default function PassengerTrips() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const navigate = useNavigate()
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const myBookings = bookings.filter(b => b.passenger_id === 'u1')
  const currentStatuses = tabs.find(t => t.id === activeTab)?.statuses || []
  const filtered = myBookings.filter(b => currentStatuses.includes(b.booking_status))

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-4 pt-4">My Trips</h1>
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex-1 text-sm font-medium py-2 rounded-md cursor-pointer transition-colors ${activeTab === t.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={activeTab === 'upcoming' ? Ticket : Ship} title={activeTab === 'upcoming' ? 'No upcoming trips' : `No ${activeTab} trips`}
          description={activeTab === 'upcoming' ? 'Book your next adventure!' : undefined} />
      ) : (
        <div className="space-y-3">
          {filtered.map(b => {
            const s = schedules.find(sc => sc.id === b.schedule_id)
            const v = vessels.find(vl => vl.id === s?.vessel_id)
            return (
              <button key={b.id} onClick={() => navigate(`/passenger/trips/${b.id}`)}
                className="w-full bg-white rounded-xl border border-gray-100 p-4 text-left cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <StatusBadge status={b.booking_status} />
                  <span className="text-xs text-gray-400">{b.reference_number}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{portName(s?.origin_port)} → {portName(s?.destination_port)}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(b.created_at).toLocaleDateString()} · {s?.departure_time} · {v?.name}</p>
                <p className="text-xs text-gray-400 mt-1">{b.passengers.length} passenger{b.passengers.length > 1 ? 's' : ''}</p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
