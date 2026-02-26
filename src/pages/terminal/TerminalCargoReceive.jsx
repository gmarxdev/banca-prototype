import { useState } from 'react'
import ports from '../../data/ports.json'
import StatusBadge from '../../components/shared/StatusBadge'

export default function TerminalCargoReceive() {
  const [form, setForm] = useState({ senderName: '', senderMobile: '', recipientName: '', recipientMobile: '', destination: '', description: '', weight: '', declaredValue: '' })
  const [showReceipt, setShowReceipt] = useState(null)
  const [todayCargo, setTodayCargo] = useState([
    { ref: 'BNCA-CRG-20250614C', sender: 'Jose Garcia', dest: 'Dapa Port', weight: 15, fee: 225, time: '05:30 AM' },
    { ref: 'BNCA-CRG-20250614B', sender: 'Lisa Fernandez', dest: 'Dapa Port', weight: 3, fee: 150, time: '09:00 AM' },
  ])
  const update = (k, v) => setForm({ ...form, [k]: v })
  const fee = Math.max(150, (parseFloat(form.weight) || 0) * 15)

  const handleReceive = () => {
    const ref = `BNCA-CRG-${Date.now().toString().slice(-10)}`
    const entry = { ref, sender: form.senderName, dest: ports.find(p => p.id === form.destination)?.name || form.destination, weight: form.weight, fee, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setTodayCargo([entry, ...todayCargo])
    setShowReceipt({ ref, fee })
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Cargo Receiving</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Sender Name</label><input value={form.senderName} onChange={e => update('senderName', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Sender Mobile</label><input value={form.senderMobile} onChange={e => update('senderMobile', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Recipient Name</label><input value={form.recipientName} onChange={e => update('recipientName', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Recipient Mobile</label><input value={form.recipientMobile} onChange={e => update('recipientMobile', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" /></div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Destination Port</label>
            <select value={form.destination} onChange={e => update('destination', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500">
              <option value="">Select</option>
              {ports.filter(p => p.id !== 'surigao').map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div><label className="block text-xs font-medium text-gray-500 mb-1">Description</label><textarea value={form.description} onChange={e => update('description', e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500 resize-none" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Weight (kg)</label><input type="number" value={form.weight} onChange={e => update('weight', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">Declared Value</label><input value={form.declaredValue} onChange={e => update('declaredValue', e.target.value)} placeholder="Optional" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-banca-500" /></div>
          </div>
          <div className="bg-banca-50 rounded-lg p-3 flex justify-between text-sm font-semibold"><span>Estimated Fee</span><span className="text-banca-600">₱{fee.toFixed(0)}</span></div>
          <button onClick={handleReceive} className="w-full bg-banca-600 hover:bg-banca-700 text-white font-semibold py-2.5 rounded-lg cursor-pointer">Receive Cargo</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Today's Received Cargo</h3>
          <div className="space-y-2">
            {todayCargo.map((c, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 text-sm">
                <div><p className="font-medium text-gray-900">{c.sender}</p><p className="text-xs text-gray-400">{c.ref} · {c.dest}</p></div>
                <div className="text-right"><p className="font-medium">₱{c.fee}</p><p className="text-xs text-gray-400">{c.time}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-bold text-green-700 mb-2">Cargo Received!</h3>
            <p className="text-sm text-gray-500 mb-3">Tracking Reference:</p>
            <p className="text-lg font-mono font-bold text-gray-900 mb-2">{showReceipt.ref}</p>
            <p className="text-sm text-gray-500 mb-4">Fee: ₱{showReceipt.fee.toFixed(0)}</p>
            <button onClick={() => { setShowReceipt(null); setForm({ senderName: '', senderMobile: '', recipientName: '', recipientMobile: '', destination: '', description: '', weight: '', declaredValue: '' }) }}
              className="w-full bg-banca-600 text-white py-2 rounded-lg cursor-pointer">Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
