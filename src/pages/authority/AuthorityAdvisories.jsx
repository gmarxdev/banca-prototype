import { useState } from 'react'
import { Plus, X, Edit2, XCircle } from 'lucide-react'
import advisories from '../../data/advisories.json'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'

export default function AuthorityAdvisories() {
  const [list, setList] = useState(advisories)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ type: 'weather', title: '', description: '', severity: 'info', ports: [], expiry: '' })
  const portName = (id) => ports.find(p => p.id === id)?.name || id

  const togglePort = (id) => {
    setForm({ ...form, ports: form.ports.includes(id) ? form.ports.filter(p => p !== id) : [...form.ports, id] })
  }

  const createAdvisory = () => {
    const newAdv = { id: `a${Date.now()}`, type: form.type, title: form.title, description: form.description, severity: form.severity, affected_ports: form.ports, affected_routes: [], issued_at: new Date().toISOString(), expires_at: form.expiry || new Date(Date.now() + 86400000 * 3).toISOString(), status: 'active' }
    setList([newAdv, ...list])
    setShowModal(false)
    setForm({ type: 'weather', title: '', description: '', severity: 'info', ports: [], expiry: '' })
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Travel Advisories</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1 bg-banca-600 hover:bg-banca-700 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"><Plus className="w-4 h-4" /> Issue Advisory</button>
      </div>

      <div className="space-y-4">
        {list.map(a => (
          <div key={a.id} className={`bg-white rounded-xl border p-5 ${a.severity === 'critical' ? 'border-red-200' : a.severity === 'warning' ? 'border-yellow-200' : 'border-gray-100'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={a.severity} />
                <span className="text-xs text-gray-500 capitalize">{a.type.replace('_', ' ')}</span>
              </div>
              <div className="flex gap-1">
                <button className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => setList(list.filter(x => x.id !== a.id))} className="p-1 text-gray-400 hover:text-red-500 cursor-pointer"><XCircle className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">{a.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{a.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {a.affected_ports.map(p => <span key={p} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{portName(p)}</span>)}
            </div>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>Issued: {new Date(a.issued_at).toLocaleDateString()}</span>
              <span>Expires: {new Date(a.expires_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Issue Advisory</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"><option value="weather">Weather</option><option value="safety">Safety</option><option value="port_update">Port Update</option></select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Severity</label>
                  <select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"><option value="info">Info</option><option value="warning">Warning</option><option value="critical">Critical</option></select>
                </div>
              </div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none resize-none" /></div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Affected Ports</label>
                <div className="flex flex-wrap gap-2">{ports.map(p => (
                  <label key={p.id} className="flex items-center gap-1 text-sm cursor-pointer"><input type="checkbox" checked={form.ports.includes(p.id)} onChange={() => togglePort(p.id)} className="rounded" />{p.name}</label>
                ))}</div>
              </div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Expiry Date</label><input type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" /></div>
              <button onClick={createAdvisory} className="w-full bg-banca-600 hover:bg-banca-700 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">Issue Advisory</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
