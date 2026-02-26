import { LayoutDashboard, ScanLine, Users, Ship, User } from 'lucide-react'
import MobileLayout from '../../components/shared/MobileLayout'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/crew/dashboard', end: true },
  { icon: ScanLine, label: 'Verify', path: '/crew/verify' },
  { icon: Users, label: 'Passengers', path: '/crew/passengers' },
  { icon: Ship, label: 'Status', path: '/crew/status' },
  { icon: User, label: 'Profile', path: '/crew/profile' },
]

export default function CrewLayout() {
  return <MobileLayout navItems={navItems} title="BANCA Crew" />
}
