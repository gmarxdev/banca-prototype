import { useState } from 'react'
import { Users, Package, Ship, CloudSun, AlertTriangle } from 'lucide-react'
import advisories from '../../data/advisories.json'

export default function CrewDashboard() {
  const [tripStatus, setTripStatus] = useState('docked')
  const activeAdvisory = advisories.find(a => a.severity === 'warning' || a.severity === 'critical')

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <div className="pt-4 mb-4">
        <p className="text-xs text-gray-400">MV Island Explorer</p>
        <h1 className="text-lg font-bold text-gray-900">Captain Miguel Fernandez</h1>
      </div>

      {activeAdvisory && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
          <div><p className="text-xs font-semibold text-yellow-800">{activeAdvisory.title}</p><p className="text-[10px] text-yellow-600 mt-0.5">{activeAdvisory.description.slice(0, 100)}...</p></div>
        </div>
      )}

      {/* Current Status */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4 text-center">
        <p className="text-xs text-gray-400 mb-2">Current Status</p>
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold ${
          tripStatus === 'docked' ? 'bg-gray-100 text-gray-700' :
          tripStatus === 'boarding' ? 'bg-yellow-100 text-yellow-700' :
          tripStatus === 'in_transit' ? 'bg-blue-100 text-blue-700' :
          'bg-green-100 text-green-700'
        }`}>
          <Ship className="w-4 h-4" />
          {tripStatus === 'docked' ? 'Docked' : tripStatus === 'boarding' ? 'Boarding' : tripStatus === 'in_transit' ? 'Departed' : 'Arrived'}
        </div>
      </div>

      {/* Today's Assignment */}
      <div className="bg-banca-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-medium text-banca-600 mb-1">Today's Assignment</p>
        <p className="text-sm font-bold text-banca-900">Surigao City Port → Dapa Port</p>
        <p className="text-xs text-banca-700 mt-1">Departure: 06:00 AM · 4 trips scheduled</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <Users className="w-5 h-5 text-banca-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-900">42/60</p>
          <p className="text-[10px] text-gray-400">Passengers</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <Package className="w-5 h-5 text-banca-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-900">1.2t</p>
          <p className="text-[10px] text-gray-400">Cargo</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
          <Ship className="w-5 h-5 text-banca-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-gray-900">2/4</p>
          <p className="text-[10px] text-gray-400">Trips Today</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button onClick={() => setTripStatus('boarding')} className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl text-sm font-medium cursor-pointer">Start Boarding</button>
        <button onClick={() => setTripStatus('in_transit')} className="bg-banca-600 hover:bg-banca-700 text-white py-3 rounded-xl text-sm font-medium cursor-pointer">Start Trip</button>
        <button onClick={() => setTripStatus('docked')} className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-sm font-medium cursor-pointer">End Trip</button>
        <button className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-medium cursor-pointer">Emergency</button>
      </div>

      {/* Weather */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <CloudSun className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-lg font-bold text-gray-900">28°C Partly Cloudy</p>
            <p className="text-xs text-gray-500">Wind: 15km/h NE · Sea: Moderate · Visibility: Good</p>
          </div>
        </div>
      </div>
    </div>
  )
}
