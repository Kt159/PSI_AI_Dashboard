'use client'
import { Card } from "react-bootstrap";
import { LuHeartPulse } from "react-icons/lu";
import { FaTemperatureHalf } from "react-icons/fa6";
import 'react-grid-layout/css/styles.css';

export default function subjectCard(variant, header, heartrate, temp) {
    return (
      <div className="col">
        <Card style={{ width: '11rem'}} bg={variant} text="black">
          <Card.Header style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
            {header}
          </Card.Header>
          <Card.Body style ={{height:'6rem'}}>
            <div style={{ display: 'flex',  justifyContent: 'center',alignItems: 'center', marginTop:'-1.2rem' }}>
              <div style={{ marginLeft: '0.5rem',marginTop: '-0.5rem', fontSize: '2em' }}>
                <LuHeartPulse/>
              </div>
              <div style={{ fontSize: '2em',fontWeight: 'bold', marginLeft: '5%' }}>{heartrate}</div>
              <div style={{ fontSize: '1.25em', marginLeft: '5%'}}>bpm</div>
            </div>
  
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight:'1em'}}>
              <div style={{ marginTop: '-0.5rem', fontSize: '2em' }}>
                <FaTemperatureHalf/>
              </div>
              <div style={{ fontSize: '2em',fontWeight: 'bold', marginLeft: '5%' }}>{temp}</div>
              <div style={{ fontSize: '1.25em', marginLeft: '5%',}}>°C</div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
}


