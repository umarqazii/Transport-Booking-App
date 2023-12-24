import React, { useState } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';


function UserDashboard() {

  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have an authentication token in localStorage

    axios.post(
      'https://transport-booking-app-backend.vercel.app/create-booking',
      {
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        pickupLocation: pickupLocation,
        dropLocation: dropLocation,
      }

    )
      .then((res) => {
        console.log(res);
        window.location.reload();
        // Handle success, such as displaying a success message to the user
      })
      .catch((err) => {
        console.error(err);
        // Handle error, such as displaying an error message to the user
      });
  };

  return (
    <>
      <div className="App"  >
        <UserNavbar />
      </div>
      <div className="container mt-5">
        <h1 style={{ textAlign: "center", marginTop: "50px", color: "black" }}>Create Booking</h1>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f8f9fa', marginTop: '20px' }}
        >
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Booking Date:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Booking Time:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              required
            />
          </label>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Pickup Location:
            <select
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
            >
              <option value="">Select Pickup Location</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>

            </select>
          </label>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Drop Location:
            <select
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              required
            >
              <option value="">Select Drop Location</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>

            </select>
          </label>
          <button
            style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            type="submit"
          >
            Submit Request
          </button>
        </form>
      </div>
    </>
  )
}

export default UserDashboard
