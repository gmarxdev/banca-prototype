import { Search, CalendarDays, QrCode, Ship } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Search',
    description: 'Select your route and travel date from available schedules.',
  },
  {
    number: 2,
    icon: CalendarDays,
    title: 'Book',
    description: 'Choose your preferred schedule, enter passenger details, and confirm.',
  },
  {
    number: 3,
    icon: QrCode,
    title: 'Get QR Ticket',
    description: 'Receive your digital ticket with QR code instantly via SMS.',
  },
  {
    number: 4,
    icon: Ship,
    title: 'Travel',
    description: 'Scan your QR at the terminal and board — no more long queues.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-banca-600 uppercase tracking-wider mb-2">
            Simple Process
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Travel Made Simple
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            From booking to boarding in just four easy steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-banca-100" />
              )}

              {/* Icon Circle */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 bg-banca-100 rounded-2xl mb-5">
                <step.icon className="w-7 h-7 text-banca-600" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-banca-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
