'use client'

import subjectCard from './components/subject_Card';
import templateCard from './components/template_Card';
import timerCard from './components/timer_Card';
import weatherCard from './components/weather_Card';

const subjectData = [
  { id: 'Subject 1', hr: 90, temp: 37 },
  { id: 'Subject 2', hr: 120, temp: 40 },
  { id: 'Subject 3', hr: 100, temp: 38 },
  { id: 'Subject 4', hr: '--', temp: '--' },
  { id: 'Subject 5', hr: 90, temp: 37 },
  { id: 'Subject 6', hr: 120, temp: 40 },
  { id: 'Subject 7', hr: 100, temp: 38 },
  { id: 'Subject 8', hr: '--', temp: '--' },
  { id: 'Subject 9', hr: 90, temp: 37 },
  { id: 'Subject 10', hr: 120, temp: 40 },
  { id: 'Subject 11', hr: 100, temp: 38 },
  { id: 'Subject 12', hr: '--', temp: '--' },
  { id: 'Subject 13', hr: 90, temp: 37 },
  { id: 'Subject 14', hr: 120, temp: 40 },
  { id: 'Subject 15', hr: 100, temp: 38 },
  { id: 'Subject 16', hr: '--', temp: '--' },
];

export default function Page() {
  return (
    <>
      <div>
        <div className="row mt-3">
          <div className="col-sm-12 col-md-4">
            {templateCard("Physical Training 1", "23em", "2em", "light")}
          </div>
          <div className="col-sm-6 col-md-2">
            {templateCard("4/16", "10em", "2em", "danger")}
          </div>
          <div className="col-sm-6 col-md-2">
            {templateCard("4/16", "10em", "2em", "warning")}
          </div>
          <div className="col-sm-6 col-md-2">
            {templateCard("4/16", "10em", "2em", "secondary")}
          </div>
          <div className="col-sm-6 col-md-2">
            {templateCard("4/16", "10em", "2em", "success")}
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
            <div className="row row-cols-2 row-cols-md-4 g-2" style={{ paddingTop: '2em'}}>
              {subjectData.map((subject) => (
                <div key={subject.id} className="col">
                  {subjectCard(subject.hr == '--' ? 'secondary' : Number(subject.hr) >= 120 ? 'danger' : Number(subject.hr) >= 100 ? 'warning' : 'success',
                    subject.id,
                    subject.hr,
                    subject.temp)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
