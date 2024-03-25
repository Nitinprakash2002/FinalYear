import React,{useEffect,useState} from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios"
import {useLocation} from "react-router-dom"

import Navbar from "./Navbar"





function NewD(){
const location = useLocation();
const loc=location.state.location;
const price= location.state.price;
const [data, setData] = useState([]); // State to store the fetched data
const [loading, setLoading] = useState(true);
useEffect(() => {
  // Function to call the endpoint and get the data
  const getRecommendation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/getRecommendation', { price, location:loc  });
      console.log(response);
      setData(JSON.parse(JSON.parse(response.data.datas))); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  getRecommendation().finally(() => setLoading(false)); // Call the function when the component mounts
}, [price, loc]); // Dependency array to re-fetch data if price or loc changes
if (loading) {
   return (
     <div style={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         height: '100vh',
         animation: 'fadeInOut 2s infinite',
         WebkitAnimation: 'fadeInOut 2s infinite' /* Safari and Chrome */
       }}>
         <div style={{
           fontSize: '2rem',
           opacity: 0,
           animation: 'fadeInOut 2s infinite',
           WebkitAnimation: 'fadeInOut 2s infinite' /* Safari and Chrome */
         }}>Loading...</div>
       </div>
   );
 }
 const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./temp', false, /\.(png|jpe?g|svg)$/));

// Now, 'images' is an array of URLs, and you can use it in your render method:
// return (
//   <div>
//     {images.map((image, index) => (
//       <img key={index} src={image} alt={`temp${index+1}`} />
//     ))}
//   </div>
// );



    // get the data from getRecommendation
  return (
    <div>
    <Navbar/>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' , top:"4%",padding:"20px"}}>
      {data.map((item, index) => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        return(
        <div key={index} style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      width: '300px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: 'white',
      marginBottom: '20px',
      transition: 'transform 0.3s ease-in-out'
    }} onMouseOver={() => this.style.transform = 'scale(1.05)'}
       onMouseOut={() => this.style.transform = 'scale(1)'}>
      <img src={randomImage} alt={item.name} style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0'
      }}/>
        <h3 style={{ color: '#333', marginBottom: '10px' }}>{item.name}</h3>
         <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Cuisines:</strong> {item.cuisines}</p>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Mean Rating:</strong> {item['Mean Rating']}</p>
           <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Cost for Two:</strong> {item.cost}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Location:</strong> {item.location}</p>
             <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Address:</strong> {item.address}</p>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Online Order:</strong> {item.online_order?"Yes":"No"}</p>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Book Table:</strong> {item.book_table?"Yes":"No"}</p>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Rating:</strong> {item.rate}</p>
               <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Votes:</strong> {item.votes}</p>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Restaurant Type:</strong> {item.rest_type}</p>
        </div>
      )})}
      </div>
      </div>
  );
}

export default NewD;
