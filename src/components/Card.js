import React from 'react'

function Card({ logo, field, value,unit, content }) {

  return (
      <>
        <div className=''>
            <img className='w-12 h-14 mx-auto ' src={ logo } alt="" srcset="" />
        </div>
          <div className='lg:text-2xl text-xl font-semibold' >{ field}</div>
      <div className={`${content==='good'? "text-green-500": content==="neutral" ? "text-orange-500" : "text-red-500"}`}>
        <div className={`lg:text-3xl text-lg font-bold `}>{value} {unit }</div>
        <div className='lg:text-xl text-lg font-medium'>{ content==='good'? "Good 😊": content==="neutral" ? "Warning😐" : "Danger 😥" }</div>
      </div>
      
      </>
  )
}

export default Card




