'use client';
import React, { useEffect, useState } from 'react';
import subjectCard from './subject_Card';
import Papa from 'papaparse';

const Dyanamic_card = ({ subject }) => {
  const [HR, setHR] = useState('--');
  const [Temp, setTemp] = useState('--');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvResponse = await fetch('./New_Coolbit.csv');
        if (!csvResponse.ok) {
          throw new Error('Failed to fetch CSV data');
        }
        const csvData = await csvResponse.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;
        const filteredData = parsedData.filter(row => row['Subject No.'] === subject && row['Session'] === 'RUN');
        const lastItem = filteredData[filteredData.length - 1];

        if (lastItem) {
          const HR = lastItem['CB_HR'] && !isNaN(lastItem['CB_HR']) ? Number(lastItem['CB_HR']).toPrecision(3) : '--';
          const Temp = lastItem['CB_Tsk_skin'] && !isNaN(lastItem['CB_Tsk_skin']) ? Number(lastItem['CB_Tsk_skin']).toPrecision(3) : '--';
          setHR(HR);
          setTemp(Temp);
        } else {
          setHR('--');
          setTemp('--');
        }
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
      }
    };

    fetchData();
  }, [subject]);

  const cardColor = HR === '--'
    ? 'secondary'
    : Number(HR) >= 120
      ? 'danger'
      : Number(HR) >= 100
        ? 'warning'
        : 'success';

  return subjectCard(cardColor, subject, HR, Temp);
};

export default Dyanamic_card;
