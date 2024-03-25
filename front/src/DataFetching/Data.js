import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Navbar from "./Navbar"
import {useNavigate} from "react-router-dom"
function App() {
  const Navigate=useNavigate();
  const [price,setPrice]=useState(0);
  const [location,setLocation]=useState('');
  async function handleClick(tg)
  {

      if(tg.target.id==='1'){setPrice(tg.target.value);}
      else if(tg.target.id==='2'){setLocation(tg.target.value);
      }
      // else if(tg.target.id==='10'){setRating(tg.target.value);}
  }
  const navigate=useNavigate();
  async function handleSubmit()
  {
    const inValidReg=/[a-zA-Z]+/
    const validReg=/^[0-9]{2}[\.]?[0-9]{0,2}$/
    const locRegInValid=/^[^\d]+$/
    if(price!='' && validReg.test(price) && location!='' && locRegInValid.test(location))
    {
        navigate("/values",{state:{price:price,location:location}})
    }


    else if(inValidReg.test(price))
    {
        alert("Please Put Up a Valid Price");
    }
    else if(!locRegInValid.test(location))
    {
      alert("Please Put Up a Valid Location")
    }
  }
    return (
      <div>
            <Navbar/>
      <div className="App">
      <div className="z">
       {/* <label>Rating</label><input type="text" id="10" onChange={handleClick} required></input> */}
<div className="inputContainer">
  <input type="text" id="1" placeholder=" " onChange={handleClick} required />
  <label htmlFor="1">Price</label>
</div>
<div className="inputContainer">
 <input type="text" id="2" placeholder=" " onChange={handleClick} required />
 <label htmlFor="1">Location</label>
</div>


       <input type="button" value="Search" id="3" onClick={handleSubmit}></input><br></br>
      </div>
      </div>
      </div>
  );
}


export default App;
