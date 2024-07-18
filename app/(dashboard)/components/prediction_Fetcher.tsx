'use client';
import React, { useEffect, useState, useRef } from 'react';

const PredictionFetcher = ({session,subject}) => {
  const [predictedIndices, setIndices] = useState([]);
  const [predictedValues, setValues] = useState([]);
  const [error, setError] = useState(null);
  const [fetched, setFetch] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
      try {
        const predictionResponse = await fetch(`http://localhost:8000/predict/${session}/${subject}`); 
        if (!predictionResponse.ok) {
          console.log('Failed to fetch prediction data:', predictionResponse.statusText);
          throw new Error(`Failed to fetch prediction data: ${predictionResponse.statusText}`);
        }
        const predictionData = await predictionResponse.json();
        setIndices(predictionData.map(prediction => prediction.index));
        setValues(predictionData.map(prediction => prediction.prediction));
        setError(null);
      }
      catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
        setError(error);
        setIndices([]);
        setValues([]);
    }
  };

  fetchData();
}, [subject,session]);

  return {predictedIndices, predictedValues};
}

export default PredictionFetcher;