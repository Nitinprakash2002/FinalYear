// // import React from "react"
// import React from "react";
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// const importAll = (r) => r.keys().map(r);
// const images = importAll(require.context('./temp', false, /\.(png|jpe?g|svg)$/));
// function New({data})
//   {
//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center',padding:'20px'}}>
//       {data.map((item, index) => {
//         const random = images[Math.floor(Math.random() * images.length)];
//         return(
//         <div key={index} style={{
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       padding: '20px',
//       width: '300px',
//       boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//       backgroundColor: 'white',
//       marginBottom: '20px',
//       margintop: '20px',
//       transition: 'transform 0.3s ease-in-out'
//     }} onMouseOver={() => this.style.transform = 'scale(1.05)'}
//        onMouseOut={() => this.style.transform = 'scale(1)'}>
//       <img src={random} alt={item.name} style={{
//         width: '100%',
//         height: '200px',
//         objectFit: 'cover',
//         borderRadius: '8px 8px 0 0'
//       }}/>
//         <h3 style={{ color: '#333', marginBottom: '10px' }}>{item.name}</h3>
//          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Cuisines:</strong> {item.cuisines}</p>
//           <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Mean Rating:</strong> {item['Mean Rating']}</p>
//            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Cost for Two:</strong> {item.cost}</p>
//             <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Location:</strong> {item.location}</p>
//              <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Address:</strong> {item.address}</p>
//               <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Online Order:</strong> {item.online_order?"Yes":"No"}</p>
//               <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Book Table:</strong> {item.book_table?"Yes":"No"}</p>
//               <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Rating:</strong> {item.rate}</p>
//                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Votes:</strong> {item.votes}</p>
//                 <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Restaurant Type:</strong> {item.rest_type}</p>
//         </div>
//       )})}
//       </div>
//   );
// }

// export default New;
import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./temp', false, /\.(png|jpe?g|svg)$/));

function New({ data }) {
  console.log("Received data:", data);
  if (!data || data.length === 0) {
    return "Sorry No Data Available For This Information."; // or return []
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
      {data.map((item, index) => {
        // Select a random image for each card
        const randomIndex = Math.floor(Math.random() * images.length);

        return (
          <div key={index} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            marginBottom: '20px',
            marginTop: '20px',
            transition: 'transform 0.3s ease-in-out'
          }}>
            <img src={images[randomIndex]} alt={item.name} style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px 8px 0 0'
            }} />
            <h3 style={{ color: '#333', marginBottom: '10px' }}>{item.name}</h3>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Cuisines:</strong> {item.cuisines}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Mean Rating:</strong> {item['Mean Rating']}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Cost for Two:</strong> {item.cost}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Location:</strong> {item.location}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Address:</strong> {item.address}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Online Order:</strong> {item.online_order ? "Yes" : "No"}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Book Table:</strong> {item.book_table ? "Yes" : "No"}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Rating:</strong> {item.rate}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Votes:</strong> {item.votes}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Restaurant Type:</strong> {item.rest_type}</p>
          </div>
        );
      })}
    </div>
  );
}

export default New;



