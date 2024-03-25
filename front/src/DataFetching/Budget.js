import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from "./Navbar"
import {useState} from 'react';
import './Budget.css';
function Budget()
{
    const Navigate=useNavigate()
    // const [getPrice,setGetPrice]=useState(0);
    // const [getLocation,setGetLocation]=useState('');
    const locates=useLocation()
    const {price,locations}=locates.state;
    function toRecommend(event)
    {
        const ids=event.target.id;
        var tempPrice;
        var remainPrice;
        console.log('inside')
        if(ids==='1a')
        {
            // setGetPrice(price-(price*0.1));
            tempPrice=parseFloat(price)-parseFloat(price*0.5);
            remainPrice=parseFloat(price)-parseFloat(price*0.7);
            // setGetLocation(locations);
            Navigate('/SelectOptions/settleInput/chooseOptions/getRecommendations',{state:{tempPrice,remainPrice,locations}});
        }
        else if(ids==='1b')
        {
            tempPrice=parseFloat(price)-parseFloat(price*0.4);
            remainPrice=parseFloat(price)-parseFloat(price*7)
            Navigate('/SelectOptions/settleInput/chooseOptions/getRecommendations',{state:{tempPrice,remainPrice,locations}});
        }
        else if(ids==='1c')
        {
            tempPrice=parseFloat(price)-parseFloat(price*0.3);
            remainPrice=parseFloat(price)-parseFloat(price*0.4)
            Navigate('/SelectOptions/settleInput/chooseOptions/getRecommendations',{state:{tempPrice,remainPrice,locations}});
        }
    }
    return(
        <div>
        <Navbar/>
        <div className="header-container">
        <h1>Your comfort zone is just a choice away.</h1>
        <p>Make it yours.</p>
      </div>
        <div className="container">
            <div className="box" id='1a' onClick={toRecommend}>{"Basic"}</div>
            <div className="box" id='1b' onClick={toRecommend}>{"Standard"}</div>
            <div className="box" id='1c' onClick={toRecommend}>{"Premium"}</div>
        </div>
        </div>
    )
}
export default Budget;
