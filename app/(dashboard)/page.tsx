'use client';
import React, { useState, useEffect } from 'react';
import templateCard from './components/template_Card';
import timerCard from './components/timer_Card';
import weatherCard from './components/weather_Card';
import Dyanamic_card from './components/dynamic_card';
import UniqueID from './components/uniqueID';
import Papa from 'papaparse';

export default function Page() {
  const [subjects, setSubjects] = useState([]);
  const [counts, setCounts] = useState({ success: 0, warning: 0, danger: 0, secondary: 0 });
  const [initialized, setInitialized] = useState(false);

  const handleSubjectsLoaded = (uniqueSubjects) => {
    setSubjects(uniqueSubjects);
  };

  const updateCounts = (category) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [category]: prevCounts[category] + 1
    }));
  };

  useEffect(() => {
    if (subjects.length > 0 && !initialized) {
      setInitialized(true);
      subjects.forEach(subject => {
        fetchDataForSubject(subject);
      });
    }
  }, [subjects, initialized]);

  const fetchDataForSubject = async (subject) => {
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
        const category = HR === '--'
          ? 'secondary'
          : Number(HR) >= 120
            ? 'danger'
            : Number(HR) >= 100
              ? 'warning'
              : 'success';
        updateCounts(category);
      } else {
        updateCounts('secondary');
      }
    } catch (error) {
      console.error('Error fetching or parsing CSV data:', error);
    }
  };

  const totalCount = counts.success + counts.warning + counts.danger + counts.secondary;

  return (
    <div>
      <div className="row mt-3">
        <div className="col-sm-12 col-md-4">
          {templateCard("Physical Training 1", "23em", "2em", "light")}
        </div>
        <div className="col-sm-6 col-md-2">
          {templateCard(`${counts.danger}/${totalCount}`, "10em", "2em", "danger")}
        </div>
        <div className="col-sm-6 col-md-2">
          {templateCard(`${counts.warning}/${totalCount}`, "10em", "2em", "warning")}
        </div>
        <div className="col-sm-6 col-md-2">
          {templateCard(`${counts.secondary}/${totalCount}`, "10em", "2em", "secondary")}
        </div>
        <div className="col-sm-6 col-md-2">
          {templateCard(`${counts.success}/${totalCount}`, "10em", "2em", "success")}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-4">
          <div style={{ paddingTop: '1em' }}>
            {timerCard()}
          </div>
          <div style={{ paddingTop: '1em' }}>
            {weatherCard()}
          </div>
        </div>
        <div className="col-12 col-md-8 col-sm-6">
          <div className="row row-cols-2 row-cols-md-4 g-2" style={{ paddingTop: '2em' }}>
            <UniqueID onSubjectsLoaded={handleSubjectsLoaded} />
            {subjects.map(subject => (
              <Dyanamic_card key={subject} subject={subject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
