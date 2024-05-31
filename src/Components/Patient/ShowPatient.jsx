import React, { useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import Modal from 'react-modal';
import search from "../images/search.png";
import month from "../images/30-days.png";
import add from "../images/add.png";
import "./ShowPatient.css";
import "./global1.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Initialize the modal
Modal.setAppElement('#root');

const ActionCellRenderer = ({ data, handleEdit, handleDelete }) => {
  return (
    <div>
      <button className="action-button-edit" onClick={() => handleEdit(data)}>Edit</button>
      <button className="action-button-del" onClick={() => handleDelete(data.id)}>Delete</button>
    </div>
  );
};

const Patient = () => {
  const [rowData, setRowData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', Patient: '', PhoneNo: '', Email: '', Date: '' });
  const [editMode, setEditMode] = useState(false);

  const DefaultcolDefs = useMemo(() => ({
    flex: 1,
    filter: true,
  }), []);

  const handleEdit = (data) => {
    setShowForm(true);
    setEditMode(true);
    setFormData(data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Patients/${id}`);
      setRowData(prevData => prevData.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const colDefs = useMemo(() => [
    { field: "id" },
    { field: "Patient" },
    { field: "PhoneNo" },
    { field: "Email" },
    { field: "Date" },
    {
      headerName: "Actions",
      field: "actions",
      filter: false,
      cellRenderer: (params) => (
        <ActionCellRenderer 
          data={params.data} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
        />
      ),
    },
  ], [handleEdit, handleDelete]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Patients');
        setRowData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPatients();
  }, []);

  const handleAddPatient = () => {
    setShowForm(true);
    setEditMode(false);
    setFormData({ id: '', Patient: '', PhoneNo: '', Email: '', Date: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await axios.put(`http://localhost:3000/Patients/${formData.id}`, formData);
        setRowData(rowData.map(row => row.id === formData.id ? formData : row));
      } catch (error) {
        console.error('Error updating patient:', error);
      }
    } else {
      try {
        const existingIds = new Set(rowData.map(row => row.id));
        let newId;
        do {
          newId = (Math.floor(Math.random() * 10000) + 1).toString();
        } while (existingIds.has(newId));

        const newPatient = { ...formData, id: newId };
        const response = await axios.post('http://localhost:3000/Patients', newPatient);
        setRowData([...rowData, response.data]);
      } catch (error) {
        console.error('Error adding patient:', error);
      }
    }
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="appointments">
      <main className="frame-main">
        <section className="frame-section">
          <div className="frame-parent5">
            <div className="frame-parent6">
              <div className="appointments-wrapper">
                <h2 className="appointments1">Patients</h2>
              </div>
              <div className="frame-parent7">
                <input className='search-app' placeholder='Search Patient' type='text' />
                <div className="frame-child4" />
                <img className="search-icon" loading="lazy" alt="" src={search} />
                <div className="search-appointments-wrapper">
                  <div className="search-appointments"></div>
                </div>
              </div>
            </div>
            <div className="frame-wrapper3">
              <div className="frame-parent8">
                <div className="frame-wrapper4">
                  <div className="rectangle-parent2-patient">
                    <div className="frame-child5" />
                    <div className="frame-parent9">
                      <div className="monthly-appointments-parent">
                        <h1 className="monthly-appointments">Total Patients</h1>
                        <div className="wrapper">
                          <b className="b">{rowData.length}</b>
                        </div>
                      </div>
                      <div className="total-123-appointments-this-mo-wrapper">
                        <div className="total-123-appointments-container">
                          <span>{`Total `}</span>
                          <span className="span">{`${rowData.length} `}</span>
                          <span>Patients</span>
                          <span className="span1">{` `}</span>
                          <span> this month</span>
                        </div>
                      </div>
                    </div>
                    <div className="days-1-wrapper">
                      <img className="days-1-icon" loading="lazy" alt="" src={month} />
                    </div>
                  </div>
                </div>
                <div className="frame-parent10">
                  <div className="frame-parent11">
                    <div className="frame-button-container">
                      <button type="button" className="frame-button" onClick={handleAddPatient}>
                        <div className="frame-child11" />
                        <b className="add-new">New Patient</b>
                        <img className="more-1-icon" alt="" src={add} />
                      </button>
                    </div>
                    <div className='table-info'>
                      <div className='ag-theme-quartz' style={{ height: 500 }}>
                        <AgGridReact
                          rowData={rowData}
                          columnDefs={colDefs}
                          defaultColDef={DefaultcolDefs}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="appointments-child2" />

      <Modal
        isOpen={showForm}
        onRequestClose={() => setShowForm(false)}
        contentLabel="Patient Form"
        className="popup-form-patients"
        overlayClassName="popup-form-overlay"
      >
        <div className="popup-form-content">
          <form onSubmit={handleFormSubmit}>
            <h2>{editMode ? 'Edit Patient' : 'Add Patient'}</h2>
            <label>
              Patient Name:
              <input type="text" name="Patient" value={formData.Patient} onChange={handleInputChange} required />
            </label>
            <div className="form-row">
              <label>
                Contact:
                <input type="text" name="PhoneNo" value={formData.PhoneNo} onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="Email" value={formData.Email} onChange={handleInputChange} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Date:
                <input type="date" name="Date" value={formData.Date} onChange={handleInputChange} required />
              </label>
            </div>
            <div className="form-buttons">
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit">{editMode ? 'Update' : 'Add'}</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Patient;
