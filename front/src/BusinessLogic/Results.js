import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react';
import './Results.css';
import { useNavigate,useLocation } from 'react-router-dom';
function Results()
{
    const Navigate=useNavigate();
    const[getData, setGetData]=useState([]);
    const [getLocation,setGetLocation]=useState();
    const loc=useLocation();
    const {temporary}=loc.state;
    function fetchDatas()
    {
        setGetLocation(temporary);
        axios.get('http://localhost:5000/getResults')
        .then((req)=>{
            console.log(req.data);
            setGetData(req.data);
        }).catch((err)=>
        {
            console.log("error occured");
        }
        )
    }
    function sendDatas(item)
    {
        Navigate("/SelectOptions/visitInput/Results/Description",{state:{item}})
    }
    useEffect(()=>{
        fetchDatas();
    },[])
    return(
        <div className="cardPlacement">
          {getData.map(items=>(
            items.category === getLocation ?(
            <div className="cardDesigns" key={items.id} onClick={()=>sendDatas(items)}>
                <div className="ImagePortion">
                    <img src={items.images} alt="not available" width="350px" height="250px"/>
                </div>
                <div className="contentPosition">{items.place}</div>
            </div>
            ):null
          ))}
        </div>
    )
}
export default Results