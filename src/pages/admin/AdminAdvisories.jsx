import { useState } from 'react'
import { Plus, X, Edit2, Trash2, AlertTriangle } from 'lucide-react'
import advisories from '../../data/advisories.json'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'

export default function AdminAdvisories() {
  const [list, setList] = useState(advisories)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', type: 'weather', severity: 'info', affected_ports: [] })

  const openNew = () => {
    setEditing(null)
    setForm({ title: '', description: '', type: 'weather', severity: 'info', affected_ports: [] })
    setShowModal(true)
  }

  const openEdit = (adv) => {
    setEditing(adv.id)
    setForm({ title: adv.title, description: adv.description, type: adv.type, severity: adv.severity, affected_ports: adv.affected_ports })
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.title || !form.description) return
    if (editing) {
      setList(list.map(a => a.id === editing ? { ...a, ...form } : a))
    } else {
      setList([...list, { id: `a${Date.now()}`, ...form, affected_routes: [], issued_at: new Date().toISOString(), expires_at: new Date(Date.now() + 7 * 86400000).toISOString(), status: 'active' }])
    }
    setShowModal(false)
  }

  const handleDelete = (id) => setList(list.filter(a => a.id !== id))

  const togglePort = (portId) => {
    setForm(f => ({ ...f, affected_ports: f.affected_ports.includes(portId) ? f.affected_ports.filter(p => p !== portId) : [...f.affected_ports, portId] }))
  }

  const typeColors = { weather: 'bg-blue-50 text-blue-600', safety: 'bg-orange-50 text-orange-600', port_update: 'bg-green-50 text-green-600' }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">Advisory Management</h1>
        <button onClick={openNew} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"><Plus className="w-4 h-4" /> New Advisory</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[['Total Active', list.filter(a => a.status === 'active').length, 'bg-blue-50 text-blue-600'], ['Weather', list.filter(a => a.type === 'weather').length, 'bg-orange-50 text-orange-600'], ['Critical', list.filter(a => a.severity === 'critical').length, 'bg-red-50 text-red-600']].map(([l, v, c]) => (
          <div key={l} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${c}`}><AlertTriangle className="w-4 h-4" /></div>
            <p className="text-xl font-bold text-gray-900">{v}</p><p className="text-xs text-gray-500">{l}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {list.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[a.type]}`}>{a.type.replace('_', ' ')}</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{a.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={a.severity} />
                <StatusBadge status={a.status} />
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-wrap gap-1">
                {a.affected_ports.map(p => <span key={p} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{ports.find(pt => pt.id === p)?.code || p}</span>)}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(a)} className="text-gray-400 hover:text-banca-600 cursor-pointer"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(a.id)} className="text-gray-400 hover:text-red-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">{editing ? 'Edit Advisory' : 'New Advisory'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Advisory Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
              <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500 resize-none" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                  <option value="weather">Weather</option>
                  <option value="safety">Safety</option>
                  <option value="port_update">Port Update</option>
                </select>
                <select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-banca-500">
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Affected Ports</p>
                <div className="flex flex-wrap gap-2">
                  {ports.map(p => (
                    <button key={p.id} onClick={() => togglePort(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${form.affected_ports.includes(p.id) ? 'bg-banca-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{p.name}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleSave} className="w-full bg-banca-600 hover:bg-banca-700 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer">{editing ? 'Update Advisory' : 'Publish Advisory'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
