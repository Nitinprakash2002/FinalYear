import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Third from './third.js'
import './second.css'
import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar"
import Transport from './Transport.js'
import New from "./New"
function Second() {
  const [recData,setRecData]=useState([]);
  const [recData2,setRecData2]=useState([])
  const location=useLocation();
  const [rent_tag,setRent_tag]=useState("")
  const [transport_tag,setTransport_tag]=useState("");
  const [data,setData]=useState([]);
  const [nam,setname]=useState("");
  const [getData1,setGetData1]=useState([]);
  const [getData2,setGetData2]=useState([]);
  const [getData3,setGetData3]=useState([]);
  const{tempPrice,remainPrice,locations}=location.state
  console.log(tempPrice,locations);
  const [loading, setLoading] = useState(true);
  var houserent,transported;
  var houserent1,transported1,datas1;
  useEffect(() => {
     fetchData();
   }, []);
  async function fetchData()
  {
    setLoading(true);
      try{
      //  const response =await axios.post('http://localhost:5000/getRecommendations',{tempPrice,locations});
       const response1=await axios.post('http://localhost:5000/getRecommendation1',{tempPrice,locations});
       const response2=await axios.post('http://localhost:5000/getRecommendation2',{locations});
      //  const response3=await axios.post('http://localhost:5000/getRecommendation3',{remainPrice,locations});
      //  const parsedData = JSON.parse(response.data.transport.replace(/'/g, '"'));
      //  transported=JSON.parse(response.data.transport)
      //  houserent=JSON.parse(response.data.houseRent)
      //  setData(JSON.parse(JSON.parse(response.data.datas)));
       houserent1=JSON.parse(response1.data.houserents)
       transported1=JSON.parse(response2.data.transports)
      //  datas1=JSON.parse(JSON.parse(response3.data.restaurants))
       setname("Restorents");
      //  houserent = [...houserent].sort((a, b) => a.price - b.price);
       houserent1 = [...houserent1].sort((a, b) => a.price - b.price);
      //  setRecData(houserent)
      //  setRecData2(transported)
       setGetData1(houserent1);
       setGetData2(transported1);
      //  setGetData3(datas1);
       console.log(houserent1,transported1,datas1);
       setRent_tag("House Rent");
       setTransport_tag("Transportation");
    }
      catch(error){
      console.log("Error Occured",error)
    }
    setLoading(false);
  }
  if (loading) {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '2em',
      // fontSize: '2em',
      animation: 'fadein infinite 2s '
      }}>
        Loading...
      </div>; // Replace this with your loading animation
  }
 return(
  <div>
    <Navbar/>
    <h1 style={{position:"relative",top:"200px"}}>{rent_tag}</h1><br></br>
      <div className="card">
        {getData1.length>0?(getData1.map((item,index)=>(
          <Third key={index} data1={item}></Third>
        )
        )):
        (
          <div className="message1">
            <h2>Sorry!!!No Data Available</h2>
          </div>)}
      </div>
      <h1 style={{position:"relative",top:"200px"}}>{transport_tag}</h1><br></br>
      <div className="card">
        {getData2.length>0?(getData2.map((item1,index)=>(
          <Transport key={index} data2={item1}></Transport>
        )
        )):
        (
          <div className="message1">
            <h2>Sorry!!!No Data Available</h2>
          </div>
        )}
      </div>
      {/* <h1 style={{position:"relative",top:"100px"}}>{nam}</h1>
      <div>
      {
        <New data={getData3}></New>
      }
      </div> */}
  </div>
 )
}

export default Second;
