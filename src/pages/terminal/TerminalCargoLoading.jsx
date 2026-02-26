import { useState } from 'react'
import { Package } from 'lucide-react'
import cargoData from '../../data/cargo.json'
import vessels from '../../data/vessels.json'
import ports from '../../data/ports.json'

export default function TerminalCargoLoading() {
  const [selectedVessel, setSelectedVessel] = useState('')
  const [loadedIds, setLoadedIds] = useState(new Set())
  const [selectedItems, setSelectedItems] = useState(new Set())
  const portName = (id) => ports.find(p => p.id === id)?.name || id
  const activeVessels = vessels.filter(v => v.status === 'active')
  const receivedCargo = cargoData.filter(c => c.status === 'received')

  const toggleItem = (id) => {
    const next = new Set(selectedItems)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelectedItems(next)
  }

  const markLoaded = () => {
    const next = new Set(loadedIds)
    selectedItems.forEach(id => next.add(id))
    setLoadedIds(next)
    setSelectedItems(new Set())
  }

  const loadedCargo = cargoData.filter(c => c.status === 'loaded' || loadedIds.has(c.id))
  const totalWeight = loadedCargo.reduce((s, c) => s + c.weight, 0)
  const vesselCap = vessels.find(v => v.id === selectedVessel)?.capacity_cargo || 2000

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Cargo Loading</h1>
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Select Departing Vessel</label>
        <select value={selectedVessel} onChange={e => setSelectedVessel(e.target.value)} className="max-w-md border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
          <option value="">Select vessel</option>
          {activeVessels.map(v => <option key={v.id} value={v.id}>{v.name} (Cap: {v.capacity_cargo}kg)</option>)}
        </select>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Cargo ({receivedCargo.filter(c => !loadedIds.has(c.id)).length})</h3>
          {receivedCargo.filter(c => !loadedIds.has(c.id)).length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400">No cargo waiting to be loaded</div>
          ) : (
            <>
              <div className="space-y-2 mb-4">
                {receivedCargo.filter(c => !loadedIds.has(c.id)).map(c => (
                  <label key={c.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" checked={selectedItems.has(c.id)} onChange={() => toggleItem(c.id)} className="rounded" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{c.description}</p>
                      <p className="text-xs text-gray-400">{c.tracking_reference} · {c.weight}kg · {portName(c.destination_port)}</p>
                    </div>
                  </label>
                ))}
              </div>
              <button onClick={markLoaded} disabled={selectedItems.size === 0 || !selectedVessel}
                className="w-full bg-banca-600 hover:bg-banca-700 disabled:opacity-50 text-white py-2 rounded-lg text-sm font-medium cursor-pointer">
                Mark as Loaded ({selectedItems.size})
              </button>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Loaded Cargo</h3>
          <div className="bg-banca-50 rounded-lg p-3 mb-4 flex justify-between text-sm">
            <span className="text-gray-600">Weight</span>
            <span className="font-semibold text-banca-700">{totalWeight} / {vesselCap} kg</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-banca-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (totalWeight / vesselCap) * 100)}%` }} />
          </div>
          {loadedCargo.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400"><Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />No cargo loaded yet</div>
          ) : (
            <div className="space-y-2">
              {loadedCargo.map(c => (
                <div key={c.id} className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
                  <div><p className="font-medium text-gray-900">{c.description}</p><p className="text-xs text-gray-400">{c.tracking_reference}</p></div>
                  <span className="text-xs font-medium text-gray-600">{c.weight}kg</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
