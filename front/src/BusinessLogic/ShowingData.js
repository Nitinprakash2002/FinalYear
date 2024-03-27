import React,{useEffect,useState,useRef} from 'react';
import './ShowingData.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RentCards from './RentCards';
function ShowingData()
{
    const location=useLocation();
    const [datas1,setDatas]=useState(null);
    const {fetchMail}=location.state;
    async function gettingDatas()
    {
        await axios.post('http://localhost:5000/getDatas',{fetchMail})
        .then(res=>{
            console.log(res.data.datas)
            const jsonString = res.data.datas.replace(/'/g, '"');
            const parseData=JSON.parse(jsonString)
            console.log(parseData)
            setDatas(parseData)
        })
        .catch(err=>{
            console.log("Error:",err)
        })
    }
    const handleDelete = async (deletedRow) => {
        try {
            // Make request to backend to delete row
            await axios.delete('http://localhost:5000/deleteRow', { data: deletedRow });
            // Remove deleted row from local state
            setDatas(datas1.filter(row => row !== deletedRow));
        } catch (error) {
            console.log("Error deleting row:", error);
        }
    };
    useEffect(()=>{
        gettingDatas();
    },[fetchMail])
    return(
        <div>
             {datas1 === null ? (
                <h3>Loading...</h3> // Show loading message while fetching data
            ) : datas1.length > 0 ? (
                datas1.map((dt, index) => (
                    <RentCards key={index} dataRow={dt} onDelete={handleDelete}></RentCards>
                ))
            ) : (
                <h3>Sorry! No Data Available</h3>
            )}
        </div>
    )
}
export default ShowingData;