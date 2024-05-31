import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import checkmark from "../images/check-mark.png";
import leftarrow from '../images/left-arrow.png';
import "./AddAppointments.css";
import "./global.css";

const AddAppointments = ({ onAddAppointment }) => {
  const [appointmentData, setAppointmentData] = useState({
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
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleAddAppointment = () => {
    onAddAppointment(appointmentData);
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log('Logging out...');
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
                <Link to='/Sidebar/Appointment'>
                  <button className="rectangle-parent">
                    <div className="frame-item" />
                    <img className="left-arrow-1-icon" loading="lazy" alt="" src={leftarrow} />
                  </button>
                </Link>
                <div className="add-appointment-wrapper">
                  <h2 className="add-appointment">Add Appointment</h2>
                </div>
              </div>
              <div className="frame-wrapper1">
                <div className="rectangle-group">
                  <div className="frame-inner" />
                  <div className="patient-name-parent">
                    <div className="patient-name">Patient Name</div>
                    <input className="rectangle-input" type="text" name="name" value={appointmentData.name} onChange={handleInputChange} />
                  </div>
                  <div className="frame-parent1">
                    <div className="frame-parent2">
                      <div className="frame-parent3">
                        <div className="frame-parent4">
                          <div className="purpose-of-visit-parent">
                            <div className="purpose-of-visit">Purpose of Visit</div>
                            <div className="rectangle-wrapper">
                              <input className="frame-child1" type="text" name="purposeOfVisit" value={appointmentData.purposeOfVisit} onChange={handleInputChange} />
                            </div>
                          </div>
                          <div className="phone-no-parent">
                            <div className="phone-no">Phone No.</div>
                            <input className="rectangle-div" type="text" name="contact" value={appointmentData.contact} onChange={handleInputChange} />
                          </div>
                        </div>
                        <div className="appointment-detail">
                          <div className="date-parent">
                            <div className="date">Date</div>
                            <input className="time-slot" type="date" name="date" value={appointmentData.date} onChange={handleInputChange} />
                          </div>
                          <div className="doctor-info">
                            <div className="appointment-time">Appointment Time</div>
                            <input className="time-slot" type="time" name="time" value={appointmentData.time} onChange={handleInputChange} />
                          </div>
                        </div>
                      </div>
                      <div className="frame-wrapper2">
  <div className="add-button-parent">
    <div className="add-button">
      <div className="email-input">
        <div className="email">Email</div>
      </div>
      <input className="add-button-child" type="email" name="email" value={appointmentData.email} onChange={handleInputChange} />
    </div>
    <div className="doctor-name">
      <div className="doctor">Doctor</div>
      <input className="doctor-box" type="text" name="doctor" value={appointmentData.doctor} onChange={handleInputChange} />
    </div>
  </div>
</div>
                    </div>
                    <textarea className="frame-textarea" placeholder="Description" rows={6} cols={16} name="description" value={appointmentData.description} onChange={handleInputChange} />
                  </div>
                  <footer className="frame-footer">
  <button className="rectangle-container" onClick={handleAddAppointment}>
    <div className="add-appointment1">Add Appointment</div>
    <div className="check-mark-1-wrapper">
      <img className="check-mark-1-icon" alt="" src={checkmark} />
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

export default AddAppointments;
