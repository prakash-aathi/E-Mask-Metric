import React, { useEffect } from 'react';
import { useState } from 'react';
import { ref, getDatabase, child, get } from 'firebase/database';
import {  storeTime } from '../firebase-config/Storage';
import { writeUserData } from '../firebase-config/WriteFirebase';

function Stopwatch() {
  const [timer, setTimer] = useState({ hr: 0, m: 0, s: 0, ms: 0 });
  var uphr = timer.hr,upm = timer.m,ups = timer.s,upms = timer.ms;
  const [inter, setInter] = useState();
  // const [update, setUpdate] = useState(false);

  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);
  const [resume, setResume] = useState(false);
  
  const run = () => {
    if (upms === 50) {
        upms = 0;
        ups++;
      }
    if (ups === 60) {
      ups = 0;
      upm++;
    }
    if (upm === 60) {
      upm = 0;
      uphr++;
    }
    upms++;
    writeUserData({ hr: uphr, m: upm, s: ups })
    setTimer({ hr: uphr, m: upm, s: ups, ms: upms });
    storeTime({ hr: uphr, m: upm, s: ups })
  }

  //  click event for start btn
  const clickStart = () => {
    setStart(false)
    setPause(true)
    run()
    setInter(setInterval(run, 20));
  }

    
    // click event for pause btn
    const clickPause = () => {
        setPause(false)
        setResume(true)
      clearInterval(inter)
    }

    // click event for pause btn
    const clickResume = () => {
        setResume(false)
        setPause(true)
        run()
        setInter(setInterval(run, 20));
  }
  
  const clickReset = () => { 
    setStart(true)
    setPause(false)
    setResume(false)
    clearInterval(inter)
    setTimer({ hr: 0, m: 0, s: 0, ms: 0 })
    
  }


  
useEffect(() => {
    const dbRef = ref(getDatabase());
  
    const fetchTime = () => {
      get(child(dbRef, "mask/time/hr")).then((snapshot) => {
        if (snapshot.exists()) {
          const hr = snapshot.val();
          setTimer((prevState) => ({ ...prevState, hr }));
        }
      });
  
      get(child(dbRef, "mask/time/mm")).then((snapshot) => {
        if (snapshot.exists()) {
          const m = snapshot.val();
          setTimer((prevState) => ({ ...prevState, m }));
        }
      });
  
      get(child(dbRef, "mask/time/ss")).then((snapshot) => {
        if (snapshot.exists()) {
          const s = snapshot.val();
          setTimer((prevState) => ({ ...prevState, s }));
        }
      });

    };
  
  fetchTime()
 
}, []);


  return (
    <div className="">
      <div className=" text-2xl">
        <div>
          <p data-testid="time ">
            <span>{timer.hr >= 10 ? timer.hr : " 0" + timer.hr}</span> :
            <span>{timer.m >= 10 ? " " + timer.m : " 0" + timer.m}</span> :
            <span>{timer.s >= 10 ? " " + timer.s : " 0" + timer.s}</span>
          </p>
          <div>
            {start && <button data-testid="start" onClick={clickStart} id="start" className="my-2  bg-gray-200 px-1 py-1 rounded border-2 border-black hover:bg-white" >Start</button>} 
            {pause && <button data-testid="pause" onClick={clickPause} name="pause" className="my-2 bg-gray-200 px-1 py-1 rounded border-2 border-black hover:bg-white" >Pause</button>}
            {resume && <button data-testid="resume" onClick={clickResume} name="resume" className="my-2  bg-gray-200 px-1 py-1 rounded border-2 border-black hover:bg-white" >Resume</button>}
            {timer.s >= 10 && 
            <button data-testid="reset" onClick={clickReset} name="reset" className="my-2 ml-2  bg-gray-200 px-1 py-1 rounded border-2 border-black hover:bg-white" >Reset</button>
            }
          </div>
        </div>
        {timer.s >= 10 && <div>
          <p className='text-lg text-red-500'>You used mask more than 8 hours. Please disInfect the mask</p>
        </div>}
      </div>
    </div>
  );
}

export default Stopwatch;
