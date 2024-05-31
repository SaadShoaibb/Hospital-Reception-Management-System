import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import styled from 'styled-components';
import LoginForm from '../src/Components/LoginForm/LoginForm';
import Sidebar from "../src/SideMenu/SideBar";
import  AboutUs from "../src/Components/About/AboutUs";
import Appointments from "../src/Components/AddAppointments/Appointments";
import ShowServices from "../src/Components/Services/ShowServices";
import  Dashboard  from "../src/Components/Dashboard/MainDashboard";
import ShowInvoices from "../src/Components/Invoices/ShowInvoices";
import AddAppointments from '../src/Components/AddAppointments/AddAppointments';
import ShowDoctors from "../src/Components/Doctor/ShowDoctors";
import ShowPatient from "../src/Components/Patient/ShowPatient";
import AddPatient from "../src/Components/Patient/AddPaitent";
import "./App.css";

const AppContainer = styled.div`
  display: inherit;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.sidebarOpen ? '250px' : '0')};
  transition: margin-left 0.3s ease-in-out;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([
    { ID: 1, Patient: "Saad Shoaib", PhoneNo: "03151103929", Email: "sfa@gmail.com", PurposeOfVisit: "Fever", Doctor: "Rana", Date: "11/5/2024", AppointmentTime: "12:30pm" },
    { ID: 2, Patient: "Saad Shoaib", PhoneNo: "03151103929", Email: "sfa@gmail.com", PurposeOfVisit: "ACL", Doctor: "Rana", Date: "11/5/2024", AppointmentTime: "12:30pm" },
  ]);

  const handleLogin = () => setIsLoggedIn(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleAddAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      { ...newAppointment, ID: prevAppointments.length + 1 },
    ]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/Sidebar/*" element={isLoggedIn ? (
          <AppContainer>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <MainContent sidebarOpen={isSidebarOpen}>
              <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Appointment" element={<Appointments appointments={appointments} />} />
                <Route path="/AddAppointments" element={<AddAppointments onAddAppointment={handleAddAppointment} />} />
                <Route path="/Services" element={<ShowServices />} />
                <Route path="/ShowDoctors" element={<ShowDoctors />} />
                <Route path="/ShowInvoices" element={<ShowInvoices />} />
                <Route path="/ShowPatient" element={<ShowPatient />} />
                <Route path="/AddPatient" element={<AddPatient />} />
              </Routes>
            </MainContent>
          </AppContainer>
        ) : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
