'use client'
import { CgProfile } from "react-icons/cg";
import { IoPersonOutline } from "react-icons/io5";
import { CiLineHeight } from "react-icons/ci";
import { LiaWeightHangingSolid } from "react-icons/lia";
import IconBackground from "../components/icon_bg";
import { ImConnection } from "react-icons/im";
import { LuHeartPulse } from "react-icons/lu";
import { TbDeviceWatchStats } from "react-icons/tb";
import { FaTemperatureHalf } from "react-icons/fa6";
import PlotChart from "../components/plotChart";
import PlotPredict from "../components/plotPrediction";
import DataFetcher from "../components/data_Fetcher";
import Subject_Dropdown from "../components/subject_dropDown";
import Session_Dropdown from "../components/session_dropDown";
import PredictionFetcher from "../components/prediction_Fetcher";
import React,{useState, useEffect} from "react";
import { useSearchParams } from 'next/navigation';

const PageContent = () => {
  const searchParams = useSearchParams();
  const [subject, setSubject] = useState<string>(searchParams.get('subject') || '');
  const [session, setSession] = useState<string>(searchParams.get('session') || '');

  const { predictedValues, predictedIndices } = PredictionFetcher({ session, subject });
  const lastIndex = predictedValues.length > 0 ? predictedValues.length - 1 : null;
  const lastPredictedValue = lastIndex !== null ? predictedValues[lastIndex].toPrecision(3) : null;

  console.log(predictedValues, predictedIndices)

  return (
  <div className="d-flex">
  <div className="w-20">
    <div className="row align-items-center justify-content" style={{paddingTop:'0.5em'}}>
      <div className="col-sm-2" style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
        <IconBackground Icon={CgProfile} colour="orange"/> 
      </div>
      <div className="col-sm-2" style={{ fontSize: '2em', fontWeight: 'bold', textAlign: 'center', paddingLeft: '1.5em' }}>
        <Subject_Dropdown subject={subject} onSubjectChange={setSubject}/>
        <Session_Dropdown session={session} onSessionChange={setSession}/>
      </div>
    </div>

  <div className="row align-items-center justify-content" style={{ paddingTop: '5em' }}>
  <div className="col-sm-2" style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
    <IconBackground Icon={IoPersonOutline} colour="red"/> 
  </div>
  <div className="col-sm-2" style={{ fontSize: '1.8em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '2em', paddingTop: '0.5em' }}>
      <span>
            <DataFetcher dataframe='demograph'session={session}subject={subject}dataKey="Gender"/>
      </span>
    <div style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
      Gender
    </div>
    </div>
  </div>

  <div className="row align-items-center justify-content" style={{ paddingTop: '2em' }}>
  <div className="col-sm-2" style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
    <IconBackground Icon={CiLineHeight} colour="yellow"/> 
    
  </div>
  <div className="col-sm-2" style={{fontSize: '1.8em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '2em', paddingTop: '0.5em' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>
            <DataFetcher dataframe='demograph'session={session}subject={subject}dataKey="Height"/>
      </span>
      <div style={{ fontSize: '0.6em', fontWeight: 'bold', marginLeft: '0.5em' }}>
        cm
      </div>
    </div>
    <div style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
      Height
    </div>
  </div>
</div>

<div className="row align-items-center justify-content" style={{ paddingTop: '2em' }}>
  <div className="col-sm-2" style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
  <IconBackground Icon={LiaWeightHangingSolid} colour="lightblue"/> 
  </div>
  <div className="col-sm-2" style={{fontSize: '1.8em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '2em', paddingTop: '0.5em' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>
            <DataFetcher dataframe='demograph'session={session} subject={subject} dataKey="Body Mass"/> 
        </span>
      <div style={{ fontSize: '0.6em', fontWeight: 'bold', marginLeft: '0.5em' }}>
        kg
      </div>
    </div>
    <div style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
      Weight
    </div>
  </div>
</div>

    <div className="row align-items-center justify-content" style={{ paddingTop: '12em' }}>
      <div className="col-sm-2" style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
        <IconBackground Icon={ImConnection} colour="lightgreen"/>
      </div>
      <div className="col-sm-2" style={{ fontSize: '1.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '2em', paddingTop: '1em' }}>
        Connected
      </div>
    </div>
  </div>


  <div style={{ width: '80%' }}>

  <div className="row align-items-center justify-content" style={{paddingTop:'1em' }}>
  <div className="col-sm-4 ">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
        <IconBackground Icon={LuHeartPulse} colour="mediumpurple"/>
      </div>
      <div style={{ fontSize: '1.8em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '2em'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>

          <span>
            <DataFetcher dataframe='coolbit'session={session} subject={subject} dataKey="CB_HR"/> 
          </span>

          <div style={{ fontSize: '0.6em', fontWeight: 'bold', marginLeft: '0.5em' }}>
            bpm
          </div>
        </div>
        <div style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
          Heart Rate
        </div>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
        <IconBackground Icon={TbDeviceWatchStats} colour="mediumturquoise"/>
      </div>
      <div style={{ fontSize: '1.8em', fontWeight: 'bold', textAlign: 'left',  paddingLeft: '2em'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            <DataFetcher dataframe='coolbit'session={session} subject={subject} dataKey="CB_Tsk_skin"/> 
          </span>
          <div style={{ fontSize: '0.6em', fontWeight: 'bold', marginLeft: '0.5em' }}>
            °C
          </div>
        </div>
        <div style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
          Skin Temperature
        </div>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ fontSize: '2.5em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '0.5em' }}>
        <IconBackground Icon={FaTemperatureHalf} colour="pink"/>
      </div>
      <div style={{ fontSize: '1.8em', fontWeight: 'bold', textAlign: 'left', paddingLeft: '2em'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>
            {lastPredictedValue}
          </span>
          <div style={{ fontSize: '0.6em', fontWeight: 'bold', marginLeft: '0.5em' }}>
            °C
          </div>
        </div>
        <div style={{ fontSize: '0.6em', fontWeight: 'bold' }}>
          Core Temperature
        </div>
      </div>
    </div>
  </div>
</div>

<div className="container">
  <div className="row">
    <div className="chart-container" style={{ height: '40vh', width: '100wh'}}>
      <PlotPredict session={session}subject={subject} label="Predicted Core Temperature (°C)" id="temperature_time" colour="pink"/>
    </div>
  </div>

  <div className="row">
  <div className="chart-container" style={{ height: '40vh', width: '100wh'}}>
      <PlotChart session={session}subject={subject} data="CB_HR" label="Heart Rate (bpm)" id="hr_time" colour="mediumpurple"/>
    </div>
  </div>
</div>
</div>
</div>

  );
}

export default PageContent;