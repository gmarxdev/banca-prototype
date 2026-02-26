import { useState } from 'react'
import toast from 'react-hot-toast'
import { Save, AlertTriangle } from 'lucide-react'

export default function AdminSystemConfig() {
  const [config, setConfig] = useState({
    baseFareMotorized: 350,
    baseFareFastCraft: 550,
    cargoRatePerKg: 15,
    minCargoFee: 150,
    terminalFee: 20,
    seniorDiscount: 20,
    pwdDiscount: 20,
    studentDiscount: 20,
    childDiscount: 50,
    maxBookingAdvanceDays: 30,
    cancellationCutoffHours: 4,
    maintenanceMode: false,
    allowGuestTracking: true,
    requireIdVerification: true,
    autoConfirmBookings: false,
    sendSmsNotifications: true,
    sendEmailNotifications: false,
    maxPassengersPerBooking: 10,
    weatherApiEnabled: true,
    distressSignalEnabled: true,
  })

  const handleSave = () => toast.success('Configuration saved successfully')

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  )

  const NumberField = ({ label, configKey, suffix }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-1">
        <input type="number" value={config[configKey]}
          onChange={e => setConfig({ ...config, [configKey]: Number(e.target.value) })}
          className="w-24 text-right border border-gray-300 rounded-lg px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-banca-500" />
        {suffix && <span className="text-xs text-gray-400 w-8">{suffix}</span>}
      </div>
    </div>
  )

  const ToggleField = ({ label, configKey, description }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <span className="text-sm text-gray-700">{label}</span>
        {description && <p className="text-xs text-gray-400">{description}</p>}
      </div>
      <button onClick={() => setConfig({ ...config, [configKey]: !config[configKey] })}
        className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${config[configKey] ? 'bg-banca-600' : 'bg-gray-300'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${config[configKey] ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-xl font-bold text-gray-900">System Configuration</h1>
        <button onClick={handleSave} className="flex items-center gap-1 bg-banca-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="max-w-2xl">
        <Section title="Fare Settings">
          <NumberField label="Base Fare - Motorized Banca" configKey="baseFareMotorized" suffix="₱" />
          <NumberField label="Base Fare - Fast Craft" configKey="baseFareFastCraft" suffix="₱" />
          <NumberField label="Cargo Rate per kg" configKey="cargoRatePerKg" suffix="₱/kg" />
          <NumberField label="Minimum Cargo Fee" configKey="minCargoFee" suffix="₱" />
          <NumberField label="Terminal Fee" configKey="terminalFee" suffix="₱" />
        </Section>

        <Section title="Discount Rates">
          <NumberField label="Senior Citizen Discount" configKey="seniorDiscount" suffix="%" />
          <NumberField label="PWD Discount" configKey="pwdDiscount" suffix="%" />
          <NumberField label="Student Discount" configKey="studentDiscount" suffix="%" />
          <NumberField label="Child Discount" configKey="childDiscount" suffix="%" />
        </Section>

        <Section title="Booking Settings">
          <NumberField label="Max Advance Booking Days" configKey="maxBookingAdvanceDays" suffix="days" />
          <NumberField label="Cancellation Cutoff" configKey="cancellationCutoffHours" suffix="hrs" />
          <NumberField label="Max Passengers per Booking" configKey="maxPassengersPerBooking" />
          <ToggleField label="Auto-Confirm Bookings" configKey="autoConfirmBookings" description="Automatically confirm bookings after payment" />
          <ToggleField label="Require ID Verification" configKey="requireIdVerification" description="Require valid ID for all passengers" />
        </Section>

        <Section title="Feature Toggles">
          <ToggleField label="Guest Cargo Tracking" configKey="allowGuestTracking" description="Allow tracking without login" />
          <ToggleField label="SMS Notifications" configKey="sendSmsNotifications" />
          <ToggleField label="Email Notifications" configKey="sendEmailNotifications" />
          <ToggleField label="Weather API Integration" configKey="weatherApiEnabled" />
          <ToggleField label="Distress Signal System" configKey="distressSignalEnabled" description="Enable emergency distress signals for crew" />
        </Section>

        <Section title="System Maintenance">
          <div className={`rounded-lg p-4 mb-3 ${config.maintenanceMode ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-4 h-4 ${config.maintenanceMode ? 'text-red-500' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">{config.maintenanceMode ? 'Maintenance Mode is ON' : 'System is Running Normally'}</span>
            </div>
            <p className="text-xs text-gray-500">When enabled, all public-facing portals display a maintenance message. Only admins can access the system.</p>
          </div>
          <ToggleField label="Maintenance Mode" configKey="maintenanceMode" description="Take the platform offline for maintenance" />
        </Section>
      </div>
    </div>
  )
}
