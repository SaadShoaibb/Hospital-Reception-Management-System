import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Draggable from 'react-draggable';
import './TotalBillByPatientChart.css'; // Import CSS for styling

const TotalBillByPatientChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('../src/Components/db.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData.Bill));
  }, []);

  const processData = () => {
    if (!data || !data.length) {
      return [];
    }

    return data.map(bill => ({
      patient: bill.patient,
      total: bill.total,
    }));
  };

  const chartData = processData();

  return (
    <Draggable>
      <div className="widget-container">
        <h2 className="bar-chart-title">Total Bill by Patient</h2>
        <div className="widget-body">
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="patient" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" barSize={30} />
          </BarChart>
        </div>
      </div>
    </Draggable>
  );
};

export default TotalBillByPatientChart;
