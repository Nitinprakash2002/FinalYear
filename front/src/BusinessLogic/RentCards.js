import React from 'react';
import './RentCards.css';
function RentCards({dataRow,onDelete})
{
    function removeCard()
    {
        onDelete(dataRow)
    }
    return(
        <div>
            <div className="wholeCard">
                <div className="picPart">
                    <img src={dataRow.imagePath} alt="Not Available" width="400px" height="300px"></img>
                </div>
                <div className="infoPart">
                    <ul>
                    <li><strong>Availability:</strong>{dataRow.availability}</li>
                    <li><strong>Balcony: </strong>{dataRow.balcony}</li>
                    <li><strong>Bathroom:</strong> {dataRow.bath}</li>
                    <li><strong>Location: </strong>{dataRow.location}</li>
                    <li><strong>Rent:</strong>{dataRow.price.toFixed(2)}k</li>
                    <li><strong>Email:</strong>{dataRow.email}</li>
                    <li><strong>Address:</strong>{dataRow.address}</li>
                    <li><strong>Contact No: +91 </strong>{dataRow.contact_number}</li>
                    <li><strong>Society:</strong>{dataRow.society}</li>
                    <input type="button" value="Take Off The Rent" onClick={removeCard}></input>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default RentCards;