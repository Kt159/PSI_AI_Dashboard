import { Card } from "react-bootstrap";
import { TiWeatherShower } from "react-icons/ti";
import { IoWaterOutline } from "react-icons/io5";
import { CiTempHigh } from "react-icons/ci";
import IconBackground from "./icon_bg";
import React from "react";


export default function WeatherCard() {
  return (
    <Card style={{ width: '23em' }} bg='light' text="black">
      <Card.Header style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>
        Weather Forecast
      </Card.Header>
      <Card.Body style={{display: 'flex',  flexDirection: 'column', alignItems: 'left',position:'relative'}}>
        <div className="row align-items-center justify-content" style={{marginLeft: '1em',fontSize: '2em'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconBackground Icon={TiWeatherShower} colour="grey" />
            <span style={{ marginLeft: '0.5em', fontSize: '1em' }}>70% Rain</span>
          </div>
        </div>

        <div className="row align-items-center justify-content" style={{marginLeft: '1em',fontSize: '2em',marginTop: '1em'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconBackground Icon={IoWaterOutline} colour="lightblue" />
            <span style={{ marginLeft: '0.5em', fontSize: '1em'}}>90% Humidity</span>
          </div>
        </div>

        <div className="row align-items-center justify-content" style={{marginLeft: '1em',fontSize: '2em',marginTop: '1em'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconBackground Icon={CiTempHigh} colour="pink" />
            <span style={{ marginLeft: '0.5em' , fontSize: '1em' }}>38 °C</span>
          </div>
        </div>

      </Card.Body>
    </Card>
  );
}
