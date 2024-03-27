import React,{ useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import '../App.css';
import LandingPage from './LandingPage'
function Signup()
{

    const navigate=useNavigate();
    const[mail,setMali]=useState("");
    const[emailValidity,setEmailValidity]=useState(0);
    const[passwordValidity,setPasswordValidity]=useState(0);
    const[pass,setPass]=useState('Password must have at least one uppercase,lowercase,digit,special character');
    const[rematch,setRematch]=useState("Password doesn't match");
    const [user,setUser]=useState('');
    const [emails,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[flag,setFlag]=useState(0);
    function submitHandle(event)
    {
        event.preventDefault();
        var passValid=document.getElementById('12').value;
        var rePassValid=document.getElementById('13').value;
        if(emailValidity&&(passValid===rePassValid)&& passwordValidity)
        {
            axios.post('http://localhost:5000/secondPage',{user,emails,password})
            .then(res=>{
                if(res.data==='present')
                {
                    navigate('/');
                    alert("Accound With This Email Id Already Registered");
                    
                }
                else if(res.data==='Error')
                {
                    alert("Problem Detected During Signup");
                }
                else if(res.data==='saved'){
                    alert("Successfully Signed up");
                    navigate('/');
                    console.log("success");
                }
            })
            .catch(err=>{console.log(err)})
            setChange(1);
        }
        else{
            alert("Please Enter Credentials Properly!!!");
        }
    }
    function validation(opt)
    {
        
        if(opt===0) 
        {
            var tempUser=document.getElementById('10').value;
            setUser(tempUser);
            console.log(user);
        }
        else if(opt===1)
        {
            const reg=new RegExp('[A-Za-z]+[0-9]*@gmail.com$')
            const email=document.getElementById('11').value;
            if(reg.test(email))
            {
            setEmailValidity(1);
            setFlag(1);
            setMali('Valid email');
            const remail=email.toLowerCase();
            setEmail(remail);
            console.log(remail);
            document.getElementById('11a').style.color="green";
            }
            else if(email.trim()!=='' && flag===0){
                setMali("Invalid email");
                document.getElementById('11a').style.color="red";
            }
            else if(email===''){
                setMali('');
            }
            else{
                setFlag(0);
            }
       
        }
        else if(opt===2)
        {
            const pass=document.getElementById('12').value;
            setPassword(pass);
            const specialCase=new RegExp('[^A-Za-z0-9]+');
            const digit=new RegExp('[a-z]+');
            const small=new RegExp('[A-Z]+');
            const capital=new RegExp('[0-9]+');
            if(pass==='')
            {
                setPass('Password must have at least one uppercase,lowercase,digit,special character');
            }
            else if(specialCase.test(pass) && digit.test(pass) && small.test(pass) && capital.test(pass))
            {
                setPasswordValidity(1);
                setPass("Strong and Valid Password");
                document.getElementById('12a').style.color="green";
            }
            else{
                setPass("Your Password Doesn't fullfil the validation conditions");
                document.getElementById('12a').style.color="red";
            }
        }
        else if(opt===3)
        {
            const prevPass=document.getElementById('12').value;
            const newPass=document.getElementById('13').value;
            if(newPass!==prevPass)
            {
                setRematch("Passwords doesn't match");
                document.getElementById('13a').style.color="red";
            }
            else if(newPass===prevPass)
            {
                setRematch("Password matched successfully");
                document.getElementById('13a').style.color="green";
            }
        }
    }
    useEffect(() => {
        document.getElementById('12a').style.color="black";
      },[pass,mail]);
    const [change,setChange]=useState(0);
    function setChanges()
    {
        setChange(1);
    }
    if(change===1)
    {
        return <LandingPage></LandingPage>
    }
    else{
    return(
        <div style={{justifyContent:'center'}}>
            <form  onSubmit={submitHandle} className="formContain">
                <div style={{width:"200px",height:"100px",position:'relative'}}><h2 style={{position:'relative',left:'150px',top:'50px',fontFamily:"monospace"}}>Sign Up Form</h2></div>
                <input type="text" name="UserName" placeholder="User name" id="10" className="formData" required onChange={()=>validation(0)}></input><br></br><br></br>
                <input type="text" name="Emails" placeholder="Email" className="formData" id="11" onChange={()=>{validation(1)}} required></input><br></br>
                <p className="colourChange" id="11a">{mail}</p><br></br>
                <input type="password" name="Password" className="formData" placeholder="Password" id="12" onChange={()=>{validation(2)}} required></input><br></br>
                    <p className="colourChange" id="12a">{pass}</p><br></br>
                <input type="password" name="RePassword" className="formData" placeholder="Re-enter Password" id="13" onChange={()=>{validation(3)}} required></input><br></br>
                <p className="colourChange" id='13a'>{rematch}</p><br></br>
                <input type="button" value="Back" className="formData" onClick={()=>{setChanges()}}></input><br></br>
                <input type="submit" className="formData" value="Submit"></input>
            </form>
        </div>
    );
    }
}
export default Signup;