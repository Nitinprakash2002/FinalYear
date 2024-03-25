import React,{useState} from 'react';
import './LandingPage.css';
import Signup from './Signup.js';
import Login from './LoginForm.js';
import frontBack from '../Images/Relo.jpg';
function LandingPage() {
  const[resultState,setResultState]=useState(4);
  function resultStates(inp)
  {
     setResultState(inp);
  }
  function changeState(cases)
  {
     resultStates(cases);
  }
  if(resultState==0)
  {
    return(
      <Signup></Signup>
    );
  }
  else if(resultState==1)
  {
    return(
      <Login></Login>
    )
  }
  else{
    return (
      <div>
        <img src={frontBack} alt="Not Found" className="frontBackground"/>
          <div className="card">
              <div className="frame12-headlineandsubhead">
                <span className="frame12-text"><span>RSPA</span></span>
                <span className="frame12-text2">
                  <span>Relocation is easier now !</span>
                </span>
              </div>
            <div className="collectionButton">
            <button className="buttonStyle" onClick={()=>{changeState(0)}}><span className="textStyling">Sign up</span></button>
            <button className="buttonStyle" onClick={()=>{changeState(1)}}><span className="textStyling">Log in </span></button>
            </div>
          </div>
        </div>
    );
  }
}

export default LandingPage;