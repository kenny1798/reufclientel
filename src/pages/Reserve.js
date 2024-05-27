import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReserveConfirm from "./ReserveConfirm";
import { useEffect } from "react";
import axios from "../url/axios";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { countryCode } from './CountryCode';
import Select from 'react-select';

function Reserve() {
  const [pax, setPax] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cCode, setCCode] = useState("+60");
  const [mobile, setMobile] = useState("");
  const [unavailableDates, setUnavalableDates] = useState(null);
  const [firstSession, setFirstSession] = useState(null)
  const [secondSession, setSecondSession] = useState(null)
  const [thirdSession, setThirdSession] = useState(null)
  // const maxPax = parseInt(process.env.REACT_APP_MAX_PAX, 10);
  const adjustedCountryCode = cCode.replace(/\D/g, '')

  
  let slicedDate;
  let options = [];

  let adjustedMobile = mobile;
  adjustedMobile = mobile.replace(/\D/g, '')

  if(adjustedMobile.startsWith('0')){
    adjustedMobile = adjustedMobile.substring(1)
  }

  const phoneNumber = `${adjustedCountryCode}${adjustedMobile}`

  if(!selectedDate){
    slicedDate = ""
  }else{

    slicedDate = String(selectedDate).slice(0, 15);
  }

  countryCode.map((value,key) => {
    options.push({value:  `${value.dial_code}`, label:`${value.code} ${value.dial_code}`})
  })

  var today = new Date();
  today.setDate(today.getDate() - 1);
  var threeMonths = new Date(Date.now());
  threeMonths.setMonth(threeMonths.getMonth() + 3);

  useEffect(() => {
    axios.get('get-holidays').then(async (response) => {
      let holidaysDate = [];
      const json = await response.data;
      for(var i = 0; i<json.length; i++){
        const singleHoliday = json[i];
        const singleDateHoliday = new Date(singleHoliday.holidayDate).toISOString().slice(0,10);
        holidaysDate.push(singleDateHoliday)
      }

      return setUnavalableDates(holidaysDate);
     
    })
  },[])

  const paxChange = () => {
    setSelectedDate(null)
    setSelectedSession("")
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSession("");
    const data = {selectedDate: date.toISOString()}
    axios.post("/get-session", data).then( async (response) => {
      const json = await response.data;
      setFirstSession(await json.firstSession)
      setSecondSession(await json.secondSession)
      setThirdSession(await json.thirdSession)
    })
  };
  

  const handleCountryCode = (countryCode) => {
    setCCode(countryCode.value);
  }


  return (
    <div>
      <div
        className="row justify-content-center min-vh-100"
        style={{ backgroundColor: "#ececec" }}
      >
        <div
          className="col-lg-8 min-vh-100"
        >
          <div
            className="min-vh-100 text-center"
          >
            <div className="title"> 
              <div className="subtitle" style={{ paddingTop: "7%" }}>
                Reservation
              </div>
              <h2>@ REUF</h2>
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="card mx-3 mt-3">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-lg-8 text-start">
                        <div className="mb-4 ">
                            <label>Number of Pax</label>
                            <select className="form-select selectpicker" onChange={(event) => {
                              setPax(event.target.value)
                              paxChange()
                              }}>
                              <option value="0">Select number of pax..</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">{parseInt(pax, 10) > 0 ? (<>
                          <div className="mb-3">
                            <label>Select Date</label><br/>
                            <DatePicker
                            showIcon
                            icon="fa fa-calendar"
                            placeholderText="Click Here to Select Date"
                                className="form-control mx-2"
                                selected={selectedDate}
                                inline
                                onChange={handleDateChange}
                                filterDate={date => {
                                    if(date.getMonth)
                                    if (date.getDay() === 1) {                                 
                                    return false;
                                    }
                                    if(date <  today){
                                        return false;
                                    }
                                    if(date >  threeMonths){
                                        return false;
                                    }
                                
                                    const formattedDate = date.toISOString().split('T')[0];
                                    return !unavailableDates.includes(formattedDate);
                                }}
                                
                                />
                          </div>
                          </>) : (<></>)}</div>
                            <div className="col-lg-6 mt-3">{!selectedDate ? (<></>) : (<>
                            <input type="text" className="form-control" value={slicedDate} disabled />
                            <div className="my-3">
                            <label className="mt-3">Select Session</label>

                            {pax > firstSession ? (<>
                              <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" disabled />
                            <label className="form-check-label">
                                3-5PM
                            </label> <span class="badge bg-danger">Fully Booked</span>
                            </div>
                            </>): (<>
                              <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='3-5PM' onClick={(event) => {setSelectedSession(event.target.value)}}/>
                            <label className="form-check-label">
                                3-5PM
                            </label>
                            </div>
                            </>)}

                            {pax > secondSession ? (
                              <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" disabled />
                            <label className="form-check-label">
                              6-8PM 
                            </label> <span class="badge bg-danger">Fully Booked</span>
                            </div>): (
                              <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='6-8PM' onClick={(event) => {setSelectedSession(event.target.value)}}/>
                            <label className="form-check-label">
                              6-8PM
                            </label>
                            </div>)}

                            {pax > thirdSession ? (
                              <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" disabled />
                            <label className="form-check-label">
                              9-11PM
                            </label> <span class="badge bg-danger">Fully Booked</span>
                            </div>
                            ):(
                              <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value='9-11PM' onClick={(event) => {setSelectedSession(event.target.value)}}/>
                            <label className="form-check-label">
                              9-11PM
                            </label>
                            </div>
                            )}  

                          </div> </>)}</div>
                          </div>
                          

                          {selectedSession === "" ?(<></>) : (<>
                          
                          <div className="mb-3">
                            <label>Name</label>
                            <input type="text" name="name" className="form-control" onChange={(event) => {setName(event.target.value)}} required/>
                          </div>
                          <div className="mb-3">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" onChange={(event) => {setEmail(event.target.value)}} required/>
                          </div>

                          <div className="mb-3">
                            <label>Phone Number</label>
                            <div class="col-auto">
                            <div class="input-group">
                            <Select maxMenuHeight={150} className="input-group-text" options={options} value={cCode.value} defaultInputValue="MY +60" onChange={handleCountryCode} isSearchable={true} />
                              <input type="number" name="mobile" class="form-control" id="autoSizingInputGroup" onChange={(event) => {setMobile(event.target.value)}} />
                            </div>
                          </div>
                          </div>

                          </>)}
                          {name === "" || mobile === "" || phoneNumber === "" || email === "" || selectedSession === "" || !selectedDate || parseInt(pax, 10) < 1 ? (<></>): (<div className="col-lg-12 text-center"><ReserveConfirm data={{pax: pax, selectedDate: String(selectedDate), selectedSession: selectedSession, name: name, email: email, phoneNumber: phoneNumber}} />  </div>) }                 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reserve;
