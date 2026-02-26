import { LayoutDashboard, Users, Building2, Ship, MapPin, Calendar, AlertTriangle, Sliders, FileText, Settings } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const navItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/operators', label: 'Operators', icon: Building2 },
  { path: '/admin/vessels', label: 'Vessels', icon: Ship },
  { path: '/admin/ports-routes', label: 'Ports & Routes', icon: MapPin },
  { path: '/admin/schedules', label: 'Schedules', icon: Calendar },
  { path: '/admin/advisories', label: 'Advisories', icon: AlertTriangle },
  { path: '/admin/system-config', label: 'System Config', icon: Sliders },
  { path: '/admin/audit-logs', label: 'Audit Logs', icon: FileText },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  return (
    <DashboardLayout
      navItems={navItems}
      roleName="System Admin"
      userName="System Administrator"
      subtitle="BANCA Platform"
    />
  )
}

