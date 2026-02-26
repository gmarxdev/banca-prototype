import { Ship, Package, Users, MapPin } from 'lucide-react'

const stats = [
  { icon: Users, value: '500+', label: 'Passengers Served' },
  { icon: Package, value: '100+', label: 'Cargo Deliveries' },
  { icon: MapPin, value: '4', label: 'Connected Ports' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-banca-600 via-banca-700 to-banca-900" />

      {/* Wave decorations */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="white" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-32 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      <div className="absolute top-48 right-20 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <Ship className="w-3.5 h-3.5" />
            Surigao del Norte Digital Maritime System
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Seamless Island Travel in{' '}
            <span className="text-banca-200">Surigao del Norte</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-banca-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Book tickets, track cargo, and travel smarter across the
            Surigao–Siargao–Dinagat corridor. Digital maritime transport
            for connected island communities.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#portals"
              className="w-full sm:w-auto bg-white text-banca-700 font-semibold px-8 py-3 rounded-lg hover:bg-banca-50 transition-colors shadow-lg shadow-banca-900/20 text-center"
            >
              Book a Trip
            </a>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto border border-white/30 text-white font-medium px-8 py-3 rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              Track Cargo
            </a>
          </div>

          {/* Stats Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-4">
                  <stat.icon className="w-5 h-5 text-banca-200 mx-auto mb-2" />
                  <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-banca-200 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="relative">
        <svg className="w-full h-16 sm:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="#F8FAFC" d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,70 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  )
}
