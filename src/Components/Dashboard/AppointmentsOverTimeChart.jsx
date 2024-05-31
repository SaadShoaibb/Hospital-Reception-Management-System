import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Draggable from 'react-draggable';
import './AppointmentsOverTimeChart.css';

const AppointmentsOverTimeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('../src/Components/db.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData.Appointments));
  }, []);

  const processData = () => {
    const appointmentsByDate = {};

    data.forEach(appointment => {
      if (!appointmentsByDate[appointment.Date]) {
        appointmentsByDate[appointment.Date] = 0;
      }
      appointmentsByDate[appointment.Date]++;
    });

    return Object.keys(appointmentsByDate).map(date => ({
      date,
      count: appointmentsByDate[date],
    }));
  };

  const chartData = processData();

  return (
    <Draggable>
      <div className="chart-container">
      <h2 className="pie-chart-title">Appointment Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Draggable>
  );
};

export default AppointmentsOverTimeChart;
