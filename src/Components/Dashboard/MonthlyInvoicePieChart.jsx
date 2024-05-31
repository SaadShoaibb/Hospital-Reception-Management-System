import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './MonthlyInvoicePieChart.css';

const MonthlyInvoicePieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('../src/Components/db.json')
      .then(response => response.json())
      .then(jsonData => setData(jsonData.invoices));
  }, []);

  const processData = () => {
    const invoicesByDate = {};

    data.forEach(invoice => {
      // Validate invoice data
      if (!invoice || !invoice.createdAt || !invoice.amount) {
        console.error('Invoice data is missing required properties:', invoice);
        return; // Skip processing invalid invoices
      }

      const date = invoice.createdAt.split('T')[0]; // Extracting date from createdAt
      const amountString = invoice.amount?.replace('PKR', '').trim(); // Handle missing amount

      // Ensure amountString is valid before parsing
      if (!amountString) {
        console.error('Invoice amount is invalid:', invoice);
        return;  // Skip processing invalid amounts
      }

      const amount = parseFloat(amountString);

      if (!invoicesByDate[date]) {
        invoicesByDate[date] = 0;
      }
      invoicesByDate[date] += amount;
    });

    return Object.keys(invoicesByDate).map(date => ({
      date,
      amount: invoicesByDate[date],
    }));
  };

  const chartData = processData();

  return (
    <div className="pie-chart-wrapper">
      <h2 className="pie-chart-title">Monthly Invoice Amount by Day</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart className="pie-chart">
          <Pie dataKey="amount" data={chartData} fill="#8884d8" label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyInvoicePieChart;
