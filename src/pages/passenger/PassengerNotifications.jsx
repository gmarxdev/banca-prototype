import { useState } from 'react'
import { Ticket, AlertTriangle, CreditCard, CheckCircle2, Bell } from 'lucide-react'

const initialNotifs = [
  { id: 1, type: 'booking_confirmed', icon: Ticket, title: 'Booking Confirmed', message: 'Your booking BANCA-2025-00101 for Surigao to Dapa has been confirmed.', time: '2 hours ago', read: false },
  { id: 2, type: 'advisory_alert', icon: AlertTriangle, title: 'Weather Advisory', message: 'Tropical depression warning issued for Surigao Strait area.', time: '4 hours ago', read: false },
  { id: 3, type: 'payment_received', icon: CreditCard, title: 'Payment Received', message: 'GCash payment of ₱1,100 for booking BANCA-2025-00102 confirmed.', time: '1 day ago', read: false },
  { id: 4, type: 'trip_reminder', icon: Bell, title: 'Trip Tomorrow', message: 'Reminder: Your trip from Surigao to Dapa departs at 06:00 AM tomorrow.', time: '1 day ago', read: true },
  { id: 5, type: 'trip_completed', icon: CheckCircle2, title: 'Trip Completed', message: 'Your trip from Surigao to San Jose has been completed. Thank you for traveling with BANCA!', time: '3 days ago', read: true },
  { id: 6, type: 'advisory_alert', icon: AlertTriangle, title: 'Port Maintenance Notice', message: 'Dapa Port Pier 2 will undergo maintenance from June 15-17.', time: '4 days ago', read: true },
  { id: 7, type: 'booking_confirmed', icon: Ticket, title: 'Booking Confirmed', message: 'Your booking BANCA-2025-00103 for Surigao to San Jose has been confirmed.', time: '5 days ago', read: true },
  { id: 8, type: 'payment_received', icon: CreditCard, title: 'Payment Received', message: 'Maya payment of ₱280 for booking BANCA-2025-00103 confirmed.', time: '5 days ago', read: true },
]

export default function PassengerNotifications() {
  const [notifs, setNotifs] = useState(initialNotifs)
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })))
  const unreadCount = notifs.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <div className="flex items-center justify-between mb-4 pt-4">
        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-banca-600 font-medium cursor-pointer">Mark all read</button>
        )}
      </div>

      <div className="space-y-2">
        {notifs.map(n => (
          <div key={n.id} onClick={() => setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className={`flex items-start gap-3 bg-white rounded-xl border p-4 cursor-pointer transition-colors ${!n.read ? 'border-banca-200 bg-banca-50/30' : 'border-gray-100'}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${!n.read ? 'bg-banca-100 text-banca-600' : 'bg-gray-100 text-gray-400'}`}>
              <n.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>{n.title}</p>
                {!n.read && <div className="w-2 h-2 bg-banca-600 rounded-full mt-1.5 shrink-0" />}
              </div>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
              <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
