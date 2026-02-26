import { Target, Eye, Handshake } from 'lucide-react'

const partners = [
  { name: 'SNSU', full: 'Surigao del Norte State University' },
  { name: 'DOST', full: 'Department of Science and Technology' },
  { name: 'DOT-Caraga', full: 'Department of Tourism - Caraga' },
  { name: 'MARINA', full: 'Maritime Industry Authority' },
  { name: 'WAVES TBI', full: 'Technology Business Incubator' },
]

export default function About() {
  return (
    <section id="about" className="bg-slate-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-banca-600 uppercase tracking-wider mb-2">
            About the Project
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            About Project BANCA
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Description */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Project BANCA (Building Accessible Networks for Coastal Areas) is a comprehensive
              digital sea transport management system designed for the Surigao–Siargao–Dinagat
              corridor in Surigao del Norte, Philippines. It integrates passenger ticketing,
              cargo tracking, vessel management, and predictive analytics to modernize traditional
              lantsa (small passenger vessel) operations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Developed by Surigao del Norte State University in partnership with key government
              agencies, BANCA aims to improve maritime transportation safety, efficiency, and
              accessibility for island communities while supporting sustainable tourism growth.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-banca-50 rounded-lg flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-banca-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Our Mission</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  To digitize and optimize sea transport operations, making island travel safe,
                  efficient, and accessible for all.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-banca-50 rounded-lg flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5 text-banca-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Our Vision</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  A connected archipelago where every islander and tourist enjoys seamless,
                  technology-driven maritime transportation.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Map Illustration + Partners */}
          <div>
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-banca-500 to-banca-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <circle cx="120" cy="100" r="40" fill="white" />
                  <circle cx="280" cy="80" r="30" fill="white" />
                  <circle cx="200" cy="200" r="35" fill="white" />
                  <path d="M120,100 Q200,60 280,80" stroke="white" strokeWidth="2" strokeDasharray="8,4" fill="none" />
                  <path d="M120,100 Q160,180 200,200" stroke="white" strokeWidth="2" strokeDasharray="8,4" fill="none" />
                  <path d="M280,80 Q240,160 200,200" stroke="white" strokeWidth="2" strokeDasharray="8,4" fill="none" />
                </svg>
              </div>
              <div className="relative text-center">
                <p className="text-banca-100 text-sm font-medium mb-2">Maritime Corridor</p>
                <h3 className="text-white text-xl font-bold mb-6">
                  Surigao – Siargao – Dinagat
                </h3>
                <div className="flex justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-white rounded-full mx-auto mb-1" />
                    <p className="text-banca-100">Surigao City</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-white rounded-full mx-auto mb-1" />
                    <p className="text-banca-100">Siargao</p>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-white rounded-full mx-auto mb-1" />
                    <p className="text-banca-100">Dinagat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partners */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Handshake className="w-5 h-5 text-banca-600" />
                <h3 className="font-semibold text-gray-900">In Partnership With</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {partners.map((p) => (
                  <div
                    key={p.name}
                    title={p.full}
                    className="bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:border-banca-300 transition-colors"
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
