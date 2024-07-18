'use client'
import React, { useEffect,useState} from 'react';
import Papa from 'papaparse';

const UniqueID = ({ onSubjectsLoaded }) => {
  const [fetched, setFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvResponse = await fetch('./Trial_demographic.csv');
        if (!csvResponse.ok) {
          throw new Error('Failed to fetch CSV data');
        }
        const csvData = await csvResponse.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;

        const uniqueSubjects = [...new Set(parsedData.map(row => row['Subject No.']).filter(subject => subject !== ''))];
        onSubjectsLoaded(uniqueSubjects);
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
      }
    };

    if (!fetched){
      fetchData();
      setFetch(true);
    }
  }, [onSubjectsLoaded]);

  return null;
};

export default UniqueID;
