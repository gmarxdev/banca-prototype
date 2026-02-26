import { useState } from 'react'
import { Building2, Plus, X, Star, Ship, Phone, Mail, CheckCircle, XCircle, Search } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import operatorsData from '../../data/operators.json'
import vesselsData from '../../data/vessels.json'

export default function AdminOperators() {
  const [operators, setOperators] = useState(operatorsData)
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedOp, setSelectedOp] = useState(null)
  const [newOp, setNewOp] = useState({ name: '', contact_person: '', mobile: '', email: '' })

  const filtered = operators.filter(
    (op) =>
      !search ||
      op.name.toLowerCase().includes(search.toLowerCase()) ||
      op.contact_person.toLowerCase().includes(search.toLowerCase())
  )

  const handleApprove = (opId) => {
    setOperators((prev) =>
      prev.map((op) => (op.id === opId ? { ...op, status: 'verified' } : op))
    )
    if (selectedOp?.id === opId) {
      setSelectedOp((prev) => ({ ...prev, status: 'verified' }))
    }
  }

  const handleReject = (opId) => {
    setOperators((prev) =>
      prev.map((op) => (op.id === opId ? { ...op, status: 'inactive' } : op))
    )
    if (selectedOp?.id === opId) {
      setSelectedOp((prev) => ({ ...prev, status: 'inactive' }))
    }
  }

  const handleAddOperator = () => {
    if (!newOp.name || !newOp.contact_person || !newOp.mobile) return
    const op = {
      id: `op${operators.length + 1}`,
      ...newOp,
      vessels: [],
      status: 'pending',
      rating: 0,
    }
    setOperators([...operators, op])
    setNewOp({ name: '', contact_person: '', mobile: '', email: '' })
    setShowAddModal(false)
  }

  const getOperatorVessels = (opId) => vesselsData.filter((v) => v.operator_id === opId)

  const columns = [
    {
      key: 'name',
      label: 'Company Name',
      render: (val, row) => (
        <div>
          <p className="font-medium text-gray-900">{val}</p>
          <p className="text-xs text-gray-400">{row.contact_person}</p>
        </div>
      ),
    },
    {
      key: 'contact_person',
      label: 'Contact',
      render: (_, row) => (
        <div>
          <p className="text-sm text-gray-700">{row.mobile}</p>
          <p className="text-xs text-gray-400">{row.email}</p>
        </div>
      ),
    },
    { key: 'mobile', label: 'Mobile' },
    {
      key: 'vessels',
      label: 'Vessels',
      render: (val) => (
        <span className="text-sm font-medium text-gray-900">{val?.length || 0}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'rating',
      label: 'Rating',
      render: (val) => (
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium text-gray-900">{val?.toFixed(1) || '0.0'}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) =>
        row.status === 'pending' ? (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleApprove(row.id)
              }}
              className="text-xs font-medium text-green-600 hover:bg-green-50 px-2 py-1 rounded cursor-pointer"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleReject(row.id)
              }}
              className="text-xs font-medium text-red-600 hover:bg-red-50 px-2 py-1 rounded cursor-pointer"
            >
              Reject
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400">-</span>
        ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="Operators"
        subtitle={`${operators.length} registered operators`}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-banca-600 hover:bg-banca-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Register Operator
          </button>
        }
      />

      {/* Search */}
      <div className="mb-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search operators..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
          />
        </div>
      </div>

      <DataTable columns={columns} data={filtered} onRowClick={(row) => setSelectedOp(row)} />

      {/* Register Operator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Register Operator</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={newOp.name}
                  onChange={(e) => setNewOp({ ...newOp, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={newOp.contact_person}
                  onChange={(e) => setNewOp({ ...newOp, contact_person: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  type="text"
                  value={newOp.mobile}
                  onChange={(e) => setNewOp({ ...newOp, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                  placeholder="09XX-XXX-XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newOp.email}
                  onChange={(e) => setNewOp({ ...newOp, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                  placeholder="company@email.com"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOperator}
                className="flex-1 px-4 py-2 bg-banca-600 hover:bg-banca-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operator Detail Modal */}
      {selectedOp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Operator Details</h3>
              <button onClick={() => setSelectedOp(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{selectedOp.name}</p>
                <StatusBadge status={selectedOp.status} />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Building2 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Contact Person</p>
                  <p className="text-sm font-medium text-gray-900">{selectedOp.contact_person}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <p className="text-sm font-medium text-gray-900">{selectedOp.mobile}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{selectedOp.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Star className="w-4 h-4 text-yellow-500" />
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="text-sm font-medium text-gray-900">{selectedOp.rating?.toFixed(1)} / 5.0</p>
                </div>
              </div>
            </div>

            {/* Vessels */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Vessels ({getOperatorVessels(selectedOp.id).length})</h4>
              <div className="space-y-2">
                {getOperatorVessels(selectedOp.id).map((vessel) => (
                  <div key={vessel.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{vessel.name}</p>
                        <p className="text-xs text-gray-400">Cap: {vessel.capacity_passengers} pax</p>
                      </div>
                    </div>
                    <StatusBadge status={vessel.status} />
                  </div>
                ))}
                {getOperatorVessels(selectedOp.id).length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-3">No vessels assigned</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {selectedOp.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(selectedOp.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedOp.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedOp(null)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
