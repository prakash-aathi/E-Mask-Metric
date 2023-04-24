import React from 'react'
import { useState,useEffect } from 'react'
import { setLedValue } from './Fetch'
import { GetLedValue } from './Fetch'

function Led() {

  const [btnText, setBtnText] = useState("Off")
  const value = GetLedValue()

  useEffect(() => {
    if (value === true) {
      setBtnText("On")
    }
    if (value === false){
      setBtnText("Off")
    }
  }, [value])
  

  // when click the button it change text of button and database too
  const handleLed = () => { 
      if (btnText === "On") { 
          setBtnText("Off")
          setLedValue(false)
      }
      else { 
          setBtnText("On")
          setLedValue(true)
      }
    }

  return (
      <div className=''>
        <h2 className='pt-2 font-semibold lg:font-bold  text-xl '>DisInfect the mask</h2>
        <i className='text-orange-500 lg:text-sm px-2 ' >ℹ️ Caution: UV light harmfull to humans be carefull</i>
        <p className='pt-2 text-xl'>Turn on/off UV light</p>
        <button onClick={handleLed} className="mt-2 text-2xl  bg-gray-200 px-8 pt-1 rounded border-2 border-black hover:bg-white">{ btnText }</button>
      </div>
  )
}

export default Led