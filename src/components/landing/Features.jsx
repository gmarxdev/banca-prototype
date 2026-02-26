import { Ticket, Package, Ship, Bell, BarChart3, Shield } from 'lucide-react'

const features = [
  {
    icon: Ticket,
    title: 'Digital Ticketing',
    description: 'Book trips online, get QR codes, and skip the queues at the terminal.',
  },
  {
    icon: Package,
    title: 'Cargo Tracking',
    description: 'Send and track packages with real-time status updates via SMS.',
  },
  {
    icon: Ship,
    title: 'Vessel Visibility',
    description: 'Real-time vessel status, location monitoring, and schedule updates.',
  },
  {
    icon: Bell,
    title: 'Travel Advisories',
    description: 'Instant weather alerts and safety notifications for all routes.',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'AI-powered demand forecasting and transport planning tools.',
  },
  {
    icon: Shield,
    title: 'MARINA Compliant',
    description: 'Digital passenger manifests meeting all regulatory standards.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-banca-600 uppercase tracking-wider mb-2">
            Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            What BANCA Offers
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            A complete digital platform for modernizing maritime transport operations
            in Surigao del Norte.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-banca-100 transition-all duration-200"
            >
              <div className="w-12 h-12 bg-banca-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-banca-100 transition-colors">
                <feature.icon className="w-6 h-6 text-banca-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
