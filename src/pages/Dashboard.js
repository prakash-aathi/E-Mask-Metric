import React from 'react'
import temp from '../assets/images/temp.png';
import heart from '../assets/images/heart.png';
import blood from '../assets/images/blood.png';
import meter from '../assets/images/meter.png';
import Card from '../components/Card';
import StopWatch from '../components/StopWatch';
import {   useTemperature, useOxygen, useHeartRate, useBloodOxygen } from '../components/Fetch';
import { isAuth } from '../firebase-config/Auth';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Led from '../components/Led';


function Dashboard() {

  const tempValue = useTemperature();
  const oxygenPurityLvl = useOxygen();
  const heartRate = useHeartRate()
  const bloodOxygen = useBloodOxygen();

  
  if (!isAuth()) { 
    return <Navigate to='/login' />
  }

  return (
    <>
      <Navbar ></Navbar>
      <div className="flex lg:h-screen  justify-center ">
        <div className="text-center my-4 pb-2 lg:flex justify-evenly w-11/12 ">
                <div className='grid grid-cols-3 bg-slate-200 shadow-md shadow-gray-400   gap-y-5 gap-x-1 mt-4 rounded-lg py-4 items-center pl-2 '>
                  <Card logo={temp} field='Temperature' value={tempValue} unit="°C" content={
                      (tempValue >= 32 && tempValue <= 38) ? "good" :
                      ((tempValue >= 28 && tempValue < 32)|| (tempValue > 37 && tempValue <= 40) )? "neutral":"bad"}></Card> 
                  <Card logo={heart} field='Heart Rate' value={heartRate} unit="pbm" content={
                      (heartRate > 60 && heartRate < 100) ? "good" :
                      ((heartRate >= 55 && heartRate <= 60)||(heartRate >= 100 && heartRate <= 120)) ? "neutral" : "bad"}  ></Card>
                  <Card logo={blood} field='Blood Oxygen' value={bloodOxygen} unit="%" content={(bloodOxygen > 94 && bloodOxygen<=100)?"good":(bloodOxygen >= 89 && bloodOxygen<=94)?"neutral":"bad"} ></Card>
                  <Card logo={meter} field='Oxygen Purity Level' value={oxygenPurityLvl} unit="PPM" content={ (oxygenPurityLvl > 300 && oxygenPurityLvl < 1000)?"good":(oxygenPurityLvl > 1000 && oxygenPurityLvl < 2000 )?"neutral":"bad"} ></Card>
                </div>
          
          <div className='flex-col  lg:w-3/12 lg:h-1/2    my-4 py-2 space-y-4 px-2 justify-center'>
            
                      <div className=' w-full lg:text-xl lg:py-4  bg-slate-200 rounded-lg shadow shadow-gray-500'>
                        <h2 className='py-2 font-semibold lg:font-bold  text-xl  '>Mask Usage Time</h2>
                        <p className='pt-2 text-xl'>HH : MM : SS</p>
                        <StopWatch></StopWatch>
                      </div>
                      <div className=' w-full lg:text-xl py-4 bg-slate-200 rounded-lg shadow shadow-gray-500'>
                         <Led  ></Led>
                      </div>
                      
                </div>  
         </div>
      </div>
    </>
  )
}

export default Dashboard