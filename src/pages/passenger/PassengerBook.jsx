import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpDown, Search } from 'lucide-react'
import ports from '../../data/ports.json'

export default function PassengerBook() {
  const navigate = useNavigate()
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [passengers, setPassengers] = useState(1)

  const swap = () => { setOrigin(destination); setDestination(origin) }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!origin || !destination) return
    navigate('/passenger/book/results', { state: { origin, destination, date, passengers } })
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-6 pt-4">Book a Trip</h1>
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 relative">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none">
              <option value="">Select origin port</option>
              {ports.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <button type="button" onClick={swap} className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 bg-banca-50 rounded-full flex items-center justify-center text-banca-600 hover:bg-banca-100 cursor-pointer">
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none">
              <option value="">Select destination</option>
              {ports.filter(p => p.id !== origin).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Travel Date</label>
          <input type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={e => setDate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">Passengers</label>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-medium cursor-pointer hover:bg-gray-50">-</button>
            <span className="text-lg font-semibold w-8 text-center">{passengers}</span>
            <button type="button" onClick={() => setPassengers(Math.min(10, passengers + 1))} className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-lg font-medium cursor-pointer hover:bg-gray-50">+</button>
          </div>
        </div>

        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-banca-600 hover:bg-banca-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer">
          <Search className="w-4 h-4" /> Search Trips
        </button>
      </form>
    </div>
  )
}
