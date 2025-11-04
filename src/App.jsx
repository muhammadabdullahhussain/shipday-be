
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpass" element={<Forgetpass />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/newpass" element={<NewPass />} />
      <Route path="/congratulations" element={<Congratulations />} />

      {/*  Nested Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="shipments" element={<Shipments />} />
        <Route path="shipments/:id" element={<ShipmentDetails />} /> {/*  new route */}

      <Route path="route-planning" element={<RoutePlanning />} />
      <Route path="staff" element={<StaffManagement />} />
      <Route path="staff/:id" element={<StaffOverview />} />
      <Route path="drivers" element={<Drivers />} />
      <Route path="fleetmanagement" element={<Fleet />} />
      <Route path="/dashboard/fleetmanagement/:id" element={<VehicleDetailsPage />} />
      <Route path="orders" element={<OrderManagement />} />
      <Route path="orders/:orderId" element={<OrderDetails />} />
      <Route path="customers" element={<Customers />} />
      <Route path="customers/:id" element={<Customerinfo />} />
      <Route path="deliveries" element={<Deliveries />} />
      <Route path="deliveries/:deliveryId" element={<DeliveryDetails />} />

      <Route path="reports" element={<Reports />} />
      <Route path="wherehouse" element={<Wherehouse />}/>
      <Route path="wherehouse/:id" element={<WarehouseDetails />} />
      <Route path="transaction" element={<Transaction/>} />
      <Route path="settings" element={<Settings />} />
    </Route>

    </Routes>
  );
}

export default App;