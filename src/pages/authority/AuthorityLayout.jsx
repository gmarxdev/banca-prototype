import { LayoutDashboard, Ship, AlertTriangle, ShieldCheck, FileText, MapPin, Settings } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/authority/dashboard', end: true },
  { icon: Ship, label: 'Vessel Monitoring', path: '/authority/vessels' },
  { icon: AlertTriangle, label: 'Advisories', path: '/authority/advisories' },
  { icon: ShieldCheck, label: 'Compliance', path: '/authority/compliance' },
  { icon: FileText, label: 'Reports', path: '/authority/reports' },
  { icon: MapPin, label: 'Ports', path: '/authority/ports' },
  { icon: Settings, label: 'Settings', path: '/authority/settings' },
]

export default function AuthorityLayout() {
  return (
    <DashboardLayout
      navItems={navItems}
      roleName="Port Authority"
      userName="Capt. Miguel Torres"
      subtitle="Surigao Port Authority"
    />
  )
}
