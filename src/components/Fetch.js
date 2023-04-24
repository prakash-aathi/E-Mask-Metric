import  { useEffect, useState } from 'react'
import { ref, onValue,set } from 'firebase/database'
import StartFirebase from '../firebase-config'

const db = StartFirebase();

export const useTemperature = () => {
    const [temp, setTemp] = useState("loading...");
    useEffect(() => {
        onValue(ref(db, 'mask/temp/celsius'), (snapshot) => {
            const data = snapshot.val()
            setTemp(data)
        })
    }, [])
    return temp;
}


export const useOxygen = () => {
    const [oxygenPurityLvl, setOxygenPurityLvl] = useState("loading...");
    useEffect(() => {
        onValue(ref(db, 'mask/co2'), (snapshot) => {
            const data = snapshot.val()
            setOxygenPurityLvl(data)
        })
    }, [])
    return oxygenPurityLvl;
}

export const useHeartRate = () => {
    const [heartRate, setHeartRate] = useState("loading...");
    useEffect(() => {
        onValue(ref(db, 'mask/hr'), (snapshot) => {
            const data = snapshot.val()
            setHeartRate(data)
        })
    }, [])
    return heartRate;
}

export const useBloodOxygen = () => { 
    const [bloodOxygen, setBloodOxygen] = useState("loading...");
    useEffect(() => {
        onValue(ref(db, 'mask/o2'), (snapshot) => {
            const data = snapshot.val()
            setBloodOxygen(data)
        })
    }, [])
    return bloodOxygen;
}

export const GetLedValue = () => { 
    const [ledText, setLedText] = useState("false");
    useEffect(() => {
        onValue(ref(db, 'led/ledValue'), (snapshot) => {
            const data = snapshot.val()
            setLedText(data)
        })
    }, [])
    return ledText;
}


export function setLedValue(ledValue) {
    set(ref(db, 'led' ), {
     ledValue: ledValue
    });
  }
  

// export function DisplayHeartRate() {
//     // let heartRate = useHeartRate();
//     return (
//         <>{}0 bpm</>
//     )
// }

// export function DisplayBloodOxygen() {
//     // let bloodOxygen = useBloodOxygen();
//     return (
//         <>{}0 %</>
//     )
// }