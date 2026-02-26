import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Banknote, Smartphone } from 'lucide-react'
import ports from '../../data/ports.json'

export default function PassengerBookSummary() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { schedule, vessel, operator, origin, destination, date, passengerList } = state || {}
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [agreed, setAgreed] = useState(false)
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const fare = schedule?.fare || 0
  const breakdown = (passengerList || []).map(p => {
    const discount = (p.type === 'senior' || p.type === 'pwd') ? 0.2 : 0
    return { ...p, discount, amount: fare * (1 - discount) }
  })
  const subtotal = breakdown.reduce((s, p) => s + p.amount, 0)
  const terminalFee = (passengerList?.length || 1) * 30
  const total = subtotal + terminalFee

  const methods = [
    { id: 'cash', icon: Banknote, label: 'Cash on Boarding', desc: 'Pay at the terminal' },
    { id: 'gcash', icon: Smartphone, label: 'GCash', desc: 'Pay now with GCash' },
    { id: 'maya', icon: Smartphone, label: 'Maya', desc: 'Pay now with Maya' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 mb-4 pt-4 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back</button>
      <h1 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900">{portName(origin)} → {portName(destination)}</p>
        <p className="text-xs text-gray-500 mt-1">{date} · {schedule?.departure_time} – {schedule?.arrival_time}</p>
        <p className="text-xs text-gray-500">{vessel?.name} · {operator?.name}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Passengers</p>
        {breakdown.map((p, i) => (
          <div key={i} className="flex justify-between items-center py-1.5 text-sm">
            <div>
              <span className="text-gray-700">{p.name || `Passenger ${i + 1}`}</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">{p.type}</span>
            </div>
            <div className="text-right">
              {p.discount > 0 && <span className="text-xs text-green-600 mr-2">-20%</span>}
              <span className="font-medium">₱{p.amount.toFixed(0)}</span>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-100 mt-2 pt-2 space-y-1">
          <div className="flex justify-between text-xs text-gray-500"><span>Terminal Fee ({passengerList?.length}×₱30)</span><span>₱{terminalFee}</span></div>
          <div className="flex justify-between text-sm font-bold text-gray-900"><span>Total</span><span className="text-banca-600">₱{total.toFixed(0)}</span></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Payment Method</p>
        <div className="space-y-2">
          {methods.map(m => (
            <button key={m.id} onClick={() => setPaymentMethod(m.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left cursor-pointer transition-colors ${paymentMethod === m.id ? 'border-banca-500 bg-banca-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <m.icon className="w-5 h-5 text-gray-600" />
              <div><p className="text-sm font-medium text-gray-900">{m.label}</p><p className="text-xs text-gray-400">{m.desc}</p></div>
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-2 mb-4 cursor-pointer">
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 rounded" />
        <span className="text-xs text-gray-500">I agree to the booking terms and cancellation policy</span>
      </label>

      <button disabled={!agreed} onClick={() => navigate('/passenger/book/confirmation', { state: { ...state, paymentMethod, total } })}
        className="w-full bg-banca-600 hover:bg-banca-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors">
        Confirm Booking
      </button>
    </div>
  )
}
