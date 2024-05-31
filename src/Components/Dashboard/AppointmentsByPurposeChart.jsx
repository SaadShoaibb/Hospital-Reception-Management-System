import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Draggable from 'react-draggable';  // Import Draggable
import './AppointmentsByPurposeChart.css'; // Import CSS for styling

const AppointmentsByPurposeChart = ({ sidebarIsOpen, chartColor }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('../src/Components/db.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData.Appointments));
  }, []);

  const processData = () => {
    const appointmentsByPurpose = {};

    data.forEach(appointment => {
      if (!appointmentsByPurpose[appointment.PurposeOfVisit]) {
        appointmentsByPurpose[appointment.PurposeOfVisit] = 0;
      }
      appointmentsByPurpose[appointment.PurposeOfVisit]++;
    });

    return Object.keys(appointmentsByPurpose).map(purpose => ({
      purpose,
      count: appointmentsByPurpose[purpose],
    }));
  };

  const chartData = processData();

  return (
    <Draggable defaultPosition={{ x: 0, y: 0 }}>
      <div
        className="chart-container chart-purpose"
        style={{
          width: sidebarIsOpen ? 'calc(100% - 250px)' : '100%', // Adjust width based on sidebar state
          backgroundColor: '#fff', // Set background color
          margin: '10px', // Add margin for spacing
          borderRadius: '5px', // Add rounded corners
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add subtle shadow
          transition: 'width 0.3s ease-in-out', // Smooth transition for width change
        }}
      >
        <h2 className="pie-chart-title">Appointment By Purpose</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="purpose" />
            <YAxis tickCount={11} domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={chartColor || '#82ca9d'} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Draggable>
  );
};

export default AppointmentsByPurposeChart;
