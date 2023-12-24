import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';


function AdminAddDVehicle() {

    const [vehicleName, setVehicleName] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have an authentication token in localStorage

    axios.post(
      'https://transport-booking-app-backend.vercel.app/add-vehicle',
      {
        vehicleName: vehicleName,
        vehicleType: vehicleType,
        vehicleNumber: vehicleNumber,
        vehicleCapacity: vehicleCapacity,
        location: location,
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
    <div>
      <AdminNavbar />
      <div className="container mt-5">
        <h1 className="text-center" style={{ marginTop: '50px', color: 'black' }}>Add Vehicle</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f8f9fa', marginTop: '20px' }}>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Vehicle Name:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="text"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Vehicle Type:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="text"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            License Plate Number:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Capacity:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="text"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
            />
          </label>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Pickup Location:
            <select
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Location</option>
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
            Register
          </button>
        </form>

      </div>
    </div>
  )
}

export default AdminAddDVehicle
