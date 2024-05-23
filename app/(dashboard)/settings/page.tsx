'use client'
import templateCard from './../components/template_Card';
import { Button, Card } from "react-bootstrap";

export default function Page() {
  return (
    <div className="container">
      <div className="row" style={{paddingTop:'1em'}}>
        <div className="col-sm-12 col-md-4">
          {templateCard("Physical Training 1", "23em", "2em", "light")}
        </div>
        <div className="col-sm-6 col-md-2" style={{ paddingLeft: '1em' }}>
          {templateCard("4/16", "10em", "2em", "danger")}
        </div>
        <div className="col-sm-6 col-md-2" style={{ paddingLeft: '1em' }}>
          {templateCard("4/16", "10em", "2em", "warning")}
        </div>
        <div className="col-sm-6 col-md-2" style={{ paddingLeft: '1em' }}>
          {templateCard("4/16", "10em", "2em", "secondary")}
        </div>
        <div className="col-sm-6 col-md-2" style={{ paddingLeft: '1em' }}>
          {templateCard("4/16", "10em", "2em", "success")}
        </div>
      </div>

      <div className="row" style={{ paddingTop: '5em', width: '100%', height: '80vh', padding: '1em'}}>
        <div className="col-sm-6">
            <div className="container" >
              <div className="row">
                <div className="col">
                  <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em', paddingBottom: '1em', paddingTop: '2em'}}>
                    Select Algorithm
                  </div>
                  <div className="d-grid gap-5 col-8 mx-auto" >
                    <button type="button" className="btn btn-primary btn-lg">Algorithm 1</button>
                    <button type="button" className="btn btn-success btn-lg">Algorithm 2</button>
                    <button type="button" className="btn btn-danger btn-lg">Algorithm 3</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
            <div className="container" >
              <div className="row">
                <div className="col">
                  <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5em', paddingBottom: '1em',paddingTop: '2em' }}>
                    Modify Threshold
                  </div>
                  <div className="row justify-content-center" >
                    <Card style={{ width: '8em' }} bg='danger' text="black">
                      <Card.Header style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2em' }}>
                          <div style={{ fontSize: '1.5em', textAlign: 'center', paddingLeft: '0.5em' }}>
                            37
                          </div>
                          <div style={{ fontSize: '1em', textAlign: 'left', paddingTop: '0.1em', paddingLeft: '0.5em' }}>
                            °C
                          </div>
                        </div>
                      </Card.Header>
                    </Card>                   
                  </div>
                  <div className="row justify-content-center">
                    <label htmlFor="customRange1" className="form-label">Danger Temperature (°C)</label>
                    <input type="range" className="form-range" id="customRange1" min='35' max='45' />
                  </div>
                  <div className="row justify-content-center" style={{ paddingTop: '2em' }}>
                    <Card style={{ width: '8em' }} bg='warning' text="black">
                      <Card.Header style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2em' }}>
                          <div style={{ fontSize: '1.5em', textAlign: 'center', paddingLeft: '0.5em' }}>
                            38
                          </div>
                          <div style={{ fontSize: '1em', textAlign: 'left', paddingTop: '0.1em', paddingLeft: '0.5em' }}>
                            °C
                          </div>
                        </div>
                      </Card.Header>
                    </Card> 
                  </div>
                  <div className="row justify-content-center">
                    <label htmlFor="customRange1" className="form-label">Warning Temperature (°C)</label>
                    <input type="range" className="form-range" id="customRange1" min='35' max='45' />
                  </div>
                </div>
      
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}