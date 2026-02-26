import { useState } from 'react'
import { ScanLine, CheckCircle2, XCircle, Search } from 'lucide-react'
import bookings from '../../data/bookings.json'
import schedules from '../../data/schedules.json'
import ports from '../../data/ports.json'

export default function TerminalBoarding() {
  const [refInput, setRefInput] = useState('')
  const [scanned, setScanned] = useState(null)
  const [recentScans, setRecentScans] = useState([
    { ref: 'BANCA-2025-00108', name: 'Ana Garcia', time: '05:42 AM', status: 'approved' },
    { ref: 'BANCA-2025-00105', name: 'Pedro Reyes', time: '05:38 AM', status: 'approved' },
  ])
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const handleVerify = () => {
    const booking = bookings.find(b => b.reference_number.toLowerCase() === refInput.toLowerCase())
    if (booking) {
      const schedule = schedules.find(s => s.id === booking.schedule_id)
      setScanned({ booking, schedule, found: true })
    } else {
      setScanned({ found: false })
    }
  }

  const confirmBoarding = () => {
    if (!scanned?.booking) return
    setRecentScans([{ ref: scanned.booking.reference_number, name: scanned.booking.passengers[0]?.name, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'approved' }, ...recentScans])
    setScanned(null)
    setRefInput('')
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Boarding Gate</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
            <div className="bg-slate-50 rounded-xl h-48 flex flex-col items-center justify-center mb-4 border-2 border-dashed border-gray-200">
              <ScanLine className="w-12 h-12 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">QR Scanner (Camera)</p>
              <p className="text-xs text-gray-300">Tap to activate scanner</p>
            </div>
            <div className="flex gap-2">
              <input value={refInput} onChange={e => setRefInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleVerify()}
                placeholder="Enter booking reference" className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
              <button onClick={handleVerify} className="bg-banca-600 hover:bg-banca-700 text-white px-4 rounded-lg cursor-pointer"><Search className="w-4 h-4" /></button>
            </div>
          </div>

          {scanned && !scanned.found && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-4 mb-4 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-500" />
              <p className="text-sm text-red-700 font-medium">Booking not found. Please check the reference number.</p>
            </div>
          )}

          {scanned?.found && (
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <p className="text-sm font-semibold text-green-700">Valid Booking Found</p>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-gray-500">Reference</span><span className="font-medium">{scanned.booking.reference_number}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Passenger</span><span className="font-medium">{scanned.booking.passengers[0]?.name}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Route</span><span className="font-medium">{portName(scanned.schedule?.origin_port)} → {portName(scanned.schedule?.destination_port)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Payment</span><span className={`font-medium ${scanned.booking.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>{scanned.booking.payment_status.toUpperCase()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Passengers</span><span className="font-medium">{scanned.booking.passengers.length}</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={confirmBoarding} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">Confirm Boarding</button>
                <button onClick={() => setScanned(null)} className="flex-1 border border-red-200 text-red-600 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-50">Deny</button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Scans</h3>
          <div className="space-y-2">
            {recentScans.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.ref}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {s.status === 'approved' ? 'Approved' : 'Denied'}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-0.5">{s.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
