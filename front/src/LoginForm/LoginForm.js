import React,{useState}from 'react';
import AfterLogin from './AfterLogin';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';
import LandingPage from './LandingPage';
function Login()
{
    const[loginEmail,setLoginEmail]=useState('');
    const[loginPass,setLoginPass]=useState('');
    const [change,setChange]=useState(0);
    const navigate=useNavigate();
    function submitHandle(event)
    {
        event.preventDefault();
        // console.log("hello ji");
        axios.post('http://localhost:5000/users',{loginEmail,loginPass})
        .then(res=>{
            if(res.data==='exist')
            {
               navigate('/SelectOptions')
            }
            else if(res.data==='non-existant')
            {
                console.log(res.data);
                alert("Your Credentials Are Invalid");
            }
        })
        .catch(err=>console.log(err));
    }
    function validation(opt)
    {

        var email=document.getElementById('22').value;
        var pass=document.getElementById('32').value;
        if(opt==1)
        {
            setLoginEmail(email);
        }
        else if(opt==2)
        {
            setLoginPass(pass);
        }
        // if(email==='' || pass==='')
        //     alert("please enter valid credentials");
            //Here Have To Put Condition For After Successflly Logging
            
    }
    function setChanges()
    {
        setChange(1);
    }
    if(change==1)
    {
        return <LandingPage/>
    }
    else if(change==2)
    {
       

    }
    else{
    return(
        <div className="bodyLogin">
            <div className="mainContainer"></div>
            <div className="surroundBox">
             {/* <div className="halfBox">
                <p className="LoginDesign">Form</p>
                <div className="profileContain">
                <img src={profileFace} alt="Not Found" width="300px" height="300px"></img>
                </div>
             </div>  */}
            <div className="otherHalfBox">
            <div style={{height:'100px',width:'450px',position:'relative'}}><h2 className="FormDesigns">Login Form</h2></div>
            <form className="formPosition" onSubmit={submitHandle}>
                <input type="text" className="textDesign" placeholder="Email" id="22" onChange={()=>{validation(1)}} required></input><br></br><br></br>
                <input type="password" className="textDesign1" placeholder="Password" id="32" onChange={()=>{validation(2)}} required></input><br></br>
                <a href='frontend/src/Images/forgetPass.js' className="forgetDesign">Forgot Password?</a><br></br><br></br>
                <input type="button" className="buttonDesign" value="Back" onClick={()=>{setChanges()}}></input><br></br>
                <input type="submit" className="buttonDesign1" value="LogIn"></input>
            </form>
            </div>
            
            </div>
        </div>
    );
    }
}
export default Login;