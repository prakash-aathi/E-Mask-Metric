import React from 'react'
import { useState } from 'react'
import Header from './Header';
import { HiMenuAlt1 } from 'react-icons/hi'
import { isAuth } from '../firebase-config/Auth';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { removeUserData } from '../firebase-config/Storage';

const Navbar = () => {
    const [isActive, setisActive] = useState(false)
    const Navigate = useNavigate();

    const logout = () => { 
        removeUserData();
        Navigate('/login')
    }

    const location = useLocation().pathname;

    return (
        <>
            <div className='h-14 text-white  bg-gray-700'>
                <div className='flex justify-between px-6 lg:px-20 py-2 items-center'>
                    <div>
                        <Header ></Header>
                    </div>
                    <div >
                        <HiMenuAlt1 className='text-3xl block lg:hidden ' onClick={()=> setisActive(!isActive) }/>
                        <ul className=' space-x-4 text-2xl font-semibold hidden lg:flex'>
                            {isAuth() &&  <Link to="/dashboard" className={location === "/dashboard" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' } >Dashboard</Link> }
                            {isAuth() &&  <Link to="/profile"   className={location === "/profile" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' } >Profile</Link> }
                            {/* {isAuth() &&  <Link to="/setting"   className={location === "/setting" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' } >Setting</Link> } */}
                            {isAuth() && <li className='hover:text-red-500 cursor-pointer' onClick={()=>logout()}>Logout</li>}
                            {!isAuth() &&  <Link to="/login" className={location === "/login" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' }>Login</Link> }
                            {!isAuth() && <Link to="/register" className={location === "/register" ? "cursor-pointer text-red-600" : 'hover:text-red-500 cursor-pointer' }>Register</Link>}
                        </ul>
                    </div>
                </div>
            </div>
            
            {isActive &&
                <div className='bg-slate-300   w-11/12 z-10  lg:hidden h-60 absolute right-0 rounded-lg text-center'>
                    <ul className='pt-2 text-red-500   text-2xl font-semibold'>
                        {isAuth() && <div className="py-2"  onClick={()=> setisActive(!isActive)}><Link to="/dashboard"  >Dashboard</Link> </div> }
                        {isAuth() && <div className='py-2' onClick={()=> setisActive(!isActive)}><Link to="/profile"  >Profile</Link> </div> }
                        {/* {isAuth() && <div className='py-2' onClick={()=> setisActive(!isActive)}><Link to="/setting"  >Setting</Link> </div> } */}
                        {isAuth() && <div className='py-2 ' onClick={()=> setisActive(!isActive)}><li  onClick={()=>logout()}>Logout</li></div> } 
                        {!isAuth() && <div className='py-2 ' onClick={()=> setisActive(!isActive)}><Link to="/login"  >Login</Link></div> }
                        {!isAuth() && <div className='py-2 'onClick={()=> setisActive(!isActive)}><Link to="/register">Register</Link></div> }        
                    </ul>
                </div>
            }
            
        </>
  )
}

export default Navbar