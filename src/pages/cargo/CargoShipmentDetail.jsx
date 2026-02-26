import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Circle, MapPin } from 'lucide-react'
import cargoData from '../../data/cargo.json'
import ports from '../../data/ports.json'
import vessels from '../../data/vessels.json'
import StatusBadge from '../../components/shared/StatusBadge'

const steps = ['received', 'loaded', 'in_transit', 'ready_for_pickup', 'delivered']
const stepLabels = { received: 'Received at Origin Port', loaded: 'Loaded on Vessel', in_transit: 'In Transit', ready_for_pickup: 'Ready for Pickup', delivered: 'Delivered to Recipient' }

export default function CargoShipmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const cargo = cargoData.find(c => c.id === id)
  if (!cargo) return <div className="p-8 text-center text-gray-400">Shipment not found</div>

  const portName = (pid) => ports.find(p => p.id === pid)?.name || pid
  const vessel = cargo.vessel_id ? vessels.find(v => v.id === cargo.vessel_id) : null
  const currentStep = steps.indexOf(cargo.status)

  return (
    <div className="min-h-screen bg-slate-50 pt-2 px-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 mb-4 pt-4 cursor-pointer"><ArrowLeft className="w-4 h-4" /> Back</button>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-gray-900">Shipment Details</h1>
        <StatusBadge status={cargo.status} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-xs text-gray-400 mb-1">Tracking Reference</p>
        <p className="text-sm font-bold text-gray-900 font-mono">{cargo.tracking_reference}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-3">Tracking Timeline</p>
        {steps.map((step, i) => (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              {i <= currentStep ? <Check className="w-5 h-5 text-banca-600 shrink-0" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0" />}
              {i < steps.length - 1 && <div className={`w-0.5 h-6 ${i < currentStep ? 'bg-banca-300' : 'bg-gray-200'}`} />}
            </div>
            <p className={`text-sm pb-4 ${i <= currentStep ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{stepLabels[step]}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-2">
        <p className="text-sm font-semibold text-gray-900 mb-1">Cargo Details</p>
        <Row label="Description" value={cargo.description} />
        <Row label="Weight" value={`${cargo.weight} kg`} />
        <Row label="Fee" value={`₱${cargo.fee}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Sender</p>
          <p className="text-sm font-medium text-gray-900">{cargo.sender.name}</p>
          <p className="text-xs text-gray-500">{cargo.sender.mobile}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-2">Recipient</p>
          <p className="text-sm font-medium text-gray-900">{cargo.recipient.name}</p>
          <p className="text-xs text-gray-500">{cargo.recipient.mobile}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-2">
        <Row label="Route" value={`${portName(cargo.origin_port)} → ${portName(cargo.destination_port)}`} />
        {vessel && <Row label="Vessel" value={vessel.name} />}
        <Row label="Sent" value={new Date(cargo.created_at).toLocaleString()} />
      </div>

      {cargo.status === 'ready_for_pickup' && (
        <div className="bg-green-50 rounded-xl border border-green-200 p-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-800">Ready for Pickup</p>
              <p className="text-xs text-green-700 mt-1">Please proceed to {portName(cargo.destination_port)} cargo counter. Bring a valid ID matching the recipient name.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value }) {
  return <div className="flex justify-between text-sm"><span className="text-gray-500">{label}</span><span className="font-medium text-gray-900 text-right">{value}</span></div>
}
