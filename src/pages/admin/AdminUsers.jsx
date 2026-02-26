import { useState } from 'react'
import { Users, Plus, Search, X, UserCheck, UserX, Mail, Phone, Shield, Calendar } from 'lucide-react'
import PageHeader from '../../components/shared/PageHeader'
import DataTable from '../../components/shared/DataTable'
import StatusBadge from '../../components/shared/StatusBadge'
import usersData from '../../data/users.json'

const roleBadgeStyles = {
  passenger: 'bg-blue-50 text-blue-700',
  cargo: 'bg-orange-50 text-orange-700',
  operator: 'bg-indigo-50 text-indigo-700',
  crew: 'bg-cyan-50 text-cyan-700',
  terminal_staff: 'bg-teal-50 text-teal-700',
  port_authority: 'bg-purple-50 text-purple-700',
  admin: 'bg-red-50 text-red-700',
}

const roleLabels = {
  passenger: 'Passenger',
  cargo: 'Cargo Client',
  operator: 'Operator',
  crew: 'Crew',
  terminal_staff: 'Terminal Staff',
  port_authority: 'Port Authority',
  admin: 'Admin',
}

const allRoles = ['all', 'passenger', 'cargo', 'operator', 'crew', 'terminal_staff', 'port_authority', 'admin']

export default function AdminUsers() {
  const [users, setUsers] = useState(
    usersData.map((u) => ({ ...u, status: 'active' }))
  )
  const [roleFilter, setRoleFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newUser, setNewUser] = useState({ name: '', mobile: '', email: '', role: 'passenger' })

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile?.includes(search)
    return matchRole && matchSearch
  })

  const toggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    )
  }

  const handleAddUser = () => {
    if (!newUser.name || !newUser.mobile) return
    const user = {
      id: `u${users.length + 1}`,
      ...newUser,
      created_at: new Date().toISOString(),
      status: 'active',
    }
    setUsers([...users, user])
    setNewUser({ name: '', mobile: '', email: '', role: 'passenger' })
    setShowAddModal(false)
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (val, row) => (
        <div>
          <p className="font-medium text-gray-900">{val}</p>
          <p className="text-xs text-gray-400">{row.id}</p>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (val) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadgeStyles[val] || 'bg-gray-100 text-gray-600'}`}>
          {roleLabels[val] || val}
        </span>
      ),
    },
    { key: 'mobile', label: 'Mobile' },
    {
      key: 'email',
      label: 'Email',
      render: (val) => <span className="text-gray-600">{val || '-'}</span>,
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (val) => (
        <span className="text-gray-500">{new Date(val).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleStatus(row.id)
          }}
          className={`text-xs font-medium px-3 py-1 rounded-lg cursor-pointer transition-colors ${
            row.status === 'active'
              ? 'text-red-600 hover:bg-red-50'
              : 'text-green-600 hover:bg-green-50'
          }`}
        >
          {row.status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle={`${users.length} registered users`}
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-banca-600 hover:bg-banca-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or mobile..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Role Tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {allRoles.map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              roleFilter === role
                ? 'bg-banca-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {role === 'all' ? 'All' : roleLabels[role] || role}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filtered} onRowClick={(row) => setSelectedUser(row)} />

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">Add New User</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={newUser.mobile}
                  onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                  placeholder="09XX-XXX-XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                  placeholder="user@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-banca-500"
                >
                  {Object.entries(roleLabels).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
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
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-banca-600 hover:bg-banca-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-banca-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-banca-700">
                  {selectedUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{selectedUser.name}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadgeStyles[selectedUser.role]}`}>
                  {roleLabels[selectedUser.role]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <p className="text-sm font-medium text-gray-900">{selectedUser.mobile}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{selectedUser.email || '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Shield className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">ID</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedUser.id_type ? `${selectedUser.id_type}: ${selectedUser.id_number}` : '-'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(selectedUser.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              {selectedUser.emergency_contact && (
                <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                  <Users className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Emergency Contact</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser.emergency_contact.name} ({selectedUser.emergency_contact.relationship}) - {selectedUser.emergency_contact.mobile}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 py-2">
                <UserCheck className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <StatusBadge status={selectedUser.status} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  toggleStatus(selectedUser.id)
                  setSelectedUser((prev) => ({
                    ...prev,
                    status: prev.status === 'active' ? 'inactive' : 'active',
                  }))
                }}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                  selectedUser.status === 'active'
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-green-50 text-green-600 hover:bg-green-100'
                }`}
              >
                {selectedUser.status === 'active' ? (
                  <span className="flex items-center justify-center gap-2"><UserX className="w-4 h-4" /> Deactivate</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><UserCheck className="w-4 h-4" /> Activate</span>
                )}
              </button>
              <button
                onClick={() => setSelectedUser(null)}
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
