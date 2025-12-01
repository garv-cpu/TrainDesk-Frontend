import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

// Public Pages
import Home from './pages/Home';
import Login from './pages/AdminLogin';

// Admin Pages
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import SOPList from './pages/SOPList';
import Training from './pages/Training';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Roles from "./pages/Roles";
import Notifications from "./pages/Notifications";
import EmployeeTrainingProgress from "./pages/EmployeeTrainingProgress";

// SOP CRUD
import CreateSOP from "./pages/CreateSOP";
import EditSOP from "./pages/EditSOP";
import ViewSOP from "./pages/ViewSOP";

// Employee Frontend Pages
import EmployeeLogin from "./pages/Employee/EmployeeLogin"
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import EmployeeTraining from "./pages/Employee/EmployeeTraining";
import EmployeeSOP from "./pages/Employee/EmployeeSOP";
import EmployeeQuiz from "./pages/Employee/EmployeeQuiz";
import EmployeeComplete from "./pages/Employee/EmployeeComplete";

// Routes
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import EmployeePrivateRoute from "./routes/EmployeePrivateRoute";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import PricingModal from "./components/PricingModal";
import { useContext } from "react";
import { PricingContext } from "./utils/PricingContext";
import PaymentSuccess from "./pages/PaymentSuccess";
import EmployeeSOPListPage from "./pages/Employee/EmployeeSOPListPage";
import TrainingPlayer from "./pages/TrainingPlayer";


export default function App() {
  const { isPricingOpen, closePricing } = useContext(PricingContext);
  ;
  return (
    <>
      <Toaster position="top-center" />
      <PricingModal open={isPricingOpen} onClose={closePricing} />

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* EMPLOYEE LOGIN */}
        <Route path="/employee/login" element={<EmployeeLogin />} />

        {/* EMPLOYEE AUTH + DASHBOARD */}
        <Route path="/employee"
          element={
            <EmployeePrivateRoute>
              <EmployeeLayout />
            </EmployeePrivateRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="training" element={<EmployeeTraining />} />
          <Route path="training/:id" element={<EmployeeQuiz />} />

          {/* FIXED ROUTES */}
          <Route path="sops" element={<EmployeeSOPListPage />} />
          <Route path="sops/:id" element={<EmployeeSOP />} />

          <Route path="complete" element={<EmployeeComplete />} />
        </Route>


        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="employees">
            <Route index element={<Employees />} />
            <Route path="create" element={<CreateEmployee />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>

          <Route path="training" element={<Training />} />
          <Route path="training/:id" element={<TrainingPlayer />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="roles" element={<Roles />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="training-progress" element={<EmployeeTrainingProgress />} />

          {/* SOP CRUD */}
          <Route path="sops">
            <Route index element={<SOPList />} />
            <Route path="create" element={<CreateSOP />} />
            <Route path="edit/:id" element={<EditSOP />} />
            <Route path="view/:id" element={<ViewSOP />} />
          </Route>
        </Route>

        {/* EMPLOYEE DASHBOARD */}
        <Route path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="employees">
            <Route index element={<Employees />} />
            <Route path="create" element={<CreateEmployee />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>

          <Route path="training" element={<Training />} />
          <Route path="training/:id" element={<TrainingPlayer />} />   {/* FIXED */}

          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="roles" element={<Roles />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="training-progress" element={<EmployeeTrainingProgress />} />

          <Route path="sops">
            <Route index element={<SOPList />} />
            <Route path="create" element={<CreateSOP />} />
            <Route path="edit/:id" element={<EditSOP />} />
            <Route path="view/:id" element={<ViewSOP />} />
          </Route>
        </Route>


      </Routes>
    </>
  );
}
