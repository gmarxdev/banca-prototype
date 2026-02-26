import { useState } from 'react'
import { Search, Package, Check, Circle, Ship } from 'lucide-react'
import cargoData from '../../data/cargo.json'
import ports from '../../data/ports.json'
import vessels from '../../data/vessels.json'

const statusSteps = ['received', 'loaded', 'in_transit', 'ready_for_pickup', 'delivered']
const stepLabels = { received: 'Received at Origin', loaded: 'Loaded on Vessel', in_transit: 'In Transit', ready_for_pickup: 'Ready for Pickup', delivered: 'Delivered' }

export default function CargoTrack() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [searched, setSearched] = useState(false)
  const portName = (id) => ports.find(p => p.id === id)?.name || id
  const mask = (name) => name ? name[0] + name.slice(1).replace(/[a-zA-Z]/g, '*').slice(0, 6) : ''

  const handleTrack = (ref) => {
    const trackRef = ref || query
    const found = cargoData.find(c => c.tracking_reference.toLowerCase() === trackRef.toLowerCase())
    setResult(found || null)
    setSearched(true)
  }

  const currentStep = result ? statusSteps.indexOf(result.status) : -1
  const vessel = result?.vessel_id ? vessels.find(v => v.id === result.vessel_id) : null

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-4 pt-4">Track Your Shipment</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex gap-2">
          <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleTrack()}
            placeholder="Enter tracking reference" className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none" />
          <button onClick={() => handleTrack()} className="bg-banca-600 hover:bg-banca-700 text-white px-4 rounded-lg cursor-pointer transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-400 mb-1">Try these samples:</p>
          <div className="flex flex-wrap gap-1">
            {cargoData.slice(0, 4).map(c => (
              <button key={c.id} onClick={() => { setQuery(c.tracking_reference); handleTrack(c.tracking_reference) }}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded cursor-pointer hover:bg-gray-200">{c.tracking_reference}</button>
            ))}
          </div>
        </div>
      </div>

      {searched && !result && (
        <div className="text-center py-12"><Package className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-sm text-gray-500">No shipment found with this tracking number.</p></div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Status</p>
            <span className={`inline-block text-sm font-semibold px-4 py-1.5 rounded-full ${
              result.status === 'delivered' ? 'bg-green-100 text-green-700' :
              result.status === 'in_transit' ? 'bg-blue-100 text-blue-700' :
              result.status === 'ready_for_pickup' ? 'bg-emerald-100 text-emerald-700' :
              'bg-gray-100 text-gray-700'
            }`}>{stepLabels[result.status] || result.status}</span>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Tracking Timeline</p>
            <div className="space-y-0">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {i <= currentStep ? <Check className="w-5 h-5 text-banca-600 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
                    {i < statusSteps.length - 1 && <div className={`w-0.5 h-6 ${i < currentStep ? 'bg-banca-300' : 'bg-gray-200'}`} />}
                  </div>
                  <p className={`text-sm pb-4 ${i <= currentStep ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{stepLabels[step]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
            <Row label="Tracking Ref" value={result.tracking_reference} />
            <Row label="Description" value={result.description} />
            <Row label="Weight" value={`${result.weight} kg`} />
            <Row label="Route" value={`${portName(result.origin_port)} → ${portName(result.destination_port)}`} />
            <Row label="Sender" value={mask(result.sender.name)} />
            <Row label="Recipient" value={mask(result.recipient.name)} />
            {vessel && <Row label="Vessel" value={vessel.name} />}
            <Row label="Fee" value={`₱${result.fee}`} />
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between text-sm"><span className="text-gray-500">{label}</span><span className="font-medium text-gray-900 text-right">{value}</span></div>
}
