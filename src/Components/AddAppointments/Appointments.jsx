import React, { useState, useMemo, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import Modal from 'react-modal';
import month from "../images/30-days.png";
import add from "../images/add.png";
import search from "../images/search.png";
import "./Appointments.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Initialize the modal
Modal.setAppElement('#root');

const ActionCellRenderer = (props) => {
  const { data, handleEdit, handleDelete } = props;

  return (
    <div>
      <button className="action-button-edit" onClick={() => handleEdit(data)}>Edit</button>
      <button className="action-button-del" onClick={() => handleDelete(data.id)}>Delete</button>
    </div>
  );
};

const Appointments = () => {
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: '', Patient: '', PhoneNo: '', Email: '', PurposeOfVisit: '', Doctor: '', Date: '', AppointmentTime: '', Description: '' });
  const [editMode, setEditMode] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [patients, setPatients] = useState([]);

  const DefaultcolDefs = useMemo(() => {
    return {
      flex: 1,
      filter: true,
    };
  }, []);

  const handleEdit = (data) => {
    setShowForm(true);
    setEditMode(true);
    setFormData(data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Appointments/${id}`);
      setRowData(prevData => prevData.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const [colDefs] = useState([
    { field: "Patient" },
    { field: "PhoneNo" },
    { field: "Email" },
    { field: "PurposeOfVisit", headerName: "Services" },
    { field: "Doctor" },
    { field: "Date" },
    { field: "AppointmentTime", headerName: "Appointment Time" },
    { field: "Description" },
    {
      headerName: "Actions",
      field: "actions",
      filter: false,
      cellRenderer: (params) => <ActionCellRenderer data={params.data} handleEdit={handleEdit} handleDelete={handleDelete} />
    }
  ]);

  useEffect(() => {
    // Fetch appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Appointments');
        setRowData(response.data);
        setFilteredData(response.data);  // Set filteredData to response data initially
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    // Fetch doctors from the server
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Doctor');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Fetch services from the server
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    // Fetch patients from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    // Filter data based on search input
    const filtered = rowData.filter(item =>
      item.Patient.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.PhoneNo.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.PurposeOfVisit.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.Doctor.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.Date.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.AppointmentTime.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.Description.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchInput, rowData]);

  const handleAddAppointment = () => {
    setShowForm(true);
    setEditMode(false);
    setFormData({ id: '', Patient: '', PhoneNo: '', Email: '', PurposeOfVisit: '', Doctor: '', Date: '', AppointmentTime: '', Description: '' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      try {
        await axios.put(`http://localhost:3000/Appointments/${formData.id}`, formData);
        setRowData(rowData.map(row => row.id === formData.id ? formData : row));
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/Appointments', formData);
        setRowData([...rowData, response.data]);
      } catch (error) {
        console.error('Error adding appointment:', error);
      }
    }
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePatientChange = (e) => {
    const selectedPatientId = e.target.value;
    const selectedPatient = patients.find(patient => patient.id === selectedPatientId);
    if (selectedPatient) {
      setFormData({ 
        ...formData, 
        Patient: selectedPatient.Patient,
        PhoneNo: selectedPatient.PhoneNo,
        Email: selectedPatient.Email
      });
    }
  };

  return (
    <div className="appointments">
      <main className="frame-main">
        <section className="frame-section">
          <div className="frame-parent5">
            <div className="frame-parent6">
              <div className="appointments-wrapper">
                <h2 className="appointments1">Appointments</h2>
              </div>
              <div className="frame-parent7">
                <input 
                  className='search-app' 
                  placeholder='Search Appointments' 
                  type='text'
                  value={searchInput}
                  onChange={handleSearchChange}
                />
                <div className="frame-child4" />
                <img className="search-icon" loading="lazy" alt="" src={search} />
                <div className="search-appointments-wrapper">
                  <div className="search-appointments"></div>
                </div>
              </div>
            </div>
            <div className="frame-wrapper3">
              <div className="frame-parent8">
                <div className="rectangle-parent2">
                  <div className="frame-child5" />
                  <div className="frame-parent9">
                    <div className="monthly-appointments-parent">
                      <h1 className="monthly-appointments">Monthly Appointments</h1>
                      <div className="wrapper">
                        <b className="b">{rowData.length}</b>
                      </div>
                    </div>
                    <div className="total-123-appointments-this-mo-wrapper">
                      <div className="total-123-appointments-container">
                        <span>{`Total `}</span>
                        <span className="span">{`${rowData.length} `}</span>
                        <span>Appointments</span>
                        <span className="span1">{` `}</span>
                        <span> this month</span>
                      </div>
                    </div>
                  </div>
                  <div className="days-1-wrapper">
                    <img className="days-1-icon" loading="lazy" alt="" src={month} />
                  </div>
                </div>
                <div className="frame-parent10">
                  <div className="frame-child10" />
                  <div className="frame-parent11">
                    <button className="frame-button" onClick={handleAddAppointment}>
                      <b className="add-new">Add New </b>
                      <img className="more-1-icon" alt="" src={add} />
                    </button>
                    <div className='table-info'>
                      <div className='ag-theme-quartz' style={{ height: 500 }}>
                        <AgGridReact rowData={filteredData} columnDefs={colDefs} defaultColDef={DefaultcolDefs} />
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
        contentLabel="Appointment Form"
        className="popup-form"
        overlayClassName="popup-form-overlay"
      >
        <div className="popup-form-content">
          <form onSubmit={handleFormSubmit}>
            <h2>{editMode ? 'Edit Appointment' : 'Add Appointment'}</h2>
            <label>
              Patient Name:
              <select name="Patient" value={patients.find(p => p.Patient === formData.Patient)?.id || ''} onChange={handlePatientChange} required>
                <option value="">Select a patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.Patient}</option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                Services:
                <select name="PurposeOfVisit" value={formData.PurposeOfVisit} onChange={handleInputChange} required>
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.No} value={service.Service}>{service.Service}</option>
                  ))}
                </select>
              </label>
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
              <label>
                Appointment Time:
                <input type="time" name="AppointmentTime" value={formData.AppointmentTime} onChange={handleInputChange} required />
              </label>
              <label>
                Doctor:
                <select name="Doctor" value={formData.Doctor} onChange={handleInputChange} required>
                  <option className='doctor-pick' value="">Select a doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.sno} value={doctor.doctor}>{doctor.doctor}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Description:
              <textarea name="Description" value={formData.Description} onChange={handleInputChange}></textarea>
            </label>
            <div className="popup-form-buttons">
              <button type="submit">{editMode ? 'Update' : 'Add Appointment'}</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Appointments;
