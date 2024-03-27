import React from 'react';
import './AddRent.css';
import { useNavigate } from 'react-router-dom';
function AddRent()
{
    const Navigate= useNavigate();
    function ownerEventHandle(event){
        if(event.target.id==='1')
        {
            Navigate('/SelectOptions/addRentals/FillForm')
        }
        else if(event.target.id==='2')
        {
            Navigate('/SelectOptions/addRentals/FillQuery')
        }
    }
    return(
        <div>
            <div className="mainContainer">
                <div className="options" id="1" onClick={ownerEventHandle}>
                    Add House
                </div>
                <div className="options" id="2" onClick={ownerEventHandle}>
                    Show House
                </div>
            </div>
        </div>
    )
}
export default AddRent;