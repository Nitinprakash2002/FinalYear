// import React from 'react';
// import  './third.css'
// import React from 'react';
//
// function Third({data1}) {
//     return (
//         <div>
//             <h1 style={{position:"relative",top:"100px"}}>House Rents</h1>
//             {data1.map((item, index) => (
//                 <div key={index} style={{
//                     border: '1px solid #ddd',
//                     borderRadius: '8px',
//                     padding: '20px',
//                     width: '300px',
//                     boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
//                     backgroundColor: 'white',
//                     marginBottom: '20px',
//                     transition: 'transform 0.3s ease-in-out'
//                 }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
//                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
//                   <img src={item.imageUrl} alt={item.name} style={{
//                     width: '100%',
//                     height: '200px',
//                     objectFit: 'cover',
//                     borderRadius: '8px 8px 0 0'
//                   }}/>
//                   <h3 style={{ color: '#333', marginBottom: '10px' }}>{item.name}</h3>
//                   <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Availability:</strong>{item.availability}</p>
//                   <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Balcony: </strong>{item.balcony}</p>
//                   <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Bathroom:</strong> {item.bath}</p>
//                   <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Location:</strong> {item.location}</p>
//                   <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Rent:</strong>{item.price.toFixed(2)}k</p>
//                   <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}><strong>Contact No: +91</strong>{item.contact_number}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// export default Third;
import React from 'react';
import  './third.css'
function Third({data1})
{
    return(
        <div className="card-container">
            <div className="cards">
                <div className="pics">
                    <img src={`${data1.imagePath}`} alt="Not Available" width="350px" height="230px"/>
                </div>
                <div className="Infos"><ul>

                    <li><strong>Availability:</strong>{data1.availability}</li>
                    <li><strong>Balcony: </strong>{data1.balcony}</li>
                    <li><strong>Bathroom:</strong> {data1.bath}</li>
                    <li><strong>Location: </strong>{data1.location}</li>
                    <li><strong>Rent:</strong>{data1.price.toFixed(2)}k</li>
                    <li><strong>Contact No: +91 </strong>{data1.contact_number}</li>
                    <li><strong>Email: </strong>{data1.email}</li>
                    <li><strong>Address: </strong>{data1.address}</li>
                </ul>

                </div>
            </div>
        </div>
    )
}
export default Third;
