import React from "react";
import * as FaIcons from "react-icons/fa";

export const SideBarData = [
  {
    title: "Dashboard",
    path: "/Sidebar/Dashboard",
    icon: <FaIcons.FaHome />
  },
  {
    title: "Services",
    path: "/Sidebar/Services",
    icon: <FaIcons.FaCommentMedical />
  },
  {
    title: "Doctors",
    path: "/Sidebar/ShowDoctors",
    icon: <FaIcons.FaUserMd />,
  },
  {
    title: "Appointments",
    path: "/Sidebar/Appointment",
    icon: <FaIcons.FaCalendarCheck />,
  },
  {
    title: "Invoices",
    path: "/Sidebar/ShowInvoices",
    icon: <FaIcons.FaFileInvoice />
  },
  {
    title: "Patients",
    path: "/Sidebar/ShowPatient",
    icon: <FaIcons.FaBed />,
  },
  {
    title: "AboutUs",
    path: "/Sidebar/AboutUs",
    icon: <FaIcons.FaAddressCard />
  }
];
