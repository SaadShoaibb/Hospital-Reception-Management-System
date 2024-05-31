import React, { useState, useEffect } from 'react';
import './ShowDoctors.css';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css"; 
import exported from "../images/export.png";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

function ShowDoctors() {
    const [searchValue, setSearchValue] = useState('');
    const [rowData, setRowData] = useState([]);
    const [filteredRowData, setFilteredRowData] = useState([]);

    useEffect(() => {
        // Fetch data from the JSON server
        axios.get('http://localhost:3000/Doctor')
            .then(response => {
                setRowData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchValue(value);
        const filteredData = rowData.filter(item =>
            item.doctor.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredRowData(filteredData);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Sno", "Doctor", "Slots", "Phone", "Specialization", "Email"];
        const tableRows = [];

        const data = filteredRowData.length > 0 ? filteredRowData : rowData;
        data.forEach(row => {
            const rowData = [
                row.sno,
                row.doctor,
                row.Slots,
                row.phone,
                row.Specialization,
                row.Email
            ];
            tableRows.push(rowData);
        });

        // Heading of PDF
        doc.setFontSize(20);
        doc.setFont('Fira Code', 'bold');
        doc.text("Billing Management System", doc.internal.pageSize.getWidth() / 2, 20, null, null, 'center');

        //Sub Heading of PDF
        doc.setFontSize(15);
        doc.setFont('Fira Code', 'bold');
        doc.setFillColor(211, 211, 211); 
        const subheadingWidth = doc.internal.pageSize.getWidth() - 28;
        const subheadingX = (doc.internal.pageSize.getWidth() - subheadingWidth) / 2;
        doc.rect(subheadingX, 25, subheadingWidth, 10, 'F');
        doc.text("Doctors", doc.internal.pageSize.getWidth() / 2, 32, null, null, 'center');

        
        const tableHeaderStyles = {
            fillColor: [0, 0, 255], 
            textColor: [255, 255, 255], 
            fontStyle: 'bold',
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            headStyles: tableHeaderStyles, 
        });

        
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        
        const finalY = doc.previousAutoTable.finalY || 0;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${formattedDate} at ${formattedTime}`, 14, finalY + 10);

        doc.save("doctors_list.pdf");
    };

    const handleEdit = (sno) => {
        // Handle edit operation
        console.log('Edit doctor with sno:', sno);
    };

    const handleDelete = (sno) => {
        // Handle delete operation
        axios.delete(`http://localhost:3000/Doctor/${sno}`)
            .then(response => {
                // Update the rowData state to remove the deleted item
                setRowData(rowData.filter(item => item.sno !== sno));
                setFilteredRowData(filteredRowData.filter(item => item.sno !== sno));
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    };

    const columnDefs = [
        { headerName: 'Sno', field: 'sno' },
        { headerName: 'Doctor', field: 'doctor' },
        { headerName: 'Slots', field: 'Slots' },
        { headerName: 'Phone', field: 'phone' },
        { headerName: 'Specialization', field: 'Specialization' },
        { headerName: 'Email', field: 'Email' },

    ];

    return (
        <div className="box">
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Search Doctors..."
                    className="search-field"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <button className="export-button" onClick={exportPDF}>
                    Export
                    <img className="expimg" src={exported} alt="Export Icon" />
                </button>
            </div>
            <div className="ag-theme-alpine grid-container">
                <AgGridReact
                    rowData={filteredRowData.length > 0 ? filteredRowData : rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                    }}
                />
            </div>
        
        </div>
    );
}

export default ShowDoctors;
