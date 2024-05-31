import React, { useState } from 'react';

const Predict = () => {
  const [inputData, setInputData] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., call an API to make predictions
    console.log('Form submitted with data:', inputData);
    // Reset input field after submission
    setInputData('');
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  return (
    <div>
      <h2>Patient Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={handleChange}
          placeholder="Enter patient data..."
        />
        <button type="submit">Predict</button>
      </form>
    </div>
  );
};

export default Predict;
