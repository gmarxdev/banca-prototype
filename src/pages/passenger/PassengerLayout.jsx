import { Home, Ticket, List, Bell, User } from 'lucide-react'
import MobileLayout from '../../components/shared/MobileLayout'

const navItems = [
  { icon: Home, label: 'Home', path: '/passenger/home', end: true },
  { icon: Ticket, label: 'Book', path: '/passenger/book' },
  { icon: List, label: 'My Trips', path: '/passenger/trips' },
  { icon: Bell, label: 'Alerts', path: '/passenger/advisories' },
  { icon: User, label: 'Profile', path: '/passenger/profile' },
]

export default function PassengerLayout() {
  return <MobileLayout navItems={navItems} title="BANCA" />
}
