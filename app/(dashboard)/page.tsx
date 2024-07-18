'use client';
import React, { useState, useEffect, useRef } from 'react';
import templateCard from './components/template_Card';
import CounterCard from './components/CounterCard';
import Stopwatch from './components/stopwatch';
import weatherCard from './components/weather_Card';
import SubjectCard from './components/subject_Card';
import UniqueID from './components/uniqueID';
import { TimerProvider, useTimer } from './components/Timer_Context';
import { Card } from "react-bootstrap";
import Session_Dropdown from "./components/session_dropDown";
import Papa from 'papaparse';

function PageContent() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [session, setSession] = useState<string>('');
  const [counts, setCounts] = useState({ success: 0, warning: 0, danger: 0, secondary: 0 });
  const [subjectData, setSubjectData] = useState({});
  const isFirstRender = useRef(true);
  const { time } = useTimer();

  const handleSubjectsLoaded = (uniqueSubjects: string[]) => {
    setSubjects(uniqueSubjects);
  };

  const totalCount = counts.success + counts.warning + counts.danger + counts.secondary;
  const timeInMinutes = Math.floor((time % 360000) / 6000)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setCounts({ success: 0, warning: 0, danger: 0, secondary: 0 });
    }
  }, [session]);

  const determineCategory = (temperature: number) => {
    if (isNaN(temperature)) return 'secondary';
    if (temperature >= 40) return 'danger';
    if (temperature >= 37.5) return 'warning';
    return 'success';
  };

  const parseNumber = (value: any): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const findNearestTimeMinEntry = (entries, currentTime) => {
    return entries.reduce((prev, curr) => {
      return Math.abs(curr.timeMin - currentTime) < Math.abs(prev.timeMin - currentTime) ? curr : prev;
    });
  };

  const updateCounts = (dataDict, currentTime) => {
    const newCounts = { success: 0, warning: 0, danger: 0, secondary: 0 };
    Object.keys(dataDict).forEach(subject => {
      const nearestEntry = findNearestTimeMinEntry(dataDict[subject], currentTime);
      const cat = determineCategory(nearestEntry.coreTemp);
      newCounts[cat] ++;
    });

    setCounts(newCounts);
  };

  const PredictionOverview = async (session) => {
    try {
      if (!session) {
        console.error('Session parameter is not defined');
        return {};
      }
      const predictionResponse = await fetch(`http://localhost:8000/overview/${session}`); 
      if (!predictionResponse.ok) {
        console.log('Failed to fetch prediction data:', predictionResponse.status, predictionResponse.statusText);
        throw new Error(`HTTP error! Status: ${predictionResponse.status}`);
      }
      const predictionData = await predictionResponse.json();
      return predictionData;
    } catch (error) {
      console.error('Error fetching or parsing CSV data:', error);
      return {};
    }
  };


  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const csvResponse = await fetch('./processed_coolbit.csv');
        if (!csvResponse.ok) throw new Error('Failed to fetch CSV data');
        const csvData = await csvResponse.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;

        const overview = await PredictionOverview(session);
        const dataDict = {};

        parsedData.forEach(row => {
          const { 'Subject No.': subject, 'Phase': phase, 'Session': csvSession, 'Time (min)': timeMin, 'CB_HR': heartRate } = row;
          if (phase === 'Activity' && csvSession === session) {
            const heartRateValue = parseNumber(heartRate);

            if (!dataDict[subject]) dataDict[subject] = [];
            dataDict[subject].push({ timeMin: parseNumber(timeMin), heartRate: heartRateValue});
          }
        });

        const newDataDict = {};
        Object.keys(dataDict).forEach(subjectNo => {
          if (overview[subjectNo]) {
            const coreTemperatures = overview[subjectNo]; // Array of core temperature values
            const subjectData = dataDict[subjectNo];
        
            if (coreTemperatures.length === subjectData.length) {
              newDataDict[subjectNo] = subjectData.map((item, index) => ({
                ...item,
                coreTemp: coreTemperatures[index]
              }));
            } else {
              console.error(`Length mismatch for subject ${subjectNo}`);
              newDataDict[subjectNo] = subjectData; // Fallback to original data
            }
          } else {
            newDataDict[subjectNo] = dataDict[subjectNo];
          }
        });
        setSubjectData(newDataDict);
        updateCounts(newDataDict, timeInMinutes);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCSVData();
  }, [session]);

  useEffect(() => {
    const updateSubjectData = async () => {
      try {
        const csvResponse = await fetch('./processed_coolbit.csv');
        if (!csvResponse.ok) throw new Error('Failed to fetch CSV data');
        const csvData = await csvResponse.text();
        const parsedData = Papa.parse(csvData, { header: true }).data;

        const overview = await PredictionOverview(session);
        const dataDict = {};

        parsedData.forEach(row => {
          const { 'Subject No.': subject, 'Phase': phase, 'Session': csvSession, 'Time (min)': timeMin, 'CB_HR': heartRate } = row;
          if (phase === 'Activity' && csvSession === session) {
            const heartRateValue = parseNumber(heartRate);

            if (!dataDict[subject]) dataDict[subject] = [];
            dataDict[subject].push({ timeMin: parseNumber(timeMin), heartRate: heartRateValue});
          }
        });

        const newDataDict = {};
        Object.keys(dataDict).forEach(subjectNo => {
          if (overview[subjectNo]) {
            const coreTemperatures = overview[subjectNo]; // Array of core temperature values
            const subjectData = dataDict[subjectNo];
        
            if (coreTemperatures.length === subjectData.length) {
              newDataDict[subjectNo] = subjectData.map((item, index) => ({
                ...item,
                coreTemp: coreTemperatures[index]
              }));
            } 
            else {
              console.error(`Subject with incomplete dataset ${subjectNo}`);
              newDataDict[subjectNo] = subjectData; // Fallback to original data
            }
          } else {
            newDataDict[subjectNo] = dataDict[subjectNo];
          }
        });

        setSubjectData(newDataDict);
        updateCounts(newDataDict, timeInMinutes);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(updateSubjectData, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [session, timeInMinutes, subjectData]);

  const sortedSubjects = Object.keys(subjectData).sort((a, b) => {
    const latestEntryA = findNearestTimeMinEntry(subjectData[a],timeInMinutes);
    const latestEntryB = findNearestTimeMinEntry(subjectData[b],timeInMinutes);
    return latestEntryB.coreTemp - latestEntryA.coreTemp;
  });

  useEffect(() => {
    // Update counts whenever subjectData or timeInMinutes changes
    updateCounts(subjectData, timeInMinutes);
  }, [session, subjectData, timeInMinutes]);
  
  return (
    <div>
      <div className="row mt-3">
        <div className="col-sm-12 col-md-4">
          {templateCard(<Session_Dropdown session={session} onSessionChange={setSession}/>, "23em", "2em", "light")}
        </div>
        <div className="col-sm-6 col-md-2">
          <CounterCard counts={counts.danger} totalCount={totalCount} width="10em" fontSize="2em" variant="danger"/>
        </div>
        <div className="col-sm-6 col-md-2">
          <CounterCard counts={counts.warning} totalCount={totalCount} width="10em" fontSize="2em" variant="warning"/>
        </div>
        <div className="col-sm-6 col-md-2">
          <CounterCard counts={counts.success} totalCount={totalCount} width="10em" fontSize="2em" variant="success"/>
        </div>
        <div className="col-sm-6 col-md-2">
          <CounterCard counts={counts.secondary} totalCount={totalCount} width="10em" fontSize="2em" variant="secondary"/>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-4">
          <div style={{ paddingTop: '1em' }}>
            <Card style={{ width: '23em' }} bg='light' text="black">
              <Card.Header style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
                Time Elapsed
              </Card.Header>
              <Card.Body style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
                <Stopwatch />
              </Card.Body>
            </Card>
          </div>

          <div style={{ paddingTop: '1em' }}>
            {weatherCard()}
          </div>
        </div>
        <div className="col-12 col-md-8 col-sm-6">
          <div className="row row-cols-2 row-cols-md-4 g-2" style={{ paddingTop: '2em' }}>
            <UniqueID onSubjectsLoaded={handleSubjectsLoaded} />
            {sortedSubjects.map(subject => {
              const subjectEntries = subjectData[subject];
              let latestEntry: { category?: string, heartRate?: number, coreTemp?: number } = {};

              if (subjectEntries && subjectEntries.length > 0) {
                if (timeInMinutes < subjectEntries.length) {
                  latestEntry = subjectEntries[timeInMinutes];
                } else {
                  latestEntry = subjectEntries[subjectEntries.length - 1];
                }
              }
              return (
                <SubjectCard
                  key={subject}
                  subject = {subject}
                  variant={determineCategory(latestEntry.coreTemp)}
                  session={session}
                  heartrate={latestEntry.heartRate ? (latestEntry.heartRate.toFixed ? latestEntry.heartRate.toFixed(0) : latestEntry.heartRate) : ''}
                  temp={latestEntry.coreTemp ? (latestEntry.coreTemp.toFixed ? latestEntry.coreTemp.toFixed(1) : latestEntry.coreTemp) : ''}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <TimerProvider>
      <PageContent />
    </TimerProvider>
  );
}