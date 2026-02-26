import { useState } from 'react'
import { Ship, Plus, X, Anchor, Users, Package, FileText, Wrench, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import vessels from '../../data/vessels.json'

const operatorVessels = vessels.filter((v) => v.operator_id === 'op1')

const mockMaintenanceLogs = {
  v1: [
    { id: 'm1', date: '2025-06-01', type: 'Engine Overhaul', description: 'Full engine inspection and oil change', cost: 25000, status: 'completed' },
    { id: 'm2', date: '2025-05-15', type: 'Hull Inspection', description: 'Underwater hull inspection and barnacle removal', cost: 12000, status: 'completed' },
    { id: 'm3', date: '2025-07-01', type: 'Safety Equipment Check', description: 'Life vests, fire extinguishers, emergency lights', cost: 8000, status: 'scheduled' },
  ],
  v2: [
    { id: 'm4', date: '2025-06-05', type: 'Propeller Repair', description: 'Propeller blade realignment', cost: 18000, status: 'completed' },
    { id: 'm5', date: '2025-05-20', type: 'Navigation System Update', description: 'GPS and radar system firmware update', cost: 5000, status: 'completed' },
    { id: 'm6', date: '2025-06-20', type: 'Engine Tune-up', description: 'Routine engine maintenance and filter replacement', cost: 15000, status: 'scheduled' },
  ],
}

export default function OperatorVessels() {
  const [vesselList, setVesselList] = useState(operatorVessels)
  const [expandedVessel, setExpandedVessel] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newVessel, setNewVessel] = useState({
    name: '',
    type: 'motorized_banca',
    capacity_passengers: '',
    capacity_cargo: '',
    registration_number: '',
  })
  const [errors, setErrors] = useState({})

  const handleToggleExpand = (vesselId) => {
    setExpandedVessel(expandedVessel === vesselId ? null : vesselId)
  }

  const handleNewVesselChange = (e) => {
    const { name, value } = e.target
    setNewVessel((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleAddVessel = () => {
    const newErrors = {}
    if (!newVessel.name.trim()) newErrors.name = 'Vessel name is required'
    if (!newVessel.capacity_passengers) newErrors.capacity_passengers = 'Passenger capacity is required'
    if (!newVessel.registration_number.trim()) newErrors.registration_number = 'Registration number is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const vessel = {
      id: `v_new_${Date.now()}`,
      name: newVessel.name,
      operator_id: 'op1',
      capacity_passengers: parseInt(newVessel.capacity_passengers),
      capacity_cargo: parseInt(newVessel.capacity_cargo) || 0,
      type: newVessel.type,
      status: 'inactive',
      registration_number: newVessel.registration_number,
    }

    setVesselList((prev) => [...prev, vessel])
    setNewVessel({
      name: '',
      type: 'motorized_banca',
      capacity_passengers: '',
      capacity_cargo: '',
      registration_number: '',
    })
    setErrors({})
    setShowAddModal(false)
  }

  const vesselTypes = {
    motorized_banca: 'Motorized Banca',
    fast_craft: 'Fast Craft',
    ferry: 'Ferry',
    outrigger: 'Outrigger',
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fleet Management"
        subtitle={`${vesselList.length} vessels in your fleet`}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Vessel
          </button>
        }
      />

      {/* Vessel Cards */}
      {vesselList.length === 0 ? (
        <EmptyState
          icon={Ship}
          title="No vessels yet"
          description="Add your first vessel to start managing your fleet."
          action={
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Add Vessel
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {vesselList.map((vessel) => {
            const isExpanded = expandedVessel === vessel.id
            const logs = mockMaintenanceLogs[vessel.id] || []

            return (
              <div
                key={vessel.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                {/* Card Header */}
                <div
                  onClick={() => handleToggleExpand(vessel.id)}
                  className="p-4 sm:p-5 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-banca-50 rounded-lg flex items-center justify-center">
                        <Ship className="w-5 h-5 text-banca-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{vessel.name}</h3>
                        <p className="text-xs text-gray-500">{vesselTypes[vessel.type] || vessel.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={vessel.status} />
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>{vessel.capacity_passengers} pax</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Package className="w-3.5 h-3.5 text-gray-400" />
                      <span>{vessel.capacity_cargo?.toLocaleString()} kg</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{vessel.registration_number}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 sm:p-5 bg-gray-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Registration</p>
                        <p className="text-sm font-medium text-gray-900">{vessel.registration_number}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Type</p>
                        <p className="text-sm font-medium text-gray-900">{vesselTypes[vessel.type] || vessel.type}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Passenger Capacity</p>
                        <p className="text-sm font-medium text-gray-900">{vessel.capacity_passengers}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Cargo Capacity</p>
                        <p className="text-sm font-medium text-gray-900">{vessel.capacity_cargo?.toLocaleString()} kg</p>
                      </div>
                    </div>

                    {/* Maintenance Log */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Wrench className="w-4 h-4 text-gray-400" />
                        <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Maintenance Log</h4>
                      </div>
                      {logs.length > 0 ? (
                        <div className="space-y-2">
                          {logs.map((log) => (
                            <div
                              key={log.id}
                              className="bg-white rounded-lg border border-gray-100 p-3"
                            >
                              <div className="flex items-start justify-between mb-1">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{log.type}</p>
                                  <p className="text-xs text-gray-500">{log.description}</p>
                                </div>
                                <StatusBadge status={log.status === 'scheduled' ? 'scheduled' : 'completed'} />
                              </div>
                              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                <span>{log.date}</span>
                                <span className="font-medium text-gray-700">P{log.cost.toLocaleString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 bg-white rounded-lg border border-gray-100">
                          <AlertCircle className="w-5 h-5 text-gray-300 mx-auto mb-1" />
                          <p className="text-xs text-gray-400">No maintenance records</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Add Vessel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Add New Vessel</h2>
              <button
                onClick={() => { setShowAddModal(false); setErrors({}) }}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vessel Name</label>
                <input
                  type="text"
                  name="name"
                  value={newVessel.name}
                  onChange={handleNewVesselChange}
                  placeholder="e.g., MV Island Voyager"
                  className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vessel Type</label>
                <select
                  name="type"
                  value={newVessel.type}
                  onChange={handleNewVesselChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="motorized_banca">Motorized Banca</option>
                  <option value="fast_craft">Fast Craft</option>
                  <option value="ferry">Ferry</option>
                  <option value="outrigger">Outrigger</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Passenger Capacity</label>
                  <input
                    type="number"
                    name="capacity_passengers"
                    value={newVessel.capacity_passengers}
                    onChange={handleNewVesselChange}
                    placeholder="e.g., 60"
                    min={1}
                    className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                      errors.capacity_passengers ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.capacity_passengers && <p className="text-xs text-red-500 mt-1">{errors.capacity_passengers}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Cargo Capacity (kg)</label>
                  <input
                    type="number"
                    name="capacity_cargo"
                    value={newVessel.capacity_cargo}
                    onChange={handleNewVesselChange}
                    placeholder="e.g., 2000"
                    min={0}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Registration Number</label>
                <input
                  type="text"
                  name="registration_number"
                  value={newVessel.registration_number}
                  onChange={handleNewVesselChange}
                  placeholder="e.g., MARINA-2025-XXXX"
                  className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.registration_number ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.registration_number && <p className="text-xs text-red-500 mt-1">{errors.registration_number}</p>}
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => { setShowAddModal(false); setErrors({}) }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVessel}
                className="flex-1 py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Add Vessel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
