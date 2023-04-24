import React from 'react'
import { useState } from 'react'
import { LoginAPi } from '../firebase-config/Api'
import { storeUserDate } from '../firebase-config/Storage'
import { isAuth } from '../firebase-config/Auth'
import { Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function LoginPage() {

    const initialErrors = {
        email: { required: false },
        password: { required: false },
        custom:null
    }
    
    const [errors, setErrors] = useState(initialErrors)
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email:"",password:""
    })

    const handleChanges = (e) => { 
        setInputs({...inputs,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let hasError = false
        let errors = initialErrors;
        if (inputs.email === "") {
            errors.email.required = true
            hasError=true
        }
        if (inputs.password === "") {
            errors.password.required = true
            hasError=true
        }
        setErrors({ ...errors })
        if (!hasError) { 
            setLoading(true)
            LoginAPi(inputs).then((res) => {
                storeUserDate(res.data.idToken)
                localStorage.setItem('email', inputs.email);
            }).catch((err) => {
                console.log(err)
                if (err.response.data.error.message === "EMAIL_NOT_FOUND") {
                    setErrors({ ...errors ,custom:"Enter valid email id"})
                }
                else if (err.response.data.error.message === "INVALID_PASSWORD") {
                    setErrors({ ...errors ,custom:"Enter valid password"})
                }
                else if (err.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.") {
                    setErrors({ ...errors ,custom:"TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can try again later 5 mins."})
                }
                

            }).finally(
                () => {
                setLoading(false)
            }
            )
            setErrors({...errors})
        }
    }

    if (isAuth()) {
        return <Navigate to="/dashboard" />
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="flex h-screen  justify-center bg-slate-200">
                <div className="text-center my-4 pb-2 w-11/12   lg:w-2/4 rounded   bg-white">
                    <section className="login-block">
                        <div className="">
                            <div className="row ">
                                <div className="col login-sec">
                                    <h2 className="text-center">Login Now</h2>

                                    <form onSubmit={(e)=>handleSubmit(e)} className="login-form" action="">
                                        <div className="form-group md:flex justify-evenly">
                                            <div className='md:w-40'>
                                            <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                        </div>
                                        <input type="email" onChange={(e)=>handleChanges(e)}  className="form-control md:w-1/2" name="email"  id="" placeholder="email"  />
                                        {errors.email.required && <span className="text-danger" >
                                            Email is required.
                                        </span>}
                                    </div>
                                                    <div className="form-group md:flex justify-evenly">
                                                        <div className='md:w-40'>
                                                        <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                                        </div>
                                        <input  className="form-control md:w-1/2" onChange={(e)=>handleChanges(e)} type="password"  name="password" placeholder="password" id="" />
                                        {errors.password.required && <span className="text-danger" >
                                            Password is required.
                                        </span>}
                                    </div>
                                    <div className="form-group">
                                        {loading && <div  className="text-center">
                                            <div className="spinner-border text-primary " role="status">
                                            <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>}
                                        {errors.custom && <span className="text-danger" >
                                                        <p>{ errors.custom }</p>
                                                        </span>}
                                        <input  type="submit" className="btn btn-login float-right" disabled={loading}  value="Login" />
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="form-group">
                                    Create new account ? Please <Link  to="/register" >Register</Link>
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

export default LoginPage