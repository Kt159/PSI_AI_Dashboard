'use client'
import React, { useState, useEffect } from 'react';

const App = () => {
  const [subject, setSubject] = useState('PSI001');
  const [jsonData, setJsonData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/predict/RUN/${subject}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJsonData(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error('Error fetching JSON data:', error);
        setJsonData('Error fetching data');
      }
    };

    fetchData();
  }, [subject]);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  return (
    <div>
      <h1>JSON Response</h1>
      <select value={subject} onChange={handleSubjectChange}>
        <option value="PSI001">PSI001</option>
        <option value="PSI002">PSI002</option>
        <option value="PSI003">PSI003</option>
        <option value="PSI004">PSI004</option>
        <option value="PSI005">PSI005</option>
        <option value="PSI006">PSI036</option>
      </select>
      <pre>{jsonData}</pre>
    </div>
  );
};

export default App;
