import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./BillDetails.css";

const BillDetails = ({ onAddItem }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });

    axios.get('http://localhost:3000/Patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      const patient = patients.find(p => p.id === selectedPatient);
      if (patient) {
        setPatientPhone(patient.PhoneNo);
        setPatientName(patient.Patient);
        setPatientEmail(patient.Email);
      }
    }
  }, [selectedPatient, patients]);

  const handleAddItem = () => {
    const selectedServiceDetails = services.find(service => service.Service === selectedService);
    const newItem = { 
      item: selectedServiceDetails.Service, 
      quantity: parseInt(quantity), 
      price: parseFloat(selectedServiceDetails.Price) 
    };

    setItems([...items, newItem]);

    const newBillItem = {
      name: newItem.item,
      price: newItem.price,
      quantity: newItem.quantity,
    };

    axios.get(`http://localhost:3000/Bill/${selectedPatient}`)
      .then(response => {
        const bill = response.data;
        bill.services.push(newBillItem);
        bill.total += newItem.price * newItem.quantity;

        axios.put(`http://localhost:3000/Bill/${bill.id}`, bill)
          .then(() => {
            onAddItem(newItem);
            setSelectedService('');
            setQuantity(1);
          })
          .catch(error => {
            console.error('Error updating bill:', error);
          });
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          const newBill = {
            id: selectedPatient,
            patient: patientName,
            services: [newBillItem],
            total: newItem.price * newItem.quantity,
          };

          axios.post('http://localhost:3000/Bill', newBill)
            .then(() => {
              onAddItem(newItem);
              setSelectedService('');
              setQuantity(1);
            })
            .catch(error => {
              console.error('Error creating new bill:', error);
            });
        } else {
          console.error('Error fetching bill:', error);
        }
      });
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);

    setItems(newItems);

    axios.get(`http://localhost:3000/Bill/${selectedPatient}`)
      .then(response => {
        const bill = response.data;
        const deletedItem = items[index];
        const updatedServices = bill.services.filter(service => !(service.name === deletedItem.item && service.price === deletedItem.price && service.quantity === deletedItem.quantity));
        const updatedTotal = updatedServices.reduce((total, service) => total + service.price * service.quantity, 0);

        bill.services = updatedServices;
        bill.total = updatedTotal;

        axios.put(`http://localhost:3000/Bill/${bill.id}`, bill)
          .catch(error => {
            console.error('Error updating bill:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching bill:', error);
      });
  };

  const totalAmount = items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString();

    doc.setFontSize(18);
    doc.text("Bill/Invoice", 14, 22);

    doc.setFontSize(14);
    doc.text(`Patient Name: ${patientName}`, 14, 32);
    doc.text(`Phone Number: ${patientPhone}`, 14, 42);

    const tableColumn = ["Service", "Quantity", "Price"];
    const tableRows = items.map(item => [
      item.item,
      item.quantity,
      item.price.toFixed(2)
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
    });

    doc.setFontSize(14);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Date: ${currentDate}`, 14, doc.autoTable.previous.finalY + 20);

    doc.save('invoice.pdf');
  };

  const handleSendEmail = async () => {
    if (!selectedPatient) {
      console.error('No patient selected.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/sendInvoiceEmail', {
        patientId: selectedPatient,
        items: items,
        totalAmount: totalAmount,
        patientName: patientName,
        patientPhone: patientPhone
      });
      toast.success('Invoice sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Error sending email.');
    }
  };

  return (
    <div className="bill-details">
      <h2>Bill/Invoice Generator</h2>
      <label>
        Patient:
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          <option value="">Select a patient</option>
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.Patient}
            </option>
          ))}
        </select>
      </label>
      <label>
        Phone Number:
        <input type="text" value={patientPhone} readOnly />
      </label>
      <label>
        Service:
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service.No} value={service.Service}>
              {service.Service}
            </option>
          ))}
        </select>
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </label>
      <button type="new" onClick={handleAddItem} className="add-item-button">
        Add Item
      </button>
      <h3>Item List</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="item">
            {item.item} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
            <button onClick={() => handleDeleteItem(index)} className="delete-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <button type="pdf" onClick={generatePDF} className="download-pdf-button">
        Download Invoice as PDF
      </button>
      <button type="send" onClick={handleSendEmail} className="send-email-button">
        Send Invoice as Email
      </button>
      <ToastContainer />
    </div>
  );
};

export default BillDetails;
