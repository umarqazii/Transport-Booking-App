import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';


function AdminAddDriver() {

  const [driverName, setDriverName] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming you have an authentication token in localStorage

    axios.post(
      'https://transport-booking-app-backend.vercel.app/add-driver',
      {
        driverName: driverName,
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
        <h1 className="text-center" style={{ marginTop: '50px', color: 'black' }}>Add Driver</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f8f9fa', marginTop: '20px' }}>

          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Driver Name:
            <input
              style={{ width: '100%', padding: '8px', marginBottom: '16px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              required
            />
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

export default AdminAddDriver
