import React from 'react'
// import { useState } from 'react'
// import { getUserDetails } from '../firebase-config/Api'
// import { isAuth } from '../firebase-config/Auth'

function Header() {
  // vital mask  , Health shield
  // const [name, setName] = useState("")
  // useEffect(() => {
  //   if (isAuth()) {
  //     getUserDetails().then((res) => { 
  //       console.log(res);
  //       setName(res.data.users[0].displayName)
  //       console.log(name);
  //     })
  //   }
  // }, [])
  
  return (
    <div className=' font-sans text-2xl  lg:text-3xl font-semibold'> <span className='text-red-500'>E</span>-Mask <span className='text-red-500'>M</span>etrics</div>
    // <div className='flex items-center justify-between px-4'>
    // <div className='py-3 font-sans text-3xl font-semibold'> <span className='text-red-500'>E</span>-Mask <span className='text-red-500'>M</span>etrics</div>
    //   {name && <div className='font-semibold text-xl'>User: { name }</div>}
    // </div>
  )
}

export default Header