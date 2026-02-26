import { LayoutDashboard, Ship, Calendar, Users, Ticket, Package, DollarSign, Settings } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const navItems = [
  { label: 'Dashboard', path: '/operator/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Vessels', path: '/operator/vessels', icon: Ship },
  { label: 'Schedules', path: '/operator/schedules', icon: Calendar },
  { label: 'Crew', path: '/operator/crew', icon: Users },
  { label: 'Bookings', path: '/operator/bookings', icon: Ticket },
  { label: 'Cargo', path: '/operator/cargo', icon: Package },
  { label: 'Financials', path: '/operator/financials', icon: DollarSign },
  { label: 'Settings', path: '/operator/settings', icon: Settings },
]

export default function OperatorLayout() {
  return (
    <DashboardLayout
      navItems={navItems}
      roleName="Lantsa Operator"
      userName="Roberto Santos"
      subtitle="Island Link Maritime Corp."
    />
  )
}
