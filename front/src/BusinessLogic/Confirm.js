import React from 'react';
import { useLocation } from 'react-router-dom';
import {useState,useEffect,useRef} from 'react'
import axios from 'axios';
function Confirm()
{
    const location=useLocation()
    const flagged=useRef(0);
    var flag=0;
    useEffect(()=>{
        if(flagged.current===0)
        {
            setDatas();
        }
    },[])
    const {area_type,availability,locations,size,society,total_sqft,bath,balcony,price,images,mails,address,contact}=location.state;
    async function setDatas()
    {
        const formData = new FormData();
        formData.append('area_type', area_type);
        formData.append('availability', availability);
        formData.append('location', locations);
        formData.append('size', size);
        formData.append('society', society);
        formData.append('total_sqft',parseInt(total_sqft));
        formData.append('bath', parseInt(bath));
        formData.append('balcony',parseInt(balcony));
        formData.append('price', parseFloat(price));
        // if (images && images.length > 0) {
        //     formData.append('image', images[0]);
        // }
        formData.append('image', images[0]);
        formData.append('email',mails);
        formData.append('address',address);
        formData.append('contact_number',contact);
        await axios.post('http://localhost:5000/saveRow',formData)
        .then(req=>{
            if(req.data==='Successful')
            {
                document.getElementById('10').innerHTML="Your House Is Successfully Up For Rentals";
            }
        })
        .catch(err=>{
            console.log("Error encountered",err);
            document.getElementById('10').innerHTML="Sorry!!! During Processing An Error Occured.Please Try Again";
        })
        // console.log(area_type)

    }
    return(
        <div id="10"></div>
    )
};
export default Confirm;