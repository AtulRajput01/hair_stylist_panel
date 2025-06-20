import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, } from "react-router-dom";
import App from "./App";
import { Dashboard, Contacts, Calendar, } from "./scenes";
import Login from "./components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import VendorDashboard from "./vendors/VendorDashboard";
import VendorProfile from "./vendors/VendorProfile";
import AppointmentRequests from "./scenes/vendor/AppointmentRequests";
import History from "./scenes/vendor/History";
import Packages from "./scenes/vendor/Packages";
import Availability from "./scenes/vendor/Availability";
import CreateAppointment from "./scenes/vendor/CreateAppointment";
import StylistUsers from "./scenes/vendor/StylistUsers";
import { useAuth } from "./utils/context/AuthContext";
import OrderDetails from "./scenes/admin/OrderDetails";
import CustomerDetails from "./scenes/admin/CustomerDetails";
import RegisteredStylist from "./scenes/admin/RegisteredStylist";
import Category from "./scenes/admin/Category";
import ServiceCategory from "./scenes/admin/ServiceCategory";

const AppRouter = () => {
  const { isAuthenticated, panelType, token, stylistId, login } = useAuth();
  console.log("PrivateRoute", { isAuthenticated, panelType, token, stylistId });

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated === null ? (<div>Loading...</div>) : isAuthenticated ? (<Navigate to="/" replace />) : (<Login onLoginSuccess={login} />)} />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} panelType={panelType} token={token} stylistId={stylistId} />}>
          <Route path="/" element={<App panelType={panelType} />}>
            {panelType === "admin" ? (
              <>
                <Route index element={<Dashboard />} />
                <Route path="customers" element={<CustomerDetails />} />
                <Route path="stylist" element={<RegisteredStylist />} />
                <Route path="category" element={<Category />} />
                <Route path="service" element={<ServiceCategory />} />
                <Route path="order-details" element={<OrderDetails />} />
                <Route path="contacts" element={<Contacts />} />
              </>
            ) : panelType === "vendor" ? (
              <>
                <Route index element={<VendorDashboard />} />
                <Route path="users" element={<StylistUsers />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="appointment-requests" element={<AppointmentRequests />} />
                <Route path="history" element={<History />} />
                <Route path="packages" element={<Packages />} />
                <Route path="availability" element={<Availability />} />
                <Route path="create-appointment" element={<CreateAppointment />} />
                <Route path="stylist-profile" element={<VendorProfile />} />
              </>
            ) : (
              <Route index element={<Navigate to="/login" replace />} />
            )}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
