import React, { useState, useEffect  } from 'react';
import '../App.css';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import Payment from './Payment';

function UserShowRequest() {
  const [userRequests, setUserRequests] = useState([]);
  // const detailsRef = useRef(null);


  useEffect(() => {
    // Fetch all requests when the component mounts
    axios.get('http://localhost:5000/user-own-requests')
        .then((response) => {

          // detailsRef.current = response.data;
        
          setUserRequests(response.data);
        })
        .catch(error => console.error(error));
}, []);


  return (
    <div>
      <UserNavbar />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center" style={{ marginTop: '50px', color: 'Black' }}>My Booked Rides</h1>
            <table className="table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Customer ID</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Pickup</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Drop</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Date</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Time</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Fare</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Status</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Driver</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Vehicle Number Plate</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Payment</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.map((booking, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ background: 'rgb(160, 203, 235)' }}>{booking.userId}</th>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.pickupLocation}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.dropLocation}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.bookingDate}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.bookingTime}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.fare}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.bookingStatus}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.driverName}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{booking.vehicleNumber}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}> <Payment booking={booking} /></td>
                  </tr>
              
                ))}
              </tbody>
            </table>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserShowRequest