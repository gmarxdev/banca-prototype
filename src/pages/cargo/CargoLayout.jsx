import { Home, Send, Search, History, User } from 'lucide-react'
import MobileLayout from '../../components/shared/MobileLayout'

const navItems = [
  { icon: Home, label: 'Home', path: '/cargo/home', end: true },
  { icon: Send, label: 'Send', path: '/cargo/send' },
  { icon: Search, label: 'Track', path: '/cargo/track' },
  { icon: History, label: 'History', path: '/cargo/history' },
  { icon: User, label: 'Profile', path: '/cargo/profile' },
]

export default function CargoLayout() {
  return <MobileLayout navItems={navItems} title="BANCA Cargo" />
}
