import React, { useState, useEffect } from 'react';
import './ShowServices.css';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css"; 
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import exported from '../images/export.png';

function ShowServices() {
    const [searchValue, setSearchValue] = useState('');
    const [rowData, setRowData] = useState([]);
    const [filteredRowData, setFilteredRowData] = useState([]);

    useEffect(() => {
        // Fetch data from the JSON server
        axios.get('http://localhost:3000/services')
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
            item.Service.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredRowData(filteredData);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["No", "Service", "Created At", "Price", "Status"];
        const tableRows = [];

        const data = filteredRowData.length > 0 ? filteredRowData : rowData;
        data.forEach(row => {
            const rowData = [
                row.No,
                row.Service,
                row.CreatedAt,
                row.Price,
                row.Status
            ];
            tableRows.push(rowData);
        });

        // Add the main heading
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text("Billing Management System", doc.internal.pageSize.getWidth() / 2, 20, null, null, 'center');

        // Add the subheading with highlighted background
        doc.setFontSize(24); // Increased font size for the subheading
        doc.setFont('helvetica', 'bold');
        doc.setFillColor(211, 211, 211); // Light gray background
        const subheadingWidth = doc.internal.pageSize.getWidth() - 28; // Width of the page minus margins
        const subheadingX = (doc.internal.pageSize.getWidth() - subheadingWidth) / 2;
        doc.rect(subheadingX, 25, subheadingWidth, 10, 'F');
        doc.text("Services", doc.internal.pageSize.getWidth() / 2, 32, null, null, 'center');

        // Define the styles for the table header
        const tableHeaderStyles = {
            fillColor: [0, 0, 255], // Blue color for the header
            textColor: [255, 255, 255], // White text color
            fontSize: 18, // Increased font size for the header
            fontStyle: 'bold', // Bold text
        };

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 40,
            theme: 'grid',
            headStyles: tableHeaderStyles, // Apply the styles to the header
        });

        // Get the current date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        // Add the date and time below the table
        const finalY = doc.previousAutoTable.finalY || 0;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${formattedDate} at ${formattedTime}`, 14, finalY + 10);

        doc.save("services_list.pdf");
    };

    const columnDefs = [
        { headerName: 'No', field: 'No' },
        { headerName: 'Service', field: 'Service' },
        { headerName: 'Created At', field: 'CreatedAt' },
        { headerName: 'Price', field: 'Price' },
        { headerName: 'Status', field: 'Status' }
    ];

    return (
        <div className="box">
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Search Services..."
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

export default ShowServices;
