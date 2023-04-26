import Navbar from '../components/Navbar'
import React, { useReducer, useEffect,useState } from 'react'
import user from "../firebase-config/FireStoreApi"

const Setting = () => {

    const initialState = {
        temperature: {
            good: { high: "", low: "" },
            warning: { high: "", low: "" },
            danger: { high: "", low: "" },
        },
        pulse: {
            good: { high: "", low: "" },
            warning: { high: "", low: "" },
            danger: { high: "", low: "" },
        },
        oxygen: {
            good: {value: ""},
            warning: {value: ""},
            danger:{value: ""}
        },
        purity: {
            good: {value: ""},
            warning: {value: ""},
            danger:{value: ""}
        }
    }
    const reducer = (state, action) => {
        switch (action.type) {
          case 'UPDATE_VALUE':
            return {
              ...state,
              [action.field]: {
                ...state[action.field],
                [action.key]: {
                  ...state[action.field][action.key],
                  [action.subKey]: action.value,
                },
              },
                }
            case 'RESET_VALUE':
                return action.payload;            
          default:
            return state;
        }
    };
    const [FormData, dispatch] = useReducer(reducer, initialState);
    const [mask, Setmask] = useState(0);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [field, key, subKey] = name.split('.');
        dispatch({ type: 'UPDATE_VALUE', field, key, subKey, value });
      };

    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log("submitted");
        console.log(FormData)
        user.updateSettings(localStorage.email, FormData);
    }

    const handleReset = (e) => { 
        e.preventDefault();
        console.log("reset");
        const standardData = {
            temperature: {
                good: { high: 38, low: 32 },
                warning: { high: 32, low: 28 },
                danger: { high: 40, low: 37},
            },
            pulse: {
                good: { high: 100, low: 60 },
                warning: { high: 60, low: 55 },
                danger: { high: 120, low: 100 },
            },
            oxygen: {
                good: {value: 95},
                warning: {value: 89},
                danger:{value: 100} // max value to be maintained
            },
            purity: {
                good: {value: 1000},
                warning: {value: 2000},
                danger:{value: 300} // min value to be maintained
            }
        } 
        dispatch({ type: 'RESET_VALUE', payload: standardData });
        console.log(FormData,"reset");
        handleSubmit(e);
    }

    useEffect(() => {
        
    }, [])
    
    const handleTime = () => {
        localStorage.setItem("mask", mask)
        console.log("setted mask timing ", mask," seconds")
    }


    return (
        <>
            <Navbar></Navbar>
            <div>
                <h2 className='text-center pt-4 text-3xl font-semibold'>Setting ⚙️</h2>
                <form className='' onSubmit={handleSubmit}>
                    <div className="flex flex-col  items-center mt-8  mx-3">
                    {/* temperature */}
                        <div className="flex flex-col   bg-gray-200  rounded-lg ">
                            <div className='grid text-center grid-cols-3 bg-slate-200   gap-y-5 gap-x-1 mt-4 rounded-lg py-2 items-center pl-6 '>
                                <div className='font-bold text-orange-500'>Temperature</div>
                                <div className='font-bold  text-orange-500'>High</div>
                                <div className='font-bold  text-orange-500'>Low</div>
                            </div>
                            <div className='grid text-center grid-cols-3 bg-slate-200  gap-y-4 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>Good</div>
                                <div className='items-center  '> <input type="number" onChange={handleInputChange} name="temperature.good.high" value={FormData.temperature.good.high}  required className='w-1/2 rounded-lg' /> </div>
                                <div className='items-center'>  <input type="number"  onChange={handleInputChange} name='temperature.good.low' value={FormData.temperature.good.low} required className='w-1/2 rounded-lg ' /> </div>
                            </div>
                            <div className='grid text-center grid-cols-3 bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>warning</div>
                                <div className='items-center'> <input type="number"  onChange={handleInputChange} name='temperature.warning.high' value={FormData.temperature.warning.high} className='w-1/2 rounded-lg ' /> </div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='temperature.warning.low' value={FormData.temperature.warning.low} className='w-1/2 rounded-lg ' /> </div>
                            </div>
                            <div className='grid text-center grid-cols-3 bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600' >Danger</div>
                                <div className='items-center'> <input type="number" onChange={handleInputChange} name='temperature.danger.high' value={FormData.temperature.danger.high} className='w-1/2 rounded-lg ' /> </div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='temperature.danger.low' value={FormData.temperature.danger.low} className='w-1/2 rounded-lg ' /> </div>
                            </div>
                        </div>
                    </div>

                    {/* heart rate */}
                    <div className="flex flex-col  items-center mt-8  mx-3">
                        <div className="flex flex-col   bg-gray-200  rounded-lg ">
                            <div className='grid text-center grid-cols-3 bg-slate-200   gap-y-5 gap-x-1 mt-4 rounded-lg py-2 items-center pl-6 '>
                                <div className='font-bold text-orange-500'>Pulse rate</div>
                                <div className='font-bold  text-orange-500'>High</div>
                                <div className='font-bold  text-orange-500'>Low</div>
                            </div>
                            <div className='grid text-center grid-cols-3 bg-slate-200  gap-y-4 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>Good</div>
                                <div className='items-center  '> <input type="number" onChange={handleInputChange} name="pulse.good.high" value={FormData.pulse.good.high} required className='w-1/2 rounded-lg ' /> </div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name="pulse.good.low" value={FormData.pulse.good.low} className='w-1/2 rounded-lg ' /> </div>
                            </div>
                            <div className='grid text-center grid-cols-3 bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>warning</div>
                                <div className='items-center'> <input type="number" onChange={handleInputChange} name="pulse.warning.high" value={FormData.pulse.warning.high} className='w-1/2 rounded-lg ' /> </div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='pulse.warning.low' value={FormData.pulse.warning.low} className='w-1/2 rounded-lg ' /> </div>
                            </div>
                            <div className='grid text-center grid-cols-3 bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600' >Danger</div>
                                <div className='items-center'> <input type="number" onChange={handleInputChange} name='pulse.danger.high' value={FormData.pulse.danger.high} className='w-1/2 rounded-lg ' /> </div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='pulse.danger.low' value={FormData.pulse.danger.low} className='w-1/2 rounded-lg ' /> </div>
                            </div>
                        </div>
                    </div>


                    {/* oxygen saturation level  */}
                    <div className="flex flex-col items-center mt-4 mx-3 ">
                        <div className="flex flex-col   bg-gray-200  rounded-lg">
                            <div className='grid grid-cols-2 text-center bg-slate-200   gap-y-5 gap-x-1 mt-4 rounded-lg py-2 items-center pl-6 '>
                                <div className='font-bold text-orange-500'>Blood oxygen level</div>
                                <div className='font-bold text-orange-500'>Value</div>
                            </div>
                            <div className='grid grid-cols-2 text-center bg-slate-200  gap-y-4 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600' >Good</div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='oxygen.good.value' value={FormData.oxygen.good.value} className='w-1/2 rounded-lg ' required /> </div>
                            </div>
                            <div className='grid grid-cols-2 text-center bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>warning</div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='oxygen.warning.value' value={FormData.oxygen.warning.value} className='w-1/2 rounded-lg ' required /> </div>
                            </div>
                            <div className='grid grid-cols-2 text-center bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>Danger 100 standard</div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='oxygen.danger.value' value={FormData.oxygen.danger.value} className='w-1/2 rounded-lg ' required /> </div>
                            </div>
                        </div>
                    </div>

                    {/* oxygenPurityLvl */}
                    <div className="flex flex-col items-center mt-4 mx-3 ">
                        <div className="flex flex-col   bg-gray-200  rounded-lg">
                            <div className='grid grid-cols-2 text-center bg-slate-200   gap-y-5 gap-x-1 mt-4 rounded-lg py-2 items-center pl-6 '>
                                <div className='font-bold text-orange-500'>oxygen purity level</div>
                                <div className='font-bold text-orange-500'>Value</div>
                            </div>
                            <div className='grid grid-cols-2 text-center bg-slate-200  gap-y-4 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600' >Good</div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='purity.good.value' value={FormData.purity.good.value} className='w-1/2 rounded-lg ' required /> </div>
                            </div>
                            <div className='grid grid-cols-2 text-center bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>warning</div>
                                <div className='items-center'>  <input type="number"  onChange={handleInputChange} name='purity.warning.value' value={FormData.purity.warning.value} className='w-1/2 rounded-lg ' required /> </div>
                            </div>
                            <div className='grid grid-cols-2 text-center bg-slate-200  gap-y-5 gap-x-1 m-2 rounded-lg  items-center pl-6 '>
                                <div className='font-bold  text-blue-600'>Danger 300 standard</div>
                                <div className='items-center'>  <input type="number" onChange={handleInputChange} name='purity.danger.value' value={FormData.purity.danger.value} className='w-1/2 rounded-lg ' required /> </div>
                            </div>
                        </div>
                    </div>

                    {/* reset button */}
                    <div className='mx-8 mt-4' >
                        <button onClick={handleReset} class=" bg-fuchsia-700 hover:bg-fuchsia-900 text-white py-2 px-4 mb-1 rounded">
                            🔃 Reset
                        </button>
                    {/* submit button */}
                        <button type='submit' class="float-right bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mb-1 rounded">
                            Submit
                        </button>
                        <p className='text-xs mb-4 text-gray-700' > <i>To confirm reset press 2 times to reset Standard data</i></p>
                    </div>

                </form>
                {/* mask usage time */}
                <div className="flex flex-col  items-center lg:w-4/12 bg-gray-200 lg:mx-auto  px-2 py-2 mb-4  ">
                        <div className="flex flex-col    rounded-lg">
                            <h2 className='text-lg '>Mask Usage Time</h2>
                            <input className='rounded mt-2' type="number" value={mask} onChange={(e) => Setmask(e.target.value)}  placeholder='in seconds' />
                            <button onClick={handleTime}  className='bg-blue-500 hover:bg-blue-700 text-white mt-2 rounded'>Update Alert Time</button>
                        </div>
                </div>
            </div>
        </>
  )
}

export default Setting