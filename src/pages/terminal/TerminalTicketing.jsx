import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import ports from '../../data/ports.json'
import schedules from '../../data/schedules.json'
import vessels from '../../data/vessels.json'

const idTypes = ['Philippine National ID', "Driver's License", 'Passport', 'SSS ID', 'PhilHealth ID', "Voter's ID", 'Senior Citizen ID', 'PWD ID']

export default function TerminalTicketing() {
  const [origin, setOrigin] = useState('surigao')
  const [destination, setDestination] = useState('')
  const [scheduleId, setScheduleId] = useState('')
  const [passengerName, setPassengerName] = useState('')
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [passengerType, setPassengerType] = useState('adult')
  const [showTicket, setShowTicket] = useState(null)

  const available = schedules.filter(s => s.origin_port === origin && (destination ? s.destination_port === destination : true) && s.status !== 'full')
  const selected = schedules.find(s => s.id === scheduleId)
  const vessel = selected ? vessels.find(v => v.id === selected.vessel_id) : null
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const discount = (passengerType === 'senior' || passengerType === 'pwd') ? 0.2 : 0
  const fare = selected ? selected.fare * (1 - discount) : 0
  const total = fare + 30

  const issueTicket = () => {
    const ref = `BANCA-2025-${String(Math.floor(10000 + Math.random() * 90000))}`
    setShowTicket({ ref, name: passengerName, route: `${portName(origin)} → ${portName(selected?.destination_port)}`, time: selected?.departure_time, vessel: vessel?.name, total })
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Walk-in Ticketing</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
              <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                {ports.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
              <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                <option value="">Select</option>
                {ports.filter(p => p.id !== origin).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Schedule</label>
            <select value={scheduleId} onChange={e => setScheduleId(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500">
              <option value="">Select schedule</option>
              {available.map(s => {
                const v = vessels.find(vl => vl.id === s.vessel_id)
                return <option key={s.id} value={s.id}>{s.departure_time} - {v?.name} ({s.available_seats} seats) - ₱{s.fare}</option>
              })}
            </select>
          </div>
          <hr className="border-gray-100" />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Passenger Name</label>
            <input value={passengerName} onChange={e => setPassengerName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">ID Type</label>
              <select value={idType} onChange={e => setIdType(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                <option value="">Select</option>
                {idTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">ID Number</label>
              <input value={idNumber} onChange={e => setIdNumber(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Passenger Type</label>
            <select value={passengerType} onChange={e => setPassengerType(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500">
              <option value="adult">Adult</option><option value="child">Child</option><option value="senior">Senior (20% off)</option><option value="pwd">PWD (20% off)</option>
            </select>
          </div>
          {selected && (
            <div className="bg-banca-50 rounded-lg p-3 text-sm space-y-1">
              <div className="flex justify-between"><span className="text-gray-600">Fare</span><span>₱{(selected.fare * (1 - discount)).toFixed(0)}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Terminal Fee</span><span>₱30</span></div>
              <div className="flex justify-between font-bold"><span>Total</span><span className="text-banca-600">₱{total.toFixed(0)}</span></div>
            </div>
          )}
          <button onClick={issueTicket} disabled={!selected || !passengerName} className="w-full bg-banca-600 hover:bg-banca-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg cursor-pointer transition-colors">Issue Ticket</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Tickets Issued</h3>
          <div className="space-y-2 text-sm text-gray-500">
            {['BANCA-2025-04521 - Pedro Reyes - 05:45 AM', 'BANCA-2025-04520 - Maria Santos - 05:30 AM', 'BANCA-2025-04519 - Jose Garcia - 05:15 AM'].map((t, i) => (
              <p key={i} className="py-2 border-b border-gray-50">{t}</p>
            ))}
          </div>
        </div>
      </div>

      {showTicket && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-green-700 mb-4">Ticket Issued!</h3>
            <QRCodeSVG value={showTicket.ref} size={120} className="mx-auto mb-3" />
            <p className="text-sm font-mono font-bold mb-2">{showTicket.ref}</p>
            <div className="text-sm text-left space-y-1 mb-4">
              <p><span className="text-gray-500">Name:</span> {showTicket.name}</p>
              <p><span className="text-gray-500">Route:</span> {showTicket.route}</p>
              <p><span className="text-gray-500">Time:</span> {showTicket.time}</p>
              <p><span className="text-gray-500">Vessel:</span> {showTicket.vessel}</p>
              <p><span className="text-gray-500">Total:</span> ₱{showTicket.total.toFixed(0)}</p>
            </div>
            <button onClick={() => { setShowTicket(null); setPassengerName(''); setIdNumber('') }} className="w-full bg-banca-600 text-white py-2 rounded-lg cursor-pointer">Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
