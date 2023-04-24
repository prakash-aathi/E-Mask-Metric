import React from 'react'
import { useState } from 'react';
import { RegisterAPi } from '../firebase-config/Api';
import { isAuth } from '../firebase-config/Auth';
import { storeUserDate } from '../firebase-config/Storage';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookDataService from "../firebase-config/FireStoreApi"

function RegisterPage() {

    const initialErrors = {
        name:{required:false},
        email: { required: false },
        password: { required: false },
        maskId: { required: false },
        custom:null
    }

    const [errors, setErrors] = useState(initialErrors)
    const [loading, setLoading] = useState(false)
    const [maskId, setMaskId] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let hasError = false
        let errors = initialErrors;
        if (inputs.name === "") {
            errors.name.required = true
            hasError=true
        }
        if (inputs.email === "") {
            initialErrors.email.required = true
            hasError=true
        }
        if (inputs.password === "") {
            initialErrors.password.required = true
            hasError=true
        }   
        if (inputs.maskId === "") {
            initialErrors.maskId.required = true
            setMaskId("Mask Id is required")
            hasError=true
        } 
        else if (inputs.maskId !== "1000" ) {
            initialErrors.maskId.required = true
            hasError = true
            setMaskId("Invalid Mask Id")
        }

        if (!hasError) { 
            setLoading(true)
            RegisterAPi(inputs).then((res) => {
                storeUserDate(res.data.idToken)
                localStorage.setItem('email', inputs.email);
                console.log("token ", res.data.idToken);
                BookDataService.addUsers(inputs.email,inputs);
            }).catch((err) => {
                console.log(err)
                if (err.response.data.error.message === "EMAIL_EXISTS") {
                    setErrors({ ...errors ,custom:"Email already exists"})
                }
                if (err.response.data.error.message === "INVALID_EMAIL") {
                    setErrors({ ...errors ,custom:"Enter valid email id"})
                }
                if (err.response.data.error.message === "WEAK_PASSWORD : Password should be at least 6 characters") {
                    setErrors({ ...errors ,custom:"Password should be at least 6 characters"})
                }
                
            }).finally(
                () => {
                setLoading(false)
            }
            )
        }
        setErrors({ ...errors })

    }

    const [inputs, setInputs] = useState({
        email:"",name: '',password:"",maskId:""
    })

    const handleChanges = (e) => { 
        setInputs({...inputs,[e.target.name]:e.target.value})
    }


    if (isAuth()) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="flex   justify-center bg-slate-200">
        <div className="text-center my-4 pb-2 w-11/12   lg:w-2/4 rounded   bg-white">  
            <section className="register mt-2 ">
                <div className="">
                <div className="row ">
                    <div className="col register-sec">
                        <h2 className="text-center">Register Now</h2>
                        <form className="register-form"  >
                        <div className="form-group lg:flex justify-evenly items-center">
                                            <div className='md:w-40'>
                                            <label htmlFor="exampleInputEmail1" className="text-uppercase  ">Name</label>
                            </div>
            
                            <input type="text" onChange={(e)=>{handleChanges(e)}} className="form-control lg:w-1/2" name="name" id=""  />
                            
                        </div>
                                        {errors.name.required && <div className="text-danger mb-2" >
                                Name is required.
                            </div>}
                        <div className="form-group lg:flex justify-evenly items-center">
                                            <div className='md:w-40'>
                                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                            </div>
            
                            <input type="text" onChange={(e)=>{handleChanges(e)}}  className="form-control lg:w-1/2" name="email" id=""  />
                                        </div>

                                        {errors.email.required && <span className="text-danger " >
                                Email is required.
                                </span>}
                                        
                                        <div className="form-group lg:flex justify-evenly items-center">
                                            <div className='md:w-40'>
                                                <label htmlFor="exampleInputMaskId" className="text-uppercase">Mask ID</label>
                                            </div>
                                            <input type="text" onChange={(e)=>{handleChanges(e)}} placeholder="1000"  className="form-control lg:w-1/2" name="maskId" id=""  />
                                        </div>
                                                {errors.maskId.required && <span className="text-danger" >
                                            { maskId}
                                                </span>}
                                        
                                        <div className="form-group lg:flex justify-evenly  items-center">
                                            <div className='md:w-40 '>
                                            <label htmlFor="exampleInputPassword1" className="text-uppercase ">Password</label>
                                            </div>
                            <input onChange={(e)=>{handleChanges(e)}}  className="form-control lg:w-1/2" type="password"  name="password" id="" />
                                

                                        </div>
                                        
                                        {errors.password.required && <span className="text-danger " >
                                Password is required.
                                </span>}

                        <div className="form-group lg:flex justify-evenly items-center">
                            {errors.custom && <span className="text-danger" >
                                    <p>{ errors.custom }</p>
                            </span>}

                            {loading && <div  className="text-center">
                            <div className="spinner-border text-primary " role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            </div>}
            
                            <input type="submit" onClick={(e)=>handleSubmit(e)} className="btn btn-login float-right" disabled={loading}  value="Register"/>
                        </div>
                        <div className="clearfix"></div>
                        <div className="form-group">
                        Already have account ? Please <Link to="/login">Login</Link>
                        </div>
            
            
                        </form>
            
            
                    </div>
            
                </div>
            
            
                </div>
            </section>
        </div>
        </div>
        </>
  )
}

export default RegisterPage