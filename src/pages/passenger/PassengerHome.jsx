import { Link, useNavigate } from 'react-router-dom'
import {
  Bell,
  AlertTriangle,
  Ticket,
  Package,
  QrCode,
  Cloud,
  Waves,
  ChevronRight,
  MapPin,
  Clock,
  Ship,
  ArrowRight,
  Anchor,
} from 'lucide-react'
import advisories from '../../data/advisories.json'
import bookings from '../../data/bookings.json'
import schedules from '../../data/schedules.json'
import ports from '../../data/ports.json'
import vessels from '../../data/vessels.json'

const portMap = Object.fromEntries(ports.map((p) => [p.id, p]))
const vesselMap = Object.fromEntries(vessels.map((v) => [v.id, v]))
const scheduleMap = Object.fromEntries(schedules.map((s) => [s.id, s]))

const activeAdvisory = advisories.find((a) => a.status === 'active' && a.severity !== 'info')

const upcomingBooking = bookings.find(
  (b) => b.passenger_id === 'u1' && (b.booking_status === 'confirmed' || b.booking_status === 'boarding')
)

const mockNotifications = [
  {
    id: 1,
    title: 'Booking Confirmed',
    message: 'Your trip to Siargao on Jun 15 is confirmed.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Weather Advisory',
    message: 'Moderate seas expected in Surigao Strait.',
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Trip Completed',
    message: 'Your trip to Dinagat has been completed.',
    time: '2 days ago',
    unread: false,
  },
]

const popularRoutes = [
  { from: 'surigao', to: 'dapa', label: 'Surigao - Siargao', fare: 350 },
  { from: 'surigao', to: 'san-jose', label: 'Surigao - Dinagat', fare: 280 },
]

export default function PassengerHome() {
  const navigate = useNavigate()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const upcomingSchedule = upcomingBooking ? scheduleMap[upcomingBooking.schedule_id] : null
  const upcomingVessel = upcomingSchedule ? vesselMap[upcomingSchedule.vessel_id] : null
  const upcomingOrigin = upcomingSchedule ? portMap[upcomingSchedule.origin_port] : null
  const upcomingDest = upcomingSchedule ? portMap[upcomingSchedule.destination_port] : null

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{getGreeting()}, Juan!</h1>
          <p className="text-sm text-gray-500">Where are you headed today?</p>
        </div>
        <button
          onClick={() => navigate('/passenger/notifications')}
          className="relative p-2 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
            2
          </span>
        </button>
      </div>

      {/* Advisory Banner */}
      {activeAdvisory && (
        <Link
          to="/passenger/advisories"
          className="block mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-800">{activeAdvisory.title}</p>
              <p className="text-xs text-amber-700 mt-0.5 line-clamp-2">
                {activeAdvisory.description.slice(0, 100)}...
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          </div>
        </Link>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/passenger/book')}
            className="flex items-center gap-3 p-3 bg-banca-50 rounded-xl hover:bg-banca-100 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 bg-banca-600 rounded-lg flex items-center justify-center">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Book a Trip</p>
              <p className="text-[11px] text-gray-500">Find schedules</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/cargo/track')}
            className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Track Cargo</p>
              <p className="text-[11px] text-gray-500">Shipment status</p>
            </div>
          </button>
        </div>
      </div>

      {/* Upcoming Trip */}
      {upcomingBooking && upcomingSchedule && (
        <div
          onClick={() => navigate(`/passenger/trips/${upcomingBooking.id}`)}
          className="bg-white rounded-xl border border-gray-100 p-4 mb-4 cursor-pointer hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900">Upcoming Trip</h2>
            <span className="px-2 py-0.5 bg-banca-50 text-banca-700 text-xs font-medium rounded-full">
              {upcomingBooking.booking_status === 'boarding' ? 'Boarding' : 'Confirmed'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500">{upcomingOrigin?.code}</p>
                  <p className="text-sm font-bold text-gray-900">{upcomingSchedule.departure_time}</p>
                </div>
                <div className="flex-1 flex items-center gap-1">
                  <div className="h-px flex-1 bg-gray-200" />
                  <Ship className="w-3.5 h-3.5 text-banca-500" />
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">{upcomingDest?.code}</p>
                  <p className="text-sm font-bold text-gray-900">{upcomingSchedule.arrival_time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Anchor className="w-3 h-3" />
                  {upcomingVessel?.name}
                </span>
                <span>{upcomingBooking.passengers.length} passenger(s)</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
              <QrCode className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Weather Widget */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-4 mb-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/70 mb-1">Surigao Strait Conditions</p>
            <div className="flex items-center gap-2">
              <Cloud className="w-8 h-8" />
              <div>
                <p className="text-xl font-bold">28°C</p>
                <p className="text-xs text-white/80">Partly Cloudy</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-white/80 mb-1">
              <Waves className="w-3.5 h-3.5" />
              Sea Conditions
            </div>
            <p className="text-sm font-semibold">Moderate</p>
            <p className="text-[11px] text-white/70">Wave height: 1.2m</p>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Recent Notifications</h2>
          <Link to="/passenger/notifications" className="text-xs text-banca-600 font-medium hover:text-banca-700">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {mockNotifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${notif.unread ? 'bg-banca-500' : 'bg-transparent'}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{notif.message}</p>
              </div>
              <span className="text-[11px] text-gray-400 whitespace-nowrap">{notif.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Routes */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Popular Routes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularRoutes.map((route) => (
            <button
              key={route.label}
              onClick={() =>
                navigate(
                  `/passenger/book/results?from=${route.from}&to=${route.to}&date=${new Date().toISOString().split('T')[0]}&passengers=1`
                )
              }
              className="bg-white rounded-xl border border-gray-100 p-3 text-left hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3 text-banca-500" />
                <ArrowRight className="w-3 h-3 text-gray-300" />
                <MapPin className="w-3 h-3 text-emerald-500" />
              </div>
              <p className="text-sm font-semibold text-gray-900">{route.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">From PHP {route.fare}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
