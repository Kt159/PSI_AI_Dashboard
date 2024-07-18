'use client'
import React, { useState, useEffect } from 'react';

const App = () => {
  const [subject, setSubject] = useState('F001');
  const [jsonData, setJsonData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/predict/MFS/${subject}`);
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
        <option value="F001">F001</option>
        <option value="F002">F002</option>
        <option value="F003">F003</option>
        <option value="F004">F004</option>
        <option value="F005">F005</option>
        <option value="F006">F036</option>
      </select>
      <pre>{jsonData}</pre>
    </div>
  );
};

export default App;
