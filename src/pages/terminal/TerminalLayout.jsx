import { LayoutDashboard, ScanLine, Ticket, PackagePlus, Truck, PackageCheck, ClipboardList, Settings } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/terminal/dashboard', end: true },
  { icon: ScanLine, label: 'Boarding Gate', path: '/terminal/boarding' },
  { icon: Ticket, label: 'Walk-in Ticketing', path: '/terminal/ticketing' },
  { icon: PackagePlus, label: 'Cargo Receiving', path: '/terminal/cargo-receive' },
  { icon: Truck, label: 'Cargo Loading', path: '/terminal/cargo-loading' },
  { icon: PackageCheck, label: 'Cargo Release', path: '/terminal/cargo-release' },
  { icon: ClipboardList, label: 'Manifests', path: '/terminal/manifests' },
  { icon: Settings, label: 'Settings', path: '/terminal/settings' },
]

export default function TerminalLayout() {
  return (
    <DashboardLayout
      navItems={navItems}
      roleName="Terminal Staff"
      userName="Gloria Reyes"
      subtitle="Surigao City Port"
    />
  )
}
