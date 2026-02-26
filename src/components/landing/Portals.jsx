import { Link } from 'react-router-dom'
import {
  User,
  Package,
  Anchor,
  Users,
  Building2,
  Landmark,
  Settings,
} from 'lucide-react'

const portals = [
  {
    role: 'passenger',
    icon: User,
    title: 'Passengers',
    description: 'Book trips, manage bookings, and receive travel updates.',
    loginPath: '/passenger/login',
    registerPath: '/passenger/register',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    role: 'cargo',
    icon: Package,
    title: 'Cargo Users',
    description: 'Send packages, track shipments, and manage deliveries.',
    loginPath: '/cargo/login',
    registerPath: '/cargo/register',
    extra: { label: 'Track Cargo', path: '/cargo/track' },
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    role: 'operator',
    icon: Anchor,
    title: 'Lantsa Operators',
    description: 'Manage vessels, schedules, crew, and financials.',
    loginPath: '/operator/login',
    registerPath: '/operator/register',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    role: 'crew',
    icon: Users,
    title: 'Boat Crew',
    description: 'Onboard verification, passenger check-in, and status updates.',
    loginPath: '/crew/login',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    role: 'terminal',
    icon: Building2,
    title: 'Terminal Staff',
    description: 'Ticketing, boarding gate control, and cargo processing.',
    loginPath: '/terminal/login',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    role: 'authority',
    icon: Landmark,
    title: 'Port Authority',
    description: 'Port monitoring, travel advisories, and compliance management.',
    loginPath: '/authority/login',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    role: 'admin',
    icon: Settings,
    title: 'System Admin',
    description: 'System configuration, user management, and platform oversight.',
    loginPath: '/admin/login',
    color: 'bg-gray-100 text-gray-600',
  },
]

export default function Portals() {
  return (
    <section id="portals" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-banca-600 uppercase tracking-wider mb-2">
            Access Points
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Access Your Portal
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose your role to login or register. Each portal is tailored
            to your specific needs.
          </p>
        </div>

        {/* Portal Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {portals.map((portal) => (
            <div
              key={portal.role}
              className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-banca-100 transition-all duration-200 flex flex-col"
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${portal.color}`}>
                <portal.icon className="w-5 h-5" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-gray-900 mb-1">{portal.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
                {portal.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <Link
                  to={portal.loginPath}
                  className="w-full text-center bg-banca-600 hover:bg-banca-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </Link>
                {portal.registerPath && (
                  <Link
                    to={portal.registerPath}
                    className="w-full text-center border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Register
                  </Link>
                )}
                {portal.extra && (
                  <Link
                    to={portal.extra.path}
                    className="w-full text-center text-banca-600 hover:text-banca-700 text-sm font-medium px-4 py-1 transition-colors"
                  >
                    {portal.extra.label}
                  </Link>
                )}
                <Link
                  to={`/${portal.role}`}
                  className="w-full text-center text-xs text-gray-400 hover:text-banca-600 py-1 transition-colors"
                >
                  Go to Demo &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
