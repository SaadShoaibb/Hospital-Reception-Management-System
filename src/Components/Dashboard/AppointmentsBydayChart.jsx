import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Draggable from 'react-draggable';
import './AppointmentsBydayChart.css'; // Import CSS for styling

const AppointmentsBydayChart = () => {
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

    const appointmentsByDate = {};
    data.Appointments.forEach(appointment => {
      const date = appointment.Date;
      if (!appointmentsByDate[date]) {
        appointmentsByDate[date] = 0;
      }
      appointmentsByDate[date]++;
    });

    return Object.keys(appointmentsByDate).map(date => ({
      date,
      count: appointmentsByDate[date],
    }));
  };

  const chartData = processData();

  return (
    <Draggable>
      <div className="widget-container">
        <h2 className="pie-chart-title">Appointment by Day</h2>
        <div className="widget-body">
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" barSize={30} /> {/* Change bar color */}
          </BarChart>
        </div>
      </div>
    </Draggable>
  );
};

export default AppointmentsBydayChart;
