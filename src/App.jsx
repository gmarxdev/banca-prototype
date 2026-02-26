import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Landing
import LandingPage from './pages/LandingPage'

// Passenger
import PassengerLogin from './pages/passenger/PassengerLogin'
import PassengerRegister from './pages/passenger/PassengerRegister'
import PassengerLayout from './pages/passenger/PassengerLayout'
import PassengerHome from './pages/passenger/PassengerHome'
import PassengerBook from './pages/passenger/PassengerBook'
import PassengerBookResults from './pages/passenger/PassengerBookResults'
import PassengerBookPassengers from './pages/passenger/PassengerBookPassengers'
import PassengerBookSummary from './pages/passenger/PassengerBookSummary'
import PassengerBookConfirmation from './pages/passenger/PassengerBookConfirmation'
import PassengerTrips from './pages/passenger/PassengerTrips'
import PassengerTripDetail from './pages/passenger/PassengerTripDetail'
import PassengerAdvisories from './pages/passenger/PassengerAdvisories'
import PassengerNotifications from './pages/passenger/PassengerNotifications'
import PassengerProfile from './pages/passenger/PassengerProfile'
import PassengerEditProfile from './pages/passenger/PassengerEditProfile'

// Cargo
import CargoLogin from './pages/cargo/CargoLogin'
import CargoRegister from './pages/cargo/CargoRegister'
import CargoLayout from './pages/cargo/CargoLayout'
import CargoHome from './pages/cargo/CargoHome'
import CargoSend from './pages/cargo/CargoSend'
import CargoTrack from './pages/cargo/CargoTrack'
import CargoHistory from './pages/cargo/CargoHistory'
import CargoShipmentDetail from './pages/cargo/CargoShipmentDetail'
import CargoProfile from './pages/cargo/CargoProfile'

// Terminal Staff
import TerminalLogin from './pages/terminal/TerminalLogin'
import TerminalLayout from './pages/terminal/TerminalLayout'
import TerminalDashboard from './pages/terminal/TerminalDashboard'
import TerminalBoarding from './pages/terminal/TerminalBoarding'
import TerminalTicketing from './pages/terminal/TerminalTicketing'
import TerminalCargoReceive from './pages/terminal/TerminalCargoReceive'
import TerminalCargoLoading from './pages/terminal/TerminalCargoLoading'
import TerminalCargoRelease from './pages/terminal/TerminalCargoRelease'
import TerminalManifests from './pages/terminal/TerminalManifests'
import TerminalSettings from './pages/terminal/TerminalSettings'

// Boat Crew
import CrewLogin from './pages/crew/CrewLogin'
import CrewLayout from './pages/crew/CrewLayout'
import CrewDashboard from './pages/crew/CrewDashboard'
import CrewVerify from './pages/crew/CrewVerify'
import CrewPassengers from './pages/crew/CrewPassengers'
import CrewStatus from './pages/crew/CrewStatus'
import CrewProfile from './pages/crew/CrewProfile'

// Lantsa Operator
import OperatorLogin from './pages/operator/OperatorLogin'
import OperatorRegister from './pages/operator/OperatorRegister'
import OperatorLayout from './pages/operator/OperatorLayout'
import OperatorDashboard from './pages/operator/OperatorDashboard'
import OperatorVessels from './pages/operator/OperatorVessels'
import OperatorSchedules from './pages/operator/OperatorSchedules'
import OperatorCrew from './pages/operator/OperatorCrew'
import OperatorBookings from './pages/operator/OperatorBookings'
import OperatorCargo from './pages/operator/OperatorCargo'
import OperatorFinancials from './pages/operator/OperatorFinancicals'
import OperatorSettings from './pages/operator/OperatorSettings'

// Port Authority
import AuthorityLogin from './pages/authority/AuthorityLogin'
import AuthorityLayout from './pages/authority/AuthorityLayout'
import AuthorityDashboard from './pages/authority/AuthorityDashboard'
import AuthorityVessels from './pages/authority/AuthorityVesselMonitoring'
import AuthorityAdvisories from './pages/authority/AuthorityAdvisories'
import AuthorityCompliance from './pages/authority/AuthorityCompliance'
import AuthorityReports from './pages/authority/AuthorityReports'
import AuthorityPorts from './pages/authority/AuthorityPorts'
import AuthoritySettings from './pages/authority/AuthoritySettings'

// System Admin
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminOperators from './pages/admin/AdminOperators'
import AdminVessels from './pages/admin/AdminVessels'
import AdminPortsRoutes from './pages/admin/AdminPortsRoutes'
import AdminSchedules from './pages/admin/AdminSchedules'
import AdminAdvisories from './pages/admin/AdminAdvisories'
import AdminSystemConfig from './pages/admin/AdminSystemConfig'
import AdminAuditLogs from './pages/admin/AdminAuditLogs'
import AdminSettings from './pages/admin/AdminSettings'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />

        {/* ====== PASSENGER ====== */}
        <Route path="/passenger/login" element={<PassengerLogin />} />
        <Route path="/passenger/register" element={<PassengerRegister />} />
        <Route path="/passenger" element={<PassengerLayout />}>
          <Route index element={<PassengerHome />} />
          <Route path="home" element={<PassengerHome />} />
          <Route path="book" element={<PassengerBook />} />
          <Route path="book/results" element={<PassengerBookResults />} />
          <Route path="book/passengers" element={<PassengerBookPassengers />} />
          <Route path="book/summary" element={<PassengerBookSummary />} />
          <Route path="book/confirmation" element={<PassengerBookConfirmation />} />
          <Route path="trips" element={<PassengerTrips />} />
          <Route path="trips/:id" element={<PassengerTripDetail />} />
          <Route path="advisories" element={<PassengerAdvisories />} />
          <Route path="notifications" element={<PassengerNotifications />} />
          <Route path="profile" element={<PassengerProfile />} />
          <Route path="profile/edit" element={<PassengerEditProfile />} />
        </Route>

        {/* ====== CARGO ====== */}
        <Route path="/cargo/login" element={<CargoLogin />} />
        <Route path="/cargo/register" element={<CargoRegister />} />
        <Route path="/cargo" element={<CargoLayout />}>
          <Route index element={<CargoHome />} />
          <Route path="home" element={<CargoHome />} />
          <Route path="send" element={<CargoSend />} />
          <Route path="track" element={<CargoTrack />} />
          <Route path="history" element={<CargoHistory />} />
          <Route path="shipment/:id" element={<CargoShipmentDetail />} />
          <Route path="profile" element={<CargoProfile />} />
        </Route>

        {/* ====== TERMINAL STAFF ====== */}
        <Route path="/terminal/login" element={<TerminalLogin />} />
        <Route path="/terminal" element={<TerminalLayout />}>
          <Route index element={<TerminalDashboard />} />
          <Route path="dashboard" element={<TerminalDashboard />} />
          <Route path="boarding" element={<TerminalBoarding />} />
          <Route path="ticketing" element={<TerminalTicketing />} />
          <Route path="cargo-receive" element={<TerminalCargoReceive />} />
          <Route path="cargo-loading" element={<TerminalCargoLoading />} />
          <Route path="cargo-release" element={<TerminalCargoRelease />} />
          <Route path="manifests" element={<TerminalManifests />} />
          <Route path="settings" element={<TerminalSettings />} />
        </Route>

        {/* ====== BOAT CREW ====== */}
        <Route path="/crew/login" element={<CrewLogin />} />
        <Route path="/crew" element={<CrewLayout />}>
          <Route index element={<CrewDashboard />} />
          <Route path="dashboard" element={<CrewDashboard />} />
          <Route path="verify" element={<CrewVerify />} />
          <Route path="passengers" element={<CrewPassengers />} />
          <Route path="status" element={<CrewStatus />} />
          <Route path="profile" element={<CrewProfile />} />
        </Route>

        {/* ====== LANTSA OPERATOR ====== */}
        <Route path="/operator/login" element={<OperatorLogin />} />
        <Route path="/operator/register" element={<OperatorRegister />} />
        <Route path="/operator" element={<OperatorLayout />}>
          <Route index element={<OperatorDashboard />} />
          <Route path="dashboard" element={<OperatorDashboard />} />
          <Route path="vessels" element={<OperatorVessels />} />
          <Route path="schedules" element={<OperatorSchedules />} />
          <Route path="crew" element={<OperatorCrew />} />
          <Route path="bookings" element={<OperatorBookings />} />
          <Route path="cargo" element={<OperatorCargo />} />
          <Route path="financials" element={<OperatorFinancials />} />
          <Route path="settings" element={<OperatorSettings />} />
        </Route>

        {/* ====== PORT AUTHORITY ====== */}
        <Route path="/authority/login" element={<AuthorityLogin />} />
        <Route path="/authority" element={<AuthorityLayout />}>
          <Route index element={<AuthorityDashboard />} />
          <Route path="dashboard" element={<AuthorityDashboard />} />
          <Route path="vessels" element={<AuthorityVessels />} />
          <Route path="advisories" element={<AuthorityAdvisories />} />
          <Route path="compliance" element={<AuthorityCompliance />} />
          <Route path="reports" element={<AuthorityReports />} />
          <Route path="ports" element={<AuthorityPorts />} />
          <Route path="settings" element={<AuthoritySettings />} />
        </Route>

        {/* ====== SYSTEM ADMIN ====== */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="operators" element={<AdminOperators />} />
          <Route path="vessels" element={<AdminVessels />} />
          <Route path="ports-routes" element={<AdminPortsRoutes />} />
          <Route path="schedules" element={<AdminSchedules />} />
          <Route path="advisories" element={<AdminAdvisories />} />
          <Route path="system-config" element={<AdminSystemConfig />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
              <p className="text-gray-500 mb-4">Page not found</p>
              <a href="/" className="text-banca-600 font-medium hover:underline">Back to Home</a>
            </div>
          </div>
        } />
      </Routes>
    </>
  )
}

export default App
