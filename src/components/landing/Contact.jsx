import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo only - no backend
    alert('Thank you for your message! This is a demo — no message was actually sent.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-banca-600 uppercase tracking-wider mb-2">
            Reach Out
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have questions about BANCA? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none transition-shadow"
                  placeholder="Juan Dela Cruz"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none transition-shadow"
                  placeholder="juan@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-banca-500 focus:border-banca-500 outline-none transition-shadow resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-banca-600 hover:bg-banca-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <ContactItem
                  icon={MapPin}
                  title="Address"
                  detail="Surigao del Norte State University, Surigao City, Surigao del Norte, Philippines 8400"
                />
                <ContactItem
                  icon={Phone}
                  title="Phone"
                  detail="+63 (086) 826-1437"
                />
                <ContactItem
                  icon={Mail}
                  title="Email"
                  detail="banca@gmail.com"
                />
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-banca-50 to-banca-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[200px]">
              <MapPin className="w-8 h-8 text-banca-400 mb-3" />
              <p className="text-sm font-medium text-banca-700">Surigao del Norte</p>
              <p className="text-xs text-banca-500 mt-1">Caraga Region, Philippines</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon: Icon, title, detail }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-banca-50 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-banca-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{detail}</p>
      </div>
    </div>
  )
}
