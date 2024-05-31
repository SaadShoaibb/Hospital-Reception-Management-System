import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Draggable from 'react-draggable';
import './AppointmentsByDoctorsChart.css'; // Import CSS for styling

const AppointmentsByDoctorsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('../src/Components/db.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData));
  }, []);

  const processData = () => {
    if (!data || !data.Appointments) {
      return [];
    }

    const appointmentsByDoctor = {};
    data.Appointments.forEach(appointment => {
      const doctor = appointment.Doctor;
      if (!appointmentsByDoctor[doctor]) {
        appointmentsByDoctor[doctor] = 0;
      }
      appointmentsByDoctor[doctor]++;
    });

    return Object.keys(appointmentsByDoctor).map(doctor => ({
      doctor,
      count: appointmentsByDoctor[doctor],
    }));
  };

  const chartData = processData();

  return (
    <Draggable>
      <div className="widget-container">
      <h2 className="pie-chart-title">Appointment By Doctors</h2>
        <div className="widget-body">
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="doctor" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#2196F3" barSize={30} />
          </BarChart>
        </div>
      </div>
    </Draggable>
  );
};

export default AppointmentsByDoctorsChart;
