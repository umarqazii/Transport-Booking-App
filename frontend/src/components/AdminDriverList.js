import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCancel } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from './AdminNavbar';

function AdminDriverList() {

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch all requests when the component mounts
    axios.get('http://localhost:5000/driver-list')
      .then(response => setAllProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEditDriverAvailability = (driverId) => {
      
      const newDriverAvailability = prompt('Enter the new availability status');
  
      axios.put(`http://localhost:5000/edit-driver-availability/${driverId}`, {
        driverAvailability: newDriverAvailability
      })
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => console.error(error));
    }

  const handleDriverDeletion = (driverId) => {
    axios.delete(`http://localhost:5000/delete-driver/${driverId}`)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => console.error(error));
  }


  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="text-center" style={{ marginTop: '50px', color: 'black' }}>Drivers List</h1>
            <table className="table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Driver ID</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Driver Name</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Driver Availability</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>License Number</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((drivers, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ background: 'rgb(160, 203, 235)' }}>{drivers._id}</th>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{drivers.driverName}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{drivers.driverAvailability}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{drivers.driverLicenseNumber}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>
                      <button className="btn btn-primary me-2" onClick={() => handleEditDriverAvailability(drivers._id)}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Availability </button>

                      <button className="btn btn-danger btn-sm" style={{ marginTop: '2px' }} onClick={() => handleDriverDeletion(drivers._id)} >
                        <FontAwesomeIcon icon={faCancel} /> Fire Driver </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDriverList