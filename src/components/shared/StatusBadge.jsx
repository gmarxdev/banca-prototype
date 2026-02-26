const statusStyles = {
  confirmed: 'bg-blue-50 text-blue-700',
  boarding: 'bg-yellow-50 text-yellow-700',
  in_transit: 'bg-indigo-50 text-indigo-700',
  completed: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-700',
  scheduled: 'bg-blue-50 text-blue-700',
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  maintenance: 'bg-orange-50 text-orange-700',
  docked: 'bg-gray-100 text-gray-600',
  full: 'bg-red-50 text-red-700',
  paid: 'bg-green-50 text-green-700',
  pending: 'bg-yellow-50 text-yellow-700',
  refunded: 'bg-gray-100 text-gray-600',
  delivered: 'bg-green-50 text-green-700',
  received: 'bg-blue-50 text-blue-700',
  loaded: 'bg-indigo-50 text-indigo-700',
  ready_for_pickup: 'bg-emerald-50 text-emerald-700',
  verified: 'bg-green-50 text-green-700',
  operational: 'bg-green-50 text-green-700',
  warning: 'bg-yellow-50 text-yellow-700',
  critical: 'bg-red-50 text-red-700',
  info: 'bg-blue-50 text-blue-700',
  adult: 'bg-gray-100 text-gray-700',
  senior: 'bg-purple-50 text-purple-700',
  pwd: 'bg-teal-50 text-teal-700',
  child: 'bg-pink-50 text-pink-700',
}

const statusLabels = {
  in_transit: 'In Transit',
  ready_for_pickup: 'Ready for Pickup',
  confirmed: 'Confirmed',
  boarding: 'Boarding',
  completed: 'Completed',
  cancelled: 'Cancelled',
  scheduled: 'Scheduled',
  active: 'Active',
  inactive: 'Inactive',
  maintenance: 'Maintenance',
  docked: 'Docked',
  full: 'Full',
  paid: 'Paid',
  pending: 'Pending',
  refunded: 'Refunded',
  delivered: 'Delivered',
  received: 'Received',
  loaded: 'Loaded',
  verified: 'Verified',
  operational: 'Operational',
  warning: 'Warning',
  critical: 'Critical',
  info: 'Info',
  adult: 'Adult',
  senior: 'Senior',
  pwd: 'PWD',
  child: 'Child',
}

export default function StatusBadge({ status, className = '' }) {
  const style = statusStyles[status] || 'bg-gray-100 text-gray-600'
  const label = statusLabels[status] || status?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Unknown'

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style} ${className}`}>
      {label}
    </span>
  )
}
