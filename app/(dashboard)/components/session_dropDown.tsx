'use client'
import React, { useEffect, useState } from 'react';

const Session_Dropdown = ({ session, onSessionChange }) => {
  const [sessions, setSessions] = useState([]);

  const handleSessionLoaded = (uniqueSessions) => {
    setSessions(uniqueSessions);
    if (uniqueSessions.length > 0 && !uniqueSessions.includes(session)) {
      onSessionChange(uniqueSessions[0]);
    }
  };

  const handleSessionChange = (event) => {
    const newSession = event.target.value;
    onSessionChange(newSession);
  };

  useEffect(() => {
    const uniqueSessions = ['MFS', 'BAPT', 'CSR'];
    handleSessionLoaded(uniqueSessions);
  }, []);

  return (
    <div>
      <select value={session} onChange={handleSessionChange}>
        {sessions.map(session => (
          <option key={session} value={session}>
            {session}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Session_Dropdown;

