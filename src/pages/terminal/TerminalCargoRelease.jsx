import { useState } from 'react'
import { Search, CheckCircle2, Package } from 'lucide-react'
import cargoData from '../../data/cargo.json'
import ports from '../../data/ports.json'

export default function TerminalCargoRelease() {
  const [query, setQuery] = useState('')
  const [found, setFound] = useState(null)
  const [searched, setSearched] = useState(false)
  const [released, setReleased] = useState([])
  const [recipientId, setRecipientId] = useState('')
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const handleSearch = () => {
    const c = cargoData.find(c => c.tracking_reference.toLowerCase() === query.toLowerCase())
    setFound(c || null)
    setSearched(true)
  }

  const handleRelease = () => {
    if (!found) return
    setReleased([{ ref: found.tracking_reference, recipient: found.recipient.name, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }, ...released])
    setFound(null)
    setQuery('')
    setRecipientId('')
    setSearched(false)
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Cargo Release</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-1">Search by Tracking Reference</label>
            <div className="flex gap-2">
              <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="BNCA-CRG-..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <button onClick={handleSearch} className="bg-banca-600 text-white px-4 rounded-lg cursor-pointer"><Search className="w-4 h-4" /></button>
            </div>
          </div>

          {searched && !found && <div className="bg-yellow-50 rounded-xl p-4 text-sm text-yellow-700 mb-4">No cargo found with this tracking reference.</div>}

          {found && (
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <div className="bg-green-50 rounded-lg p-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="text-sm font-medium text-green-700">Cargo Found</span></div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Tracking</span><span className="font-mono font-medium">{found.tracking_reference}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Description</span><span className="font-medium">{found.description}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Weight</span><span>{found.weight}kg</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Route</span><span>{portName(found.origin_port)} → {portName(found.destination_port)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Recipient</span><span className="font-medium">{found.recipient.name}</span></div>
              </div>
              <hr className="border-gray-100" />
              <p className="text-xs font-medium text-gray-700">Verify Recipient Identity</p>
              <input placeholder="Recipient ID Number" value={recipientId} onChange={e => setRecipientId(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <button onClick={handleRelease} disabled={!recipientId} className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">Release Cargo</button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Today's Released Cargo</h3>
          {released.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400"><Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />No cargo released today</div>
          ) : (
            <div className="space-y-2">{released.map((r, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                <div><p className="font-medium">{r.recipient}</p><p className="text-xs text-gray-400">{r.ref}</p></div>
                <span className="text-xs text-gray-400">{r.time}</span>
              </div>
            ))}</div>
          )}
        </div>
      </div>
    </div>
  )
}
