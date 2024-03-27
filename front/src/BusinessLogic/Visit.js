import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import "./Visit.css"
import Navbar from "../../src/DataFetching/Navbar"
function Visit()
{

    const Navigate=useNavigate();
    function handleRequests(event)
    {
        if(event.target.value==='Adventure')
        {
            const temporary=event.target.value;
            console.log(temporary);
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }
        else if(event.target.value==="Museum")
        {
            const temporary=event.target.value;
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }
        else if(event.target.value==="Pilgrimage")
        {
            const temporary=event.target.value;
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }
        else if(event.target.value==="Park")
        {
            const temporary=event.target.value;
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }
        else if(event.target.value==="Others")
        {
            const temporary="Miscellaneous";
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }
        else if(event.target.value==="Waterfalls")
        {
            const temporary=event.target.value;
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }
        else if(event.target.value==='Wildlife')
        {
            const temporary=event.target.value;
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }
        else if(event.target.value==='Lake')
        {
            const temporary=event.target.value;
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        } 
        else if(event.target.value==='Historical')
        {
            const temporary=event.target.value;
            Navigate('/SelectOptions/visitInput/Results',{state:{temporary}});
        }           

    }
    return(
        <div>
        <Navbar/>
            <div className="boxbored">
                <select onClick={handleRequests}>
                    <option value="">Choose Your Liking</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Pilgrimage">Pilgrimage</option>
                    <option value="Park">Parks</option>
                    <option value="Historical">Historical</option>
                    <option value="Waterfalls">Waterfalls</option>
                    <option value="Museum">Museum</option>
                    <option value="Lake">Lake</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Others">Others</option>
                </select>
            </div>
        </div>
    )
}
export default Visit;
