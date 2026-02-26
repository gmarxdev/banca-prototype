import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown, Ship } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Routes', href: '#routes' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [portalOpen, setPortalOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-banca-600 rounded-lg flex items-center justify-center">
              <Ship className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BANCA</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-banca-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setPortalOpen(!portalOpen)}
                className="flex items-center gap-1 text-sm font-medium text-banca-600 hover:text-banca-700 transition-colors cursor-pointer"
              >
                Login
                <ChevronDown className="w-4 h-4" />
              </button>
              {portalOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setPortalOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    <PortalLink to="/passenger/login" label="Passenger" />
                    <PortalLink to="/cargo/login" label="Cargo User" />
                    <PortalLink to="/operator/login" label="Lantsa Operator" />
                    <PortalLink to="/crew/login" label="Boat Crew" />
                    <PortalLink to="/terminal/login" label="Terminal Staff" />
                    <PortalLink to="/authority/login" label="Port Authority" />
                    <PortalLink to="/admin/login" label="System Admin" />
                  </div>
                </>
              )}
            </div>
            <a
              href="#portals"
              className="bg-banca-600 hover:bg-banca-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-gray-600 hover:text-banca-600 py-2"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-gray-100" />
            <a
              href="#portals"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-banca-600 hover:bg-banca-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

function PortalLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-banca-50 hover:text-banca-600 transition-colors"
    >
      {label}
    </Link>
  )
}
