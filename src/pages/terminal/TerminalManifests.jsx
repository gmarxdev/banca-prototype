import { useState } from 'react'
import { FileText, Printer, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import bookings from '../../data/bookings.json'
import schedules from '../../data/schedules.json'
import vessels from '../../data/vessels.json'
import ports from '../../data/ports.json'

export default function TerminalManifests() {
  const [selectedSchedule, setSelectedSchedule] = useState('')
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const schedule = schedules.find(s => s.id === selectedSchedule)
  const vessel = schedule ? vessels.find(v => v.id === schedule.vessel_id) : null
  const manifestBookings = selectedSchedule ? bookings.filter(b => b.schedule_id === selectedSchedule) : []
  const allPassengers = manifestBookings.flatMap(b => b.passengers.map(p => ({ ...p, ref: b.reference_number, status: b.booking_status })))

  const adults = allPassengers.filter(p => p.type === 'adult').length
  const seniors = allPassengers.filter(p => p.type === 'senior').length
  const pwd = allPassengers.filter(p => p.type === 'pwd').length
  const children = allPassengers.filter(p => p.type === 'child').length

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Passenger Manifests</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Select Schedule</label>
            <select value={selectedSchedule} onChange={e => setSelectedSchedule(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
              <option value="">Choose a vessel/schedule</option>
              {schedules.map(s => {
                const v = vessels.find(vl => vl.id === s.vessel_id)
                return <option key={s.id} value={s.id}>{s.departure_time} - {v?.name} ({portName(s.origin_port)} → {portName(s.destination_port)})</option>
              })}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button onClick={() => toast.success('Manifest exported')} className="flex items-center gap-1 bg-banca-600 hover:bg-banca-700 text-white px-4 py-2.5 rounded-lg text-sm cursor-pointer"><Download className="w-4 h-4" /> Export</button>
            <button onClick={() => toast.success('Sent to printer')} className="flex items-center gap-1 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm cursor-pointer hover:bg-gray-50"><Printer className="w-4 h-4" /> Print</button>
          </div>
        </div>
      </div>

      {schedule && (
        <>
          <div className="bg-banca-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-banca-800">{vessel?.name} · {schedule.departure_time}</p>
            <p className="text-xs text-banca-600">{portName(schedule.origin_port)} → {portName(schedule.destination_port)}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {[['Total', allPassengers.length, 'blue'], ['Adults', adults, 'gray'], ['Seniors', seniors, 'purple'], ['PWD', pwd, 'teal'], ['Children', children, 'pink']].map(([label, count, color]) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 p-3 text-center">
                <p className="text-lg font-bold text-gray-900">{count}</p>
                <p className="text-[10px] text-gray-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Passenger Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">ID Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">ID Number</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Booking Ref</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-50">
                  {allPassengers.map((p, i) => (
                    <tr key={i}><td className="px-4 py-2.5">{i + 1}</td><td className="px-4 py-2.5 font-medium">{p.name}</td><td className="px-4 py-2.5 text-gray-500">{p.id_type}</td><td className="px-4 py-2.5 text-gray-500">{p.id_number}</td><td className="px-4 py-2.5 capitalize">{p.type}</td><td className="px-4 py-2.5 font-mono text-xs">{p.ref}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-gray-100">
              {allPassengers.map((p, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900">{i + 1}. {p.name}</p>
                    <span className="text-xs capitalize text-gray-500">{p.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{p.id_type}: {p.id_number}</span>
                    <span className="font-mono">{p.ref}</span>
                  </div>
                </div>
              ))}
            </div>

            {allPassengers.length === 0 && <div className="text-center py-8 text-sm text-gray-400">No passengers booked for this schedule</div>}
          </div>
        </>
      )}

      {!schedule && (
        <div className="text-center py-12"><FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-sm text-gray-400">Select a schedule to view the manifest</p></div>
      )}
    </div>
  )
}
