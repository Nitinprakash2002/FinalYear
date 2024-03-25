import React from 'react'
import {useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './Describe.css';
function Describe()
{
    const [getItems,setGetItems]=useState([]);
    const location=useLocation();
    const{item}=location.state;
    console.log(item);
    function loadData()
    {
        setGetItems(item);
    }
    useEffect(()=>{
      loadData();  
    },[])
    return(
        <div>
            <div className="imageBox">
                <img src={getItems.images} alt="not available" width="1000px" height="500px"></img>
            </div>
            <div className="infoBox">
                    Place Category:{getItems.category}<br></br><br></br>
                    Place Name:{getItems.place}<br></br><br></br>
                    Distance From city:{getItems.distance}<br></br><br></br>
                    Place Location:{getItems.placeLocation}<br></br><br></br>
                    Transportation Options:{getItems.TransportationOptions}<br></br><br></br>
                    Entry Fee:{getItems.EntryFee}<br></br><br></br>
                    Visiting Time:{getItems.Timings}
            </div>
            <div className="descBox">
                <p>{getItems.desc}</p>
            </div>
        </div>
    )
}
export default Describe;