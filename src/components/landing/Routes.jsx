import { Waves, Sun, Heart } from 'lucide-react'

const destinations = [
  {
    name: 'Surigao City',
    tagline: 'City of Island Adventures',
    description: 'The gateway to the islands of Surigao del Norte. Start your maritime journey from one of the busiest ports in the region.',
    icon: Waves,
    gradient: 'from-blue-500 to-blue-700',
    highlights: ['Main Port Hub', 'Ferry Terminal', 'City Center Access'],
  },
  {
    name: 'Siargao Island',
    tagline: "World's Best Island",
    description: 'The surfing capital of the Philippines and a world-renowned tropical paradise. Home to Cloud 9 and pristine island-hopping destinations.',
    icon: Sun,
    gradient: 'from-cyan-500 to-blue-600',
    highlights: ['Dapa Port', 'General Luna Port', 'Tourism Hub'],
  },
  {
    name: 'Dinagat Islands',
    tagline: 'Mystical Island Province of Love',
    description: 'An untouched paradise of dramatic rock formations, crystal waters, and warm island communities waiting to be explored.',
    icon: Heart,
    gradient: 'from-blue-600 to-indigo-700',
    highlights: ['San Jose Port', 'Eco-Tourism', 'Cultural Heritage'],
  },
]

export default function RoutesSection() {
  return (
    <section id="routes" className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-banca-600 uppercase tracking-wider mb-2">
            Destinations
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Connecting Island Paradise
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Travel seamlessly between three stunning destinations in
            the Surigao del Norte maritime corridor.
          </p>
        </div>

        {/* Route Map Visual */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
            <RouteNode name="Surigao City" sub="Main Hub" />
            <RouteLine />
            <RouteNode name="Siargao" sub="Dapa / Sta. Monica / Del Carmen" />
            <RouteLine />
            <RouteNode name="Dinagat" sub="San Jose / Pasig" />
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Average travel time: 2-3 hours between ports
          </p>
        </div>

        {/* Destination Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-br ${dest.gradient} p-6 relative overflow-hidden`}>
                <div className="absolute top-2 right-2 opacity-10">
                  <dest.icon className="w-24 h-24 text-white" />
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                    <dest.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                  <p className="text-sm text-white/80">{dest.tagline}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {dest.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dest.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs bg-banca-50 text-banca-700 px-2.5 py-1 rounded-full font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RouteNode({ name, sub }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-banca-100 rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-banca-200">
        <div className="w-4 h-4 bg-banca-600 rounded-full" />
      </div>
      <p className="font-semibold text-gray-900 text-sm">{name}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  )
}

function RouteLine() {
  return (
    <div className="hidden sm:block w-24 lg:w-32 h-0.5 bg-banca-200 mx-2 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-banca-300 to-banca-200 rounded-full" />
    </div>
  )
}
