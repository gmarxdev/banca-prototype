import { Ship } from 'lucide-react'

const footerLinks = {
  About: [
    { label: 'About BANCA', href: '#about' },
    { label: 'Our Mission', href: '#about' },
    { label: 'Partners', href: '#about' },
  ],
  'For Travelers': [
    { label: 'Book a Trip', href: '#portals' },
    { label: 'Track Cargo', href: '#portals' },
    { label: 'Travel Advisories', href: '#' },
    { label: 'FAQs', href: '#' },
  ],
  'For Operators': [
    { label: 'Register as Operator', href: '#portals' },
    { label: 'Operator Dashboard', href: '#portals' },
    { label: 'Support', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Data Protection', href: '#' },
  ],
}

const partnerLogos = ['SNSU', 'DOST', 'DOT-Caraga', 'MARINA', 'WAVES TBI']

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-banca-600 rounded-lg flex items-center justify-center">
                <Ship className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">BANCA</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Digital Sea Transport Optimization for Sustainable Island Tourism
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Partner Logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            {partnerLogos.map((name) => (
              <span
                key={name}
                className="text-xs font-medium text-gray-500 bg-gray-800 px-3 py-1.5 rounded-md"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Project BANCA &mdash; Surigao del Norte State University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
