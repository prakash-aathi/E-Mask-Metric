import React, { useState, useEffect } from "react";
import { isAuth } from "../firebase-config/Auth";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BookDataService from "../firebase-config/FireStoreApi";

const Profile = () => {
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({name:"",email:"",maskId:"",mobileNumber:"",BloodGroup:"",age:"",city:""});

  useEffect(() => {
    const id = localStorage.getItem("email");

    BookDataService.getUser(id)
      .then((res) => {
        setForm(res.data());
        console.log(res.data());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isAuth()) {
    return <Navigate to="/login" />;
  }

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormUpdate = (e) => {
    e.preventDefault();
    const id = localStorage.getItem("email");
    handleUpdate();
    BookDataService.updateUsers(id, form)
    };
    
    const Button = () => {
        return (
        <button className="text-gray-300 hover:text-white" id="editBtn"  onClick={handleUpdate}>
            📝Update
        </button>
        )
    }

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center items-center " id="profile">
        {!update && (
          <div className="bg-red-400 flex flex-col w-11/12 md:w-1/3 mt-4 gap-4 py-8 px-6 rounded-xl shadow-xl border   border-bg-red-600">
            <div className="flex justify-between">
              <div>
                <img
                  className="w-16 h-16 rounded-full shadow-md"
                  src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                  alt=""
                  srcset=""
                />
              </div>
              <div>
                <Button></Button>
              </div>
            </div>
            <div className="text-white flex justify-between ">
              <div>
                <p className="text-justify font-bold text-lg">Name</p>
                <p className="text-justify font-bold text-lg">Email-Id</p>
                <p className="text-justify font-bold text-lg">Mask-Id</p>
                <p className="text-justify font-bold text-lg">MobileNumber</p>
                <p className="text-justify font-bold text-lg">BloodGroup</p>
                <p className="text-justify font-bold text-lg">Age</p>
                <p className="text-justify font-bold text-lg">City</p>
              </div>
              <div>
                <p className="font-bold text-lg">{form.name}</p>
                <p className="font-bold text-lg">{form.email}</p>
                <p className="font-bold text-lg">{form.maskId}</p>
                <p className="font-bold text-lg">
                  {form.mobileNumber === "" ? <Button/> : form.mobileNumber}
                </p>
                <p className="font-bold text-lg">
                  {form.BloodGroup === "" ? <Button/> : form.BloodGroup}
                </p>
                <p className="font-bold text-lg">
                  {form.age === "" ? <Button/>: form.age}
                </p>
                <p className="font-bold text-lg">
                  {form.city === "" ? <Button/> : form.city}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* profile form default hide edit block  */}

        {update && (
          <form
            className="w-11/12 mx-2 lg:mx-80  p-5  max-w-lg mt-2 "
            onSubmit={handleFormUpdate}
          >
            {/* Hide button  */}
            <div className="float-right pb-4 text-gray-400 font-bold">
              <button
                id="hide-button"
                className="hover:text-gray-600"
                onClick={handleUpdate}
              >
                Hide
              </button>
            </div>
            <h2 className="text-center pb-4 text-2xl text-red-400 font-bold">
              Update Profile
            </h2>
            {/* name */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="name"
                >
                  Full Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="cursor-not-allowed bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500"
                  disabled
                  id="name"
                  type="text"
                  value={form.name}
                />
              </div>
            </div>
                      
            {/* email  */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className=" block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="email"
                >
                  Email Id
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="cursor-not-allowed bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="email"
                  disabled
                  type="text"
                  value={form.email}
                />
              </div>
            </div>
                      
            {/* mask id  */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className=" block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="mask"
                >
                  Mask Id
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="cursor-not-allowed bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="mask"
                  disabled
                  type="text"
                  value={form.maskId}
                />
              </div>
            </div>

            {/* phone number     */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                    <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="mobileNumber"
                    >
                    Phone Number
                    </label>
                </div>
                          
                <div className="md:w-2/3">
                    <input
                    onChange={handleChange}
                    name="mobileNumber"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="mobileNumber"
                    type="text"
                    placeholder="0123456789"
                    value={form.mobileNumber}
                    />
                </div>             
            </div>

            {/* blood group       */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="BloodGroup"
                >
                  Blood group
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  onChange={handleChange}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="BloodGroup"
                  type="text"
                  name="BloodGroup"
                  placeholder="B +ve"
                  value={form.BloodGroup}
                />
              </div>
            </div>
                      
            {/* age */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="age"
                >
                  Age
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  onChange={handleChange}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="age"
                  type="text"
                  name="age"
                  placeholder="21"
                  value={form.age}
                />
              </div>
            </div>  
                      
            {/* city */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="city"
                >
                  City
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  onChange={handleChange}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="city"
                  type="text"
                  name="city"
                  placeholder="Avadi"
                  value={form.city}
                />
              </div>
            </div>                     

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  type="submit"
                  className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        )}

        {/* end profile form    */}
      </div>
    </>
  );
};

export default Profile;
