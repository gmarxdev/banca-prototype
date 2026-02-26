import { useState } from 'react'
import { Calendar, Plus, X, Clock, MapPin, ToggleLeft, ToggleRight } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import StatusBadge from '../../components/shared/StatusBadge'
import DataTable from '../../components/shared/DataTable'
import schedules from '../../data/schedules.json'
import vessels from '../../data/vessels.json'
import ports from '../../data/ports.json'

const operatorVesselIds = ['v1', 'v2']
const operatorVessels = vessels.filter((v) => operatorVesselIds.includes(v.id))

const portMap = {}
ports.forEach((p) => {
  portMap[p.id] = p.name.replace(' Port', '')
})

const vesselMap = {}
vessels.forEach((v) => {
  vesselMap[v.id] = v.name
})

export default function OperatorSchedules() {
  const [scheduleList, setScheduleList] = useState(
    schedules.filter((s) => operatorVesselIds.includes(s.vessel_id))
  )
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [newSchedule, setNewSchedule] = useState({
    vessel_id: 'v1',
    origin_port: 'surigao',
    destination_port: 'dapa',
    departure_time: '',
    arrival_time: '',
    fare: '',
    repeat: 'none',
  })
  const [errors, setErrors] = useState({})

  const handleToggleStatus = (scheduleId) => {
    setScheduleList((prev) =>
      prev.map((s) =>
        s.id === scheduleId
          ? { ...s, status: s.status === 'scheduled' ? 'inactive' : 'scheduled' }
          : s
      )
    )
  }

  const handleNewScheduleChange = (e) => {
    const { name, value } = e.target
    setNewSchedule((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleCreateSchedule = () => {
    const newErrors = {}
    if (!newSchedule.departure_time) newErrors.departure_time = 'Departure time is required'
    if (!newSchedule.arrival_time) newErrors.arrival_time = 'Arrival time is required'
    if (!newSchedule.fare || parseFloat(newSchedule.fare) <= 0) newErrors.fare = 'Valid fare is required'
    if (newSchedule.origin_port === newSchedule.destination_port) {
      newErrors.destination_port = 'Destination must differ from origin'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const vessel = operatorVessels.find((v) => v.id === newSchedule.vessel_id)
    const schedule = {
      id: `s_new_${Date.now()}`,
      vessel_id: newSchedule.vessel_id,
      origin_port: newSchedule.origin_port,
      destination_port: newSchedule.destination_port,
      departure_time: newSchedule.departure_time,
      arrival_time: newSchedule.arrival_time,
      fare: parseFloat(newSchedule.fare),
      available_seats: vessel?.capacity_passengers || 0,
      status: 'scheduled',
    }

    setScheduleList((prev) => [...prev, schedule])
    setNewSchedule({
      vessel_id: 'v1',
      origin_port: 'surigao',
      destination_port: 'dapa',
      departure_time: '',
      arrival_time: '',
      fare: '',
      repeat: 'none',
    })
    setErrors({})
    setShowCreateModal(false)
  }

  const filteredSchedules =
    filterStatus === 'all'
      ? scheduleList
      : scheduleList.filter((s) => s.status === filterStatus)

  const columns = [
    {
      key: 'vessel_id',
      label: 'Vessel',
      render: (val) => <span className="font-medium text-gray-900">{vesselMap[val] || val}</span>,
    },
    {
      key: 'origin_port',
      label: 'Route',
      render: (_, row) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="w-3 h-3 text-gray-400" />
          <span className="text-sm">
            {portMap[row.origin_port] || row.origin_port} → {portMap[row.destination_port] || row.destination_port}
          </span>
        </div>
      ),
    },
    {
      key: 'departure_time',
      label: 'Departure',
      render: (val) => (
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="font-medium">{val}</span>
        </div>
      ),
    },
    {
      key: 'arrival_time',
      label: 'Arrival',
    },
    {
      key: 'fare',
      label: 'Fare',
      render: (val) => <span className="font-semibold text-gray-900">P{val}</span>,
    },
    {
      key: 'available_seats',
      label: 'Available',
      render: (val, row) => {
        const vessel = operatorVessels.find((v) => v.id === row.vessel_id)
        const capacity = vessel?.capacity_passengers || 0
        return (
          <span className={val === 0 ? 'text-red-600 font-semibold' : val <= 10 ? 'text-yellow-600 font-medium' : 'text-gray-700'}>
            {val} / {capacity}
          </span>
        )
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'id',
      label: 'Toggle',
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleToggleStatus(row.id)
          }}
          className="cursor-pointer"
          title={row.status === 'scheduled' ? 'Deactivate' : 'Activate'}
        >
          {row.status === 'scheduled' || row.status === 'full' ? (
            <ToggleRight className="w-6 h-6 text-green-500" />
          ) : (
            <ToggleLeft className="w-6 h-6 text-gray-400" />
          )}
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule Management"
        subtitle="Manage your vessel departure schedules"
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Create Schedule
          </button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'scheduled', 'full', 'inactive'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filterStatus === status
                ? 'bg-banca-50 text-banca-700 border border-banca-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All Schedules' : status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-1.5 text-[10px]">
              ({status === 'all' ? scheduleList.length : scheduleList.filter((s) => s.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Schedule Table */}
      <DataTable columns={columns} data={filteredSchedules} />

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Create New Schedule</h2>
              <button
                onClick={() => { setShowCreateModal(false); setErrors({}) }}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Vessel</label>
                <select
                  name="vessel_id"
                  value={newSchedule.vessel_id}
                  onChange={handleNewScheduleChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent bg-white cursor-pointer"
                >
                  {operatorVessels.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Origin</label>
                  <select
                    name="origin_port"
                    value={newSchedule.origin_port}
                    onChange={handleNewScheduleChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent bg-white cursor-pointer"
                  >
                    {ports.map((p) => (
                      <option key={p.id} value={p.id}>{p.name.replace(' Port', '')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                  <select
                    name="destination_port"
                    value={newSchedule.destination_port}
                    onChange={handleNewScheduleChange}
                    className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent bg-white cursor-pointer ${
                      errors.destination_port ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    {ports.map((p) => (
                      <option key={p.id} value={p.id}>{p.name.replace(' Port', '')}</option>
                    ))}
                  </select>
                  {errors.destination_port && <p className="text-xs text-red-500 mt-1">{errors.destination_port}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Departure Time</label>
                  <input
                    type="time"
                    name="departure_time"
                    value={newSchedule.departure_time}
                    onChange={handleNewScheduleChange}
                    className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                      errors.departure_time ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.departure_time && <p className="text-xs text-red-500 mt-1">{errors.departure_time}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Arrival Time</label>
                  <input
                    type="time"
                    name="arrival_time"
                    value={newSchedule.arrival_time}
                    onChange={handleNewScheduleChange}
                    className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                      errors.arrival_time ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.arrival_time && <p className="text-xs text-red-500 mt-1">{errors.arrival_time}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Fare (PHP)</label>
                <input
                  type="number"
                  name="fare"
                  value={newSchedule.fare}
                  onChange={handleNewScheduleChange}
                  placeholder="e.g., 350"
                  min={0}
                  className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent ${
                    errors.fare ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                />
                {errors.fare && <p className="text-xs text-red-500 mt-1">{errors.fare}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Repeat</label>
                <select
                  name="repeat"
                  value={newSchedule.repeat}
                  onChange={handleNewScheduleChange}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent bg-white cursor-pointer"
                >
                  <option value="none">No Repeat (One-time)</option>
                  <option value="daily">Daily</option>
                  <option value="weekdays">Weekdays Only</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => { setShowCreateModal(false); setErrors({}) }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSchedule}
                className="flex-1 py-2.5 bg-banca-600 hover:bg-banca-700 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
