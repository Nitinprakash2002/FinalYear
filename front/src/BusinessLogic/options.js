import React from 'react';
import './options.css';
function Options(props)
{
    return(
        <div>
            <div className="cards1" id={props.id} onClick={props.onClick}><p className="textDesign">{props.variable1}</p></div>
        </div>
    ) 
}
export default Options;