'use client'
import React, { useEffect, useState } from 'react';
import UniqueID from './uniqueID';

const Subject_Dropdown = ({ subject, onSubjectChange }) => {
  const [subjects, setSubjects] = useState([]);

  const handleSubjectsLoaded = (uniqueSubjects) => {
    setSubjects(uniqueSubjects);
    if (uniqueSubjects.length > 0 && !uniqueSubjects.includes(subject)) {
      onSubjectChange(uniqueSubjects[0]);
    }
  }

  const handleSubjectChange = (event) => {
    const newSubject = event.target.value;
    onSubjectChange(newSubject);
  };

  return (
    <div>
      <UniqueID onSubjectsLoaded={handleSubjectsLoaded} />
      <select value={subject} onChange={handleSubjectChange}>
        {subjects.map(subject => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>
    </div>
  );
};

export default Subject_Dropdown;
