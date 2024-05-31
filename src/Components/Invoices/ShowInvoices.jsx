import React, { useState, useMemo, useEffect, useRef } from 'react';
import "../AddAppointments/global.css";
import "./ShowInvoices.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import Modal from 'react-modal';
import BillDetails from './BillDetails'; // Import the BillDetails component
import search from "../images/search.png";
import add from "../images/add.png";
import exp from "../images/export.png";

// Initialize the modal
Modal.setAppElement('#root');

const ActionCellRenderer = (props) => {
  const { data, handleEdit, handleDelete } = props;

  const onEditClick = (e) => {
    e.preventDefault(); // Prevent page refresh
    handleEdit(data);
  };

  const onDeleteClick = (e) => {
    e.preventDefault(); // Prevent page refresh
    handleDelete(data.id);
  };

  return (
    <div>
      <button className="action-button-edit" onClick={onEditClick}>Extend</button>
      <button className="action-button-del" onClick={onDeleteClick}>Delete</button>
    </div>
  );
};

const ShowInvoices = () => {
  const gridRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null); // New state for selected patient
  const [formData, setFormData] = useState({ id: '', patient: '', createdAt: '', dueDate: '' });
  const [editMode, setEditMode] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const colDefs = useMemo(() => [
    { field: "patient" },
    { field: "createdAt" },
    { field: "dueDate" },
    {
      headerName: "Actions",
      field: "actions",
      filter: false,
      cellRenderer: (params) => <ActionCellRenderer data={params.data} handleEdit={handleEdit} handleDelete={handleDelete} />
    }
  ], []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    filter: true,
  }), []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/invoices');
        setRowData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchInvoices();
    fetchPatients();
  }, []);

  useEffect(() => {
    // Filter data based on search input
    const filtered = rowData.filter(item =>
      item.patient.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.createdAt.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.dueDate.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchInput, rowData]);

  const handleEdit = (data) => {
    setModalOpen(true);
    setEditMode(true);
    setFormData(data);
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete invoice with ID: ${id}`);
      await axios.delete(`http://localhost:3000/invoices/${id}`);
      setRowData(prevData => prevData.filter(row => row.id !== id));
      setFilteredData(prevData => prevData.filter(row => row.id !== id));
      console.log(`Successfully deleted invoice with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Error deleting invoice. Please try again.');
    }
  };

  const handleAddInvoice = () => {
    setModalOpen(true);
    setEditMode(false);
    setFormData({ id: '', patient: '', createdAt: '', dueDate: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await axios.put(`http://localhost:3000/invoices/${formData.id}`, formData);
        setRowData(rowData.map(row => row.id === formData.id ? formData : row));
        setFilteredData(filteredData.map(row => row.id === formData.id ? formData : row));
      } catch (error) {
        console.error('Error updating invoice:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/invoices', formData);
        setRowData([...rowData, response.data]);
        setFilteredData([...filteredData, response.data]);
      } catch (error) {
        console.error('Error adding invoice:', error);
      }
    }
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const exportToPDF = (event) => {
    event.preventDefault();
    const doc = new jsPDF();
    const columns = colDefs.map(col => ({ title: col.field, dataKey: col.field }));
    const rows = filteredData.map(row => ({
      patient: row.patient,
      createdAt: row.createdAt,
      dueDate: row.dueDate
    }));

    doc.autoTable(columns, rows);
    doc.save('invoices.pdf');
  };

  const handleAddItem = (newItem) => {
    // Handle the item addition logic here if needed
    console.log('New Item Added:', newItem);
  };

  return (
    <div className="invoice">
      <main className="frame-main">
        <section className="frame-section">
          <div className="frame-parent5">
            <div className="frame-parent6">
              <div className="invoice-wrapper">
                <h2 className="invoice-heading">Invoices</h2>
              </div>
              <div className="frame-parent7">
                <input 
                  className='search-app2' 
                  placeholder='Search Invoices' 
                  type='text'
                  value={searchInput}
                  onChange={handleSearchChange}
                />
                <img className="search-icon" loading="lazy" alt="" src={search} />
              </div>
            </div>
            <div className="frame-wrapper3">
              <div className="frame-parent8">
                <div className="frame-parent10-inv">
                  <div className="frame-parent11">
                    <form className="frame-inv-form">
                      <button type="button" className="frame-addnew-button" onClick={handleAddInvoice}>
                        <div className="frame-child11" />
                        <b className="add-new">Create New </b>
                        <img className="more-1-icon" alt="" src={add} />
                      </button>
                      <button type="button" className="frame-export-button" onClick={exportToPDF}>
                        <div className="frame-child11" />
                        <b className="add-new">Export </b>
                        <img className="more-1-icon" alt="" src={exp} />
                      </button>
                      <div className='table-info'>
                        <div className='ag-theme-quartz' style={{ height: 300 }}>
                          <AgGridReact
                            ref={gridRef}
                            rowData={filteredData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setModalOpen(false)}
              contentLabel="Invoice Form"
              className="popup-form"
              overlayClassName="popup-form-overlay"
            >
              <div className="popup-form-content">
                <h2>{editMode ? 'Extend Due Date' : 'Add Invoice'}</h2>
                <form onSubmit={handleFormSubmit}>
                  <label>
                    Patient:
                    <select
                      name="patient"
                      value={formData.patient}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Patient</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.Patient}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Created At:
                    <input
                      type="date"
                      name="createdAt"
                      value={formData.createdAt}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Due Date:
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="submit">{editMode ? 'Update' : 'Add'}</button>
                </form>
                <BillDetails patients={patients} selectedPatient={selectedPatient} onPatientChange={setSelectedPatient} />
              </div>
            </Modal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ShowInvoices;
