import { useState } from 'react'
import { Users, Plus, X, Phone, Ship, User, Briefcase } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'

const initialCrew = [
  {
    id: 'cr1',
    name: 'Captain Mario Dela Cruz',
    position: 'Captain',
    vessel: 'MV Island Explorer',
    vessel_id: 'v1',
    mobile: '09171112233',
    status: 'active',
    license: 'MARINA-CPT-2024-001',
  },
  {
    id: 'cr2',
    name: 'Jose Reyes Jr.',
    position: 'First Mate',
    vessel: 'MV Island Explorer',
    vessel_id: 'v1',
    mobile: '09181112233',
    status: 'active',
    license: 'MARINA-FM-2024-012',
  },
  {
    id: 'cr3',
    name: 'Eduardo Santos',
    position: 'Engineer',
    vessel: 'MV Island Explorer',
    vessel_id: 'v1',
    mobile: '09191112233',
    status: 'active',
    license: 'MARINA-ENG-2024-045',
  },
  {
    id: 'cr4',
    name: 'Captain Ramon Garcia',
    position: 'Captain',
    vessel: 'MV Siargao Star',
    vessel_id: 'v2',
    mobile: '09201112233',
    status: 'active',
    license: 'MARINA-CPT-2024-008',
  },
  {
    id: 'cr5',
    name: 'Antonio Mendoza',
    position: 'First Mate',
    vessel: 'MV Siargao Star',
    vessel_id: 'v2',
    mobile: '09211112233',
    status: 'inactive',
    license: 'MARINA-FM-2024-022',
  },
  {
    id: 'cr6',
    name: 'Ricardo Torres',
    position: 'Deckhand',
    vessel: 'MV Siargao Star',
    vessel_id: 'v2',
    mobile: '09221112233',
    status: 'active',
    license: 'MARINA-DH-2024-067',
  },
]

const positionColors = {
  Captain: 'bg-indigo-50 text-indigo-700',
  'First Mate': 'bg-blue-50 text-blue-700',
  Engineer: 'bg-yellow-50 text-yellow-700',
  Deckhand: 'bg-green-50 text-green-700',
  Purser: 'bg-purple-50 text-purple-700',
}

export default function OperatorCrew() {
  const [crewList, setCrewList] = useState(initialCrew)
  const [showAddModal, setShowAddModal] = useState(false)
  const [filterVessel, setFilterVessel] = useState('all')
  const [newCrew, setNewCrew] = useState({
    name: '',
    position: 'Captain',
    mobile: '',
    vessel_id: 'v1',
  })
  const [errors, setErrors] = useState({})

  const vesselOptions = [
    { id: 'v1', name: 'MV Island Explorer' },
    { id: 'v2', name: 'MV Siargao Star' },
  ]

  const handleNewCrewChange = (e) => {
    const { name, value } = e.target
    setNewCrew((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleAddCrew = () => {
    const newErrors = {}
    if (!newCrew.name.trim()) newErrors.name = 'Name is required'
    if (!newCrew.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^09\d{9}$/.test(newCrew.mobile.trim())) {
      newErrors.mobile = 'Enter a valid PH mobile number'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const vessel = vesselOptions.find((v) => v.id === newCrew.vessel_id)
    const member = {
      id: `cr_new_${Date.now()}`,
      name: newCrew.name,
      position: newCrew.position,
      vessel: vessel?.name || '',
      vessel_id: newCrew.vessel_id,
      mobile: newCrew.mobile,
      status: 'active',
      license: `MARINA-NEW-${Date.now().toString().slice(-6)}`,
    }

    setCrewList((prev) => [...prev, member])
    setNewCrew({ name: '', position: 'Captain', mobile: '', vessel_id: 'v1' })
    setErrors({})
    setShowAddModal(false)
  }

  const filteredCrew =
    filterVessel === 'all'
      ? crewList
      : crewList.filter((c) => c.vessel_id === filterVessel)

  const activeCount = crewList.filter((c) => c.status === 'active').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crew Management"
        subtitle={`${crewList.length} crew members (${activeCount} active)`}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Crew
          </button>
        }
      />

      {/* Filter by Vessel */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterVessel('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            filterVessel === 'all'
              ? 'bg-banca-50 text-banca-700 border border-banca-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          All Vessels ({crewList.length})
        </button>
        {vesselOptions.map((v) => {
          const count = crewList.filter((c) => c.vessel_id === v.id).length
          return (
            <button
              key={v.id}
              onClick={() => setFilterVessel(v.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterVessel === v.id
                  ? 'bg-banca-50 text-banca-700 border border-banca-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {v.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Crew Cards */}
      {filteredCrew.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No crew members found"
          description="Add crew members to manage your vessel operations."
          action={
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
            >
              Add Crew Member
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCrew.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-banca-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-banca-600">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{member.name}</h3>
                    <span
                      className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        positionColors[member.position] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.position}
                    </span>
                  </div>
                </div>
                <StatusBadge status={member.status} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Ship className="w-3.5 h-3.5 text-gray-400" />
                  <span>{member.vessel}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span>{member.mobile}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] font-mono text-gray-500">{member.license}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Crew Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Add Crew Member</h2>
              <button
                onClick={() => { setShowAddModal(false); setErrors({}) }}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={newCrew.name}
                    onChange={handleNewCrewChange}
                    placeholder="Juan Dela Cruz"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
                <select
                  name="position"
                  value={newCrew.position}
                  onChange={handleNewCrewChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="Captain">Captain</option>
                  <option value="First Mate">First Mate</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Deckhand">Deckhand</option>
                  <option value="Purser">Purser</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    value={newCrew.mobile}
                    onChange={handleNewCrewChange}
                    placeholder="09XXXXXXXXX"
                    maxLength={11}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                      errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vessel Assignment</label>
                <select
                  name="vessel_id"
                  value={newCrew.vessel_id}
                  onChange={handleNewCrewChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent bg-white cursor-pointer"
                >
                  {vesselOptions.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
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
                onClick={handleAddCrew}
                className="flex-1 py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Add Crew Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
