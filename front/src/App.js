import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../src/DataFetching/Navbar"

function App() {
  const Navigate=useNavigate();
  const [price,setPrice]=useState(0);
  const [locations,setLocation]=useState('');
  async function handleClick(tg)
  {

      if(tg.target.id==='1'){setPrice(tg.target.value);}
      else if(tg.target.id==='2'){setLocation(tg.target.value);
      }
      // else if(tg.target.id==='10'){setRating(tg.target.value);}
  }
  async function handleSubmit()
  {
    const inValidReg=/[a-zA-Z]+/
    const validReg=/^[0-9]{2}[\.]?[0-9]{0,2}$/
    const locRegInValid=/^[^\d]+$/
    if(price!='' && validReg.test(price) && locations!='' && locRegInValid.test(locations))
      Navigate('/SelectOptions/settleInput/chooseOptions',{state:{price,locations}});
    else if(inValidReg.test(price))
    {
        alert("Please Put Up a Valid Price");
    }
    else if(!locRegInValid.test(locations))
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
 <label htmlFor="2">Location</label>
</div>


       <input type="button" value="Search" id="3" onClick={handleSubmit}></input><br></br>
      </div>
      </div>
      </div>
  );
}


export default App;
