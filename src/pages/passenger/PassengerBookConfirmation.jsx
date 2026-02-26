import { useLocation, Link } from 'react-router-dom'
import { CheckCircle2, Share2, Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import ports from '../../data/ports.json'

export default function PassengerBookConfirmation() {
  const { state } = useLocation()
  const { origin, destination, date, schedule, vessel, passengerList, paymentMethod, total } = state || {}
  const portName = (id) => ports.find(p => p.id === id)?.name || id
  const ref = `BANCA-2025-${String(Math.floor(10000 + Math.random() * 90000))}`

  return (
    <div className="min-h-screen bg-slate-50 pt-6 px-4 pb-24">
      <div className="text-center mb-6">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
        <h1 className="text-xl font-bold text-gray-900">Booking Confirmed!</h1>
        <p className="text-sm text-gray-500 mt-1">Your ticket has been sent via SMS</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className="bg-banca-600 p-4 text-center">
          <p className="text-xs text-banca-200">Booking Reference</p>
          <p className="text-lg font-bold text-white tracking-wider">{ref}</p>
        </div>
        <div className="p-6 flex justify-center">
          <QRCodeSVG value={ref} size={160} />
        </div>
        <div className="px-5 pb-5 space-y-3">
          <div className="flex justify-between text-sm"><span className="text-gray-500">Route</span><span className="font-medium text-gray-900">{portName(origin)} → {portName(destination)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Date</span><span className="font-medium text-gray-900">{date}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Time</span><span className="font-medium text-gray-900">{schedule?.departure_time} – {schedule?.arrival_time}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Vessel</span><span className="font-medium text-gray-900">{vessel?.name}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Passengers</span><span className="font-medium text-gray-900">{passengerList?.length || 1}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-500">Payment</span><span className="font-medium text-gray-900 capitalize">{paymentMethod}</span></div>
          <div className="flex justify-between text-sm border-t border-gray-100 pt-2"><span className="text-gray-500">Total</span><span className="font-bold text-banca-600">₱{total?.toFixed(0)}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <Link to="/passenger/trips" className="text-center bg-banca-600 text-white text-sm font-medium py-2.5 rounded-lg">My Trips</Link>
        <Link to="/passenger/book" className="text-center border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg">Book Another</Link>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 text-sm py-2 rounded-lg cursor-pointer hover:bg-gray-50"><Share2 className="w-4 h-4" /> Share</button>
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 text-sm py-2 rounded-lg cursor-pointer hover:bg-gray-50"><Download className="w-4 h-4" /> Save</button>
      </div>

      <div className="mt-6 bg-yellow-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-yellow-800 mb-2">Important Reminders</p>
        <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
          <li>Arrive at least 30 minutes before departure</li>
          <li>Bring a valid government-issued ID</li>
          <li>Wearing of life jackets is mandatory</li>
          <li>Follow all crew instructions during the voyage</li>
        </ul>
      </div>
    </div>
  )
}
