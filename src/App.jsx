
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/loginPage';
import Register from './pages/registerPage';
import Forgetpass from './pages/forgetPassPage';
import Verification from './pages/verificationPage';
import NewPass from "./pages/newPassPage";
import Congratulations from "./pages/congratulationsPage";
import DashboardPage from './pages/Dashboard/DashboardPage';
import Shipments from './pages/Dashboard/Shipments';
import RoutePlanning from './pages/Dashboard/routePlanningPage';
import StaffManagement from './pages/Dashboard/StaffManagement';
import OrderManagement from './pages/Dashboard/OrderManagement';
import Customers from './pages/Dashboard/Customers';
import Deliveries from './pages/Dashboard/Deliveries';
import Reports from './pages/Dashboard/Reports';
import Wherehouse from './pages/Dashboard/warehousePage';
import Settings from './pages/Dashboard/settingsPage';
import ShipmentDetails from './pages/Dashboard/shipmentDetailsPage'; //  import the page
import StaffOverview from "./pages/Dashboard/staffOverviewPage";
import OrderDetails from "./pages/Dashboard/orderDetailsPage";
import Customerinfo from "./pages/Dashboard/customerInfoPage";
import DeliveryDetails from "./pages/Dashboard/DeliveryDetails";
import WarehouseDetails from "./pages/Dashboard/WarehouseDetails";
import Transaction from "./pages/Dashboard/transactionPage";
import Fleet from "./pages/Dashboard/fleetManagementPage";
import VehicleDetailsPage from './pages/Dashboard/VehicleDetailsPage';
import Drivers from './pages/Dashboard/Drivers';
import DashboardLayout from './Layouts/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRedirect from './components/AuthRedirect';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import PaymentSelectionPage from './pages/PaymentSelectionPage';

console.log('📦 App.jsx: Component file loaded');

import PublicLayout from './Layouts/PublicLayout';
import Home from './pages/Public/Home';
import Services from './pages/Public/Services';
import Contact from './pages/Public/Contact';
import TrackingPage from './pages/Public/TrackingPage';
import SendParcel from './pages/Public/SendParcel';

function App() {
  console.log('🎯 App.jsx: App component rendering...');

  return (
    <>
      <Routes>
        {/* Public Routes - Wrapped in PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/send-parcel" element={<SendParcel />} />
        </Route>

        {/* Auth Routes - Standalone */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpass" element={<Forgetpass />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/newpass" element={<NewPass />} />
        <Route path="/congratulations" element={<Congratulations />} />

        {/* Payment Feedback Routes */}
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/cancel" element={<PaymentCancelPage />} />
        <Route path="/payment/select" element={<PaymentSelectionPage />} />

        {/*  Nested Dashboard Routes - Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="shipments" element={<Shipments />} />
          <Route index element={<DashboardPage />} />
          <Route path="shipments/:id" element={<ShipmentDetails />} /> {/*  new route */}

          <Route path="route-planning" element={<RoutePlanning />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="staff/:id" element={<StaffOverview />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="fleetmanagement" element={<Fleet />} />
          <Route path="fleetmanagement/:id" element={<VehicleDetailsPage />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<Customerinfo />} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="deliveries/:deliveryId" element={<DeliveryDetails />} />

          <Route path="reports" element={<Reports />} />
          <Route path="wherehouse" element={<Wherehouse />} />
          <Route path="wherehouse/:id" element={<WarehouseDetails />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;