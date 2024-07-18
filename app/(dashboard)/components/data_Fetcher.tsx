'use client';
import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';

const DataFetcher = ({ dataframe, session, subject, dataKey }) => {
  const [specificValue, setSpecificValue] = useState();

  useEffect(() => {
    const fetchData = async () => {

      try {
        let csvData = '';
        if (dataframe === 'coolbit') {
          const csvResponse = await fetch('./processed_coolbit.csv');
          if (!csvResponse.ok) {
            throw new Error('Failed to fetch CSV data');
          }
          csvData = await csvResponse.text();
        } else if (dataframe === 'demograph') {
          const csvResponse = await fetch('./Trial_demographic.csv');
          if (!csvResponse.ok) {
            throw new Error('Failed to fetch CSV data');
          }
          csvData = await csvResponse.text();
        } else {
          throw new Error('Invalid dataframe specified');
        }

        const parsedData = Papa.parse(csvData, { header: true }).data;
        let specificData;

        if (dataframe === 'coolbit') {
          const filteredData = parsedData.filter(row => row['Subject No.'] === subject && row['Phase'] === 'Activity' && row['Session'] === session);
          const lastItem = filteredData[filteredData.length - 1];
          if (lastItem) {
            specificData = lastItem;
          }
        } else if (dataframe === 'demograph') {
          const filteredData = parsedData.filter(row => row['Subject No.'] === subject);
          specificData = filteredData[0];
        }

        if (specificData) {
          setSpecificValue(specificData[dataKey]);
        }
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
      }
    };

    fetchData();
  }, [dataframe, session, subject, dataKey]);

  return <DisplayValue specificValue={specificValue} />;
};

const DisplayValue = ({ specificValue }) => {
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'Loading...';
    
    else if (value === 'M'|| value === 'F') return value;

    return Number(value).toPrecision(3);
  };

  return <span>{formatValue(specificValue)}</span>;
};

export default DataFetcher;
