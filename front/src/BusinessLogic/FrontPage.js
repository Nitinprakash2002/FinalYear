import React from 'react';
import Options from './options';
import '../../src/DataFetching/Budget.css'
import {useNavigate} from 'react-router-dom';

import Navbar from "../../src/DataFetching/Navbar"
function Front()
{
    const Navigate=useNavigate();
  function clicking(opt)
  {
    if(opt===1)
    {
      Navigate('/SelectOptions/settleInput',{state:{from:'/'}});
    }
    else if(opt===2)
    {
      Navigate('/SelectOptions/visitInput',{state:{from:'/'}});
    }
    else if(opt===3)
    {
      Navigate('/SelectOptions/dineInput',{state:{from:'/'}});
    }
    else if(opt===4)
    {
      Navigate('/SelectOptions/addRentals')
    }
  }
  return (
    <div>
    <Navbar/>
    <div className="header-container">
    <h1>Let's ease your journey!</h1>
    <p>How may we assist you today</p>
    </div>
    <div className="container">
        <div className="box" id='2d' onClick={()=>clicking(4)}><h1>{"Rentals"}</h1> <p>Add Your rentals.</p></div>
        <div className="box" id='2a' onClick={()=>clicking(1)}><h1>{"Settle"}</h1> <p>Find the perfect place to live.</p></div>
        <div className="box" id='2b' onClick={()=>clicking(2)}><h1>{"Visit"}</h1><p>Explore new places.</p></div>
        <div className="box" id='2c' onClick={()=>clicking(3)}><h1>{"Dine Out"}</h1><p>Discover the best places to eat.</p></div>
    </div>
    </div>
  );
}
export default Front
