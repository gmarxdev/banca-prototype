import { useState } from 'react'
import { ScanLine, Search, CheckCircle2, XCircle } from 'lucide-react'
import bookings from '../../data/bookings.json'
import schedules from '../../data/schedules.json'
import ports from '../../data/ports.json'

export default function CrewVerify() {
  const [refInput, setRefInput] = useState('')
  const [result, setResult] = useState(null)
  const [verifiedCount, setVerifiedCount] = useState(42)
  const [log, setLog] = useState([
    { name: 'Ana Garcia', ref: 'BANCA-2025-00108', time: '05:42', result: 'approved' },
    { name: 'Pedro Reyes', ref: 'BANCA-2025-00105', time: '05:38', result: 'approved' },
  ])
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const verify = () => {
    const booking = bookings.find(b => b.reference_number.toLowerCase() === refInput.toLowerCase())
    if (booking) {
      const schedule = schedules.find(s => s.id === booking.schedule_id)
      setResult({ booking, schedule, found: true })
    } else {
      setResult({ found: false })
    }
  }

  const confirm = () => {
    if (!result?.booking) return
    setLog([{ name: result.booking.passengers[0]?.name, ref: result.booking.reference_number, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), result: 'approved' }, ...log])
    setVerifiedCount(v => v + 1)
    setResult(null)
    setRefInput('')
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <h1 className="text-lg font-bold text-gray-900 mb-2 pt-4">Passenger Verification</h1>
      <div className="bg-banca-50 rounded-lg px-3 py-2 mb-4 text-center">
        <span className="text-sm font-semibold text-banca-700">{verifiedCount} of 60 passengers verified</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="bg-slate-50 rounded-xl h-32 flex flex-col items-center justify-center mb-3 border-2 border-dashed border-gray-200">
          <ScanLine className="w-10 h-10 text-gray-300 mb-1" />
          <p className="text-xs text-gray-400">Tap to scan QR</p>
        </div>
        <div className="flex gap-2">
          <input value={refInput} onChange={e => setRefInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && verify()} placeholder="Booking reference" className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
          <button onClick={verify} className="bg-banca-600 text-white px-4 rounded-lg cursor-pointer"><Search className="w-4 h-4" /></button>
        </div>
      </div>

      {result && !result.found && (
        <div className="bg-red-50 rounded-xl p-4 mb-4 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-700">Invalid booking reference</p>
        </div>
      )}

      {result?.found && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3"><CheckCircle2 className="w-5 h-5 text-green-500" /><span className="text-sm font-semibold text-green-700">Valid Booking</span></div>
          <div className="space-y-1.5 text-sm mb-4">
            <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">{result.booking.passengers[0]?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Ref</span><span className="font-mono text-xs">{result.booking.reference_number}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Route</span><span>{portName(result.schedule?.origin_port)} → {portName(result.schedule?.destination_port)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Passengers</span><span>{result.booking.passengers.length}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className={result.booking.payment_status === 'paid' ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}>{result.booking.payment_status.toUpperCase()}</span></div>
          </div>
          <div className="flex gap-2">
            <button onClick={confirm} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">Confirm Boarded</button>
            <button onClick={() => { setResult(null); setRefInput('') }} className="flex-1 border border-red-200 text-red-600 py-2.5 rounded-lg text-sm font-medium cursor-pointer">Reject</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Verification Log</h3>
        {log.map((l, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 text-sm">
            <div><p className="font-medium text-gray-900">{l.name}</p><p className="text-xs text-gray-400">{l.ref}</p></div>
            <div className="text-right"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${l.result === 'approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{l.result === 'approved' ? 'Approved' : 'Rejected'}</span><p className="text-[10px] text-gray-400 mt-0.5">{l.time}</p></div>
          </div>
        ))}
      </div>
    </div>
  )
}
