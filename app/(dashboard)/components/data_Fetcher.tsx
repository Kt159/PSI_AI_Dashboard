'use client';
import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';

const dataCache = {};

const DataFetcher = ({ dataframe, subject, dataKey }) => {
  const [specificValue, setSpecificValue] = useState();
  const cachedDataRef = useRef(dataCache);

  useEffect(() => {
    const fetchData = async () => {
      if (cachedDataRef.current[`${dataframe}_${subject}`]) {
        const cachedData = cachedDataRef.current[`${dataframe}_${subject}`];
        setSpecificValue(cachedData[dataKey]);
        return;
      }

      try {
        let csvData = '';
        if (dataframe === 'coolbit') {
          const csvResponse = await fetch('./New_Coolbit.csv');
          if (!csvResponse.ok) {
            throw new Error('Failed to fetch CSV data');
          }
          csvData = await csvResponse.text();
        } else if (dataframe === 'demograph') {
          const csvResponse = await fetch('./Lab_demographic.csv');
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
          const filteredData = parsedData.filter(row => row['Subject No.'] === subject && row['Session'] === 'RUN');
          const lastItem = filteredData[filteredData.length - 1];
          if (lastItem) {
            specificData = lastItem;
          }
        } else if (dataframe === 'demograph') {
          const filteredData = parsedData.filter(row => row['Subject No.'] === subject);
          specificData = filteredData[0];
        }

        if (specificData) {
          cachedDataRef.current[`${dataframe}_${subject}`] = specificData;
          setSpecificValue(specificData[dataKey]);
        }
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
      }
    };

    fetchData();
  }, [dataframe, subject, dataKey]);

  return <DisplayValue specificValue={specificValue} />;
};

const DisplayValue = ({ specificValue }) => {
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'Loading...';
    return Number(value).toPrecision(3);
  };

  return <span>{formatValue(specificValue)}</span>;
};

export default DataFetcher;
