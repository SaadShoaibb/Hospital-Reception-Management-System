import React from 'react';
import AppointmentsBydayChart from './AppointmentsBydayChart';
import Draggable from 'react-draggable'; 
import AppointmentsOverTimeChart from './AppointmentsOverTimeChart';
import MonthlyInvoicePieChart from './MonthlyInvoicePieChart';
import AppointmentsByDoctorChart from './AppointmentsPerDoctorChart';
import AppointmentsByPurposeChart from './AppointmentsByPurposeChart';
import TotalBillByPatientChart from './TotalBillByPatientChart';

import './Dashboards.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Draggable defaultPosition={{ x: 0, y: 0 }}>
        <div className="chart-wrapper">
          <AppointmentsBydayChart />
        </div>
      </Draggable>
      <Draggable defaultPosition={{ x: 0, y: 0 }}>
        <div className="chart-wrapper">
          <AppointmentsByDoctorChart />
        </div>
      </Draggable>

      <Draggable defaultPosition={{ x: 0, y: 0 }}>
        <div className="chart-wrapper">
          <MonthlyInvoicePieChart />
        </div>
      </Draggable>
      <Draggable defaultPosition={{ x: 10, y: 0 }}>
        <div className="chart-wrapper">
          <AppointmentsOverTimeChart />
        </div>
      </Draggable>
      <Draggable defaultPosition={{ x: 0, y:30 }}>
        <div className="chart-wrapper">
          <AppointmentsByPurposeChart />
        </div>
        </Draggable>
        <Draggable defaultPosition={{ x: 0, y:100 }}>
        <div className="chart-wrapper">
          <TotalBillByPatientChart />
        </div>
        </Draggable>

    </div>
  );
};

export default Dashboard;
