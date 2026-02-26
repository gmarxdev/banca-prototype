import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, AlertTriangle, Check, Circle } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import bookings from '../../data/bookings.json'
import schedules from '../../data/schedules.json'
import vessels from '../../data/vessels.json'
import operators from '../../data/operators.json'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'

const timelineSteps = ['confirmed', 'boarding', 'in_transit', 'completed']
const stepLabels = { confirmed: 'Booked', boarding: 'Boarding', in_transit: 'Departed', completed: 'Arrived' }

export default function PassengerTripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showCancel, setShowCancel] = useState(false)
  const booking = bookings.find(b => b.id === id)
  const schedule = schedules.find(s => s.id === booking?.schedule_id)
  const vessel = vessels.find(v => v.id === schedule?.vessel_id)
  const operator = operators.find(o => o.id === vessel?.operator_id)
  const portName = (pid) => ports.find(p => p.id === pid)?.name || pid
  if (!booking) return <div className="p-8 text-center text-gray-400">Booking not found</div>

  const currentStep = timelineSteps.indexOf(booking.booking_status === 'cancelled' ? 'confirmed' : booking.booking_status)

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 mb-4 pt-4 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-gray-900">Trip Details</h1>
        <StatusBadge status={booking.booking_status} />
      </div>

      {/* QR Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-center mb-4">
        <QRCodeSVG value={booking.reference_number} size={140} />
        <p className="text-xs text-gray-400 mt-3">Show this at boarding</p>
        <p className="text-sm font-semibold text-gray-900 mt-1">{booking.reference_number}</p>
      </div>

      {/* Timeline */}
      {booking.booking_status !== 'cancelled' && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <p className="text-sm font-semibold text-gray-900 mb-3">Trip Progress</p>
          <div className="space-y-3">
            {timelineSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                {i <= currentStep ? <Check className="w-5 h-5 text-banca-600" /> : <Circle className="w-5 h-5 text-gray-300" />}
                <span className={`text-sm ${i <= currentStep ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{stepLabels[step]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trip Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-2">
        <p className="text-sm font-semibold text-gray-900 mb-1">Trip Information</p>
        <Row label="Route" value={`${portName(schedule?.origin_port)} → ${portName(schedule?.destination_port)}`} />
        <Row label="Date" value={new Date(booking.created_at).toLocaleDateString()} />
        <Row label="Time" value={`${schedule?.departure_time} – ${schedule?.arrival_time}`} />
        <Row label="Vessel" value={vessel?.name} />
        <Row label="Operator" value={operator?.name} />
      </div>

      {/* Passengers */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Passengers</p>
        {booking.passengers.map((p, i) => (
          <div key={i} className="flex justify-between items-center py-1.5 text-sm">
            <span className="text-gray-700">{p.name}</span>
            <StatusBadge status={p.type} />
          </div>
        ))}
      </div>

      {/* Payment */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-2">
        <p className="text-sm font-semibold text-gray-900 mb-1">Payment</p>
        <Row label="Method" value={booking.payment_method?.toUpperCase()} />
        <Row label="Status" value={<StatusBadge status={booking.payment_status} />} />
        <Row label="Amount" value={`₱${booking.total_amount}`} />
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50">
          <Phone className="w-4 h-4" /> Contact Operator
        </button>
        {['confirmed', 'boarding'].includes(booking.booking_status) && (
          <button onClick={() => setShowCancel(true)} className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-50">
            Cancel Booking
          </button>
        )}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-50">
          <AlertTriangle className="w-4 h-4" /> Report Issue
        </button>
      </div>

      {/* Cancel Modal */}
      {showCancel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Booking?</h3>
            <p className="text-sm text-gray-500 mb-4">This action cannot be undone. Refund will be processed based on cancellation policy.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancel(false)} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm font-medium cursor-pointer">Keep Booking</button>
              <button onClick={() => { setShowCancel(false); navigate('/passenger/trips') }} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between text-sm"><span className="text-gray-500">{label}</span><span className="font-medium text-gray-900">{typeof value === 'string' ? value : value}</span></div>
}
