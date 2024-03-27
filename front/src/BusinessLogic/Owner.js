import React,{useState}from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Owner.css';
function Owner(){
    const Navigate=useNavigate();
    const [area_type,setArea_type]=useState('');
    const [availability,setAvailability]=useState('');
    const [locations,setLocation]=useState('');
    const [size,setSize]=useState('');
    const [society,setSociety]=useState('');
    const [total_sqft,setTotal_sqft]=useState(0);
    const [bath,setBath]=useState(0);
    const [balcony,setBalcony]=useState(0);
    const [price,setPrice]=useState(0);
    const [mails,setMails]=useState('')
    const [address,setAddress]=useState('')
    const [contact,setContact]=useState('')
    const [images,setImages]=useState([]);
    function captureClicked(event)
    {
        if(event.target.id==='back')
        {

        }
        else if(event.target.id==='save')
        {
            
          if(area_type!==''&& availability!==''&& locations!==''&&size!==''&&society!==''&&total_sqft!==''&&bath!==''&&balcony!==''&&price!==''&&mails!==''&&address!==''&&contact!==''&&images.length>0)
               Navigate('/SelectOptions/addRentals/FillForm/Confirm',{state:{area_type,availability,locations,size,society,total_sqft,bath,balcony,price,images,mails,address,contact}});
          else{
               alert("Fill Up The Form Properly")
          }
        }
    }
    function changeCapture(event)
    {
       if(event.target.id==='txt1')
       {
            setArea_type(event.target.value);
       }
       else if(event.target.id==='txt2')
       {
            setAvailability(event.target.value);
       }
       else if(event.target.id==='txt3')
       {
            setLocation(event.target.value);
       }
       else if(event.target.id==='txt4')
       {
          console.log(event.target.value)  
          setSize(event.target.value);
       }
       else if(event.target.id==='txt5')
       {
            setSociety(event.target.value)
       }
       else if(event.target.id==='txt6')
       {
            setTotal_sqft(event.target.value)
       }
       else if(event.target.id==='txt7')
       {
            setBath(event.target.value)
       }
       else if(event.target.id==='txt8')
       {
            setBalcony(event.target.value)
       }
       else if(event.target.id==='txt9')
       {
            setPrice(event.target.value)
       }
       else if(event.target.id==='txt10')
       {
            setImages(event.target.files)
       }
       else if(event.target.id==='txt11')
       {
            setMails(event.target.value)
       }
       else if(event.target.id==='txt12')
       {
           setAddress(event.target.value)
       }
       else if(event.target.id==='txt13')
       {
           setContact(event.target.value)
       }

    }
    return (
        <div>
          <div className="formContainer">
               <div className="elementContainer">
                    <form>
                         <label></label><select id="txt1" onChange={changeCapture}>
                              <option value="">Choose Your Area Type</option>
                              <option value="Build Up Area">Built Up Area</option>
                              <option value="Carpet Area">Carpet Area</option>
                              <option value="Plot Area">Plot Area</option>
                              <option value="Super Built Up Area">Super Built Up Area</option></select><br></br>
                         <label></label><input type="text" id="txt2" placeholder="Availability" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt3" placeholder="Location" onChange={changeCapture}></input><br></br>
                         <label></label><select id="txt4" placeholder="Size" onChange={changeCapture}>
                                             <option value="">Select Size</option>
                                             <option value="1 BHK"> 1 BHK</option>
                                             <option value="2 BHK"> 2 BHK</option>
                                             <option value="3 BHK"> 3 BHK</option>
                                             <option value="4 BHK"> 4 BHK</option>
                                             <option value="1 Bedroom Studio">1 Bedroom Studio</option>
                                             <option value="2 Bedrooms Studio">2 Bedrooms Studio</option>
                                   </select><br></br>
                         <label></label><input type="text" id="txt5" placeholder="Society Name" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt6" placeholder="Total Square Feet Of House" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt7" placeholder="Bathrooms" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt8" placeholder="Balconies" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt9" placeholder="Rent" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt11" placeholder="Email" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt12" placeholder="Address" onChange={changeCapture}></input><br></br>
                         <label></label><input type="text" id="txt13" placeholder="Contact Number" onChange={changeCapture}></input><br></br>
                         <label>Upload Images</label><input type="file" id="txt10" onChange={changeCapture}></input><br></br>
                         <input type="button" value="Back" id="back" onClick={captureClicked}></input><br></br>
                         <input type="button" value="Submit" id="save" onClick={captureClicked}></input>
                    </form>
               </div>
          </div>
        </div>
    )
}
export default Owner;