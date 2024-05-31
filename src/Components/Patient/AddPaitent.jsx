import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./AddPatient.css";
import "./global1.css";
import user from "../images/user1.png";
import checkmark from "../images/check-mark.png";
import leftarrow from '../images/left-arrow.png';
import menubar from '../images/menu-bar.png';

const AddPatient = ({ onAddPatient }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    purposeOfVisit: '',
    contact: '',
    date: '',
    time: '',
    email: '',
    doctor: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleAddPatient = () => {
    // Validate patient data if needed
    onAddPatient(patientData);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Perform logout actions here
  };

  const menuRef = useRef();
  const imgRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setShowDropdown(false);
    }
  });

  return (
    <div className="add-appointments">
      <div className="add-appointments-child" />
      <div className="add-appointments-item" />
      <div className="add-appointments-inner" />
      <main className="frame-parent">
        <section className="frame-group">
   
          <div className="frame-wrapper">
            <div className="frame-container">
              <div className="frame-div">
                <Link to='/Sidebar/ShowPatient'>
                  <button className="rectangle-parent">
                    <div className="frame-item" />
                    <img className="left-arrow-1-icon" loading="lazy" alt="" src={leftarrow} />
                  </button>
                </Link>
                <div className="add-appointment-wrapper">
                  <h2 className="add-appointment">Add Patient</h2>
                </div>
              </div>
              <div className="frame-wrapper1">
                <div className="rectangle-group">
                  <div className="frame-inner" />
                  <div className="patient-name-parent">
                    <div className="patient-name">Patient Name</div>
                    <input
                      className="rectangle-input"
                      type="text"
                      name="name"
                      value={patientData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="frame-parent1">
                    <div className="frame-parent2">
                      <div className="frame-parent3">
                        <div className="frame-parent4">
                          <div className="purpose-of-visit-parent">
                            <div className="purpose-of-visit">Purpose of Visit</div>
                            <div className="rectangle-wrapper">
                              <input
                                className="frame-child1"
                                type="text"
                                name="purposeOfVisit"
                                value={patientData.purposeOfVisit}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="phone-no-parent">
                            <div className="phone-no">Contact</div>
                            <input
                              className="rectangle-div"
                              type="text"
                              name="contact"
                              value={patientData.contact}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="appointment-detail">
                          <div className="date-parent">
                            <div className="date">Date</div>
                            <input
                              className="time-slot"
                              type="date"
                              name="date"
                              value={patientData.date}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="doctor-info">
                            <div className="appointment-time">Appointment Time</div>
                            <input
                              className="time-slot"
                              type="time"
                              name="time"
                              value={patientData.time}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="frame-wrapper2">
                        <div className="add-button-parent">
                          <div className="add-button">
                            <div className="email-input">
                              <div className="email">Email</div>
                            </div>
                            <input
                              className="add-button-child"
                              type="email"
                              name="email"
                              value={patientData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="doctor-name">
                            <div className="doctor">Doctor</div>
                            <input
                              className="doctor-box"
                              type="text"
                              name="doctor"
                              value={patientData.doctor}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <textarea
                      className="frame-textarea"
                      placeholder="Description"
                      rows={6}
                      cols={16}
                      name="description"
                      value={patientData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <footer className="frame-footer2">
                    <button className="rectangle-container-patient" onClick={handleAddPatient}>
                      <div className="frame-child2" />
                      <div className="add-appointment1">Add Patient</div>
                      <div className="check-mark-2-wrapper">
                        <img className="check-mark-2-icon" alt="" src={checkmark} />
                      </div>
                    </button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddPatient;
