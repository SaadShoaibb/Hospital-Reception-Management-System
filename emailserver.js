import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import axios from 'axios';
import { jsPDF } from 'jspdf'; // Use destructuring to import jsPDF
import 'jspdf-autotable'; // Ensure jspdf-autotable is loaded

const app = express();

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'binshoaibsaad@gmail.com', // Your email
    pass: 'qpdy csjk eifi xhed', // Your email password or app password
  },
});

app.post('/sendInvoiceEmail', async (req, res) => {
  const { patientId, items, totalAmount, patientName, patientPhone } = req.body;

  try {
    // Fetch patient details
    const patientResponse = await axios.get(`http://localhost:3000/Patients/${patientId}`);
    const patient = patientResponse.data;

    // Generate the PDF
    const doc = new jsPDF(); // Create a new jsPDF instance
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

    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
    doc.text(`Date: ${currentDate}`, 14, doc.autoTable.previous.finalY + 20);

    const pdfData = doc.output('datauristring');

    const mailOptions = {
      from: 'binshoaibsaad@gmail.com', // Your email
      to: patient.Email,
      subject: 'Your Invoice',
      text: `Dear ${patientName},\n\nPlease find your invoice attached.\n\nThank you.`,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfData.split(',')[1],
          encoding: 'base64',
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Error sending email' });
      } else {
        res.status(200).send({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'An error occurred' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
