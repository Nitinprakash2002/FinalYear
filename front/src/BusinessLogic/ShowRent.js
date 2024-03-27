import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowRent.css'
function ShowRent()
{
    const fetchMail=useRef('');
    const Navigate=useNavigate();
    function showDataHandle()
    {
        if(fetchMail.current!=='')
            Navigate('/SelectOptions/addRentals/FillQuery/ShowData',{state:{fetchMail}})
        else if(fetchMail.current==='')
            alert("Please fill out a valid email")
    }
    return(
        <div>
            <div className="backgroundCard">
                <input type="text" placeholder='Email' id='emails' onChange={(event)=>fetchMail.current=event.target.value}></input><br></br>
                <input type="button" value="Submit" onClick={showDataHandle}></input>
            </div>
        </div>
    )
}
export default ShowRent;