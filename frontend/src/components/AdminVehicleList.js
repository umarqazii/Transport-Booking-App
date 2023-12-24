import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCancel } from '@fortawesome/free-solid-svg-icons';

function AdminVehicleList() {

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch all requests when the component mounts
    axios.get('https://transport-booking-app-backend.vercel.app/vehicle-list')
      .then(response => setAllProducts(response.data))
      .catch(error => console.error(error));
  }, []);


  
  const handleVehicleDeletion = (vehicle_id) => {
    axios.delete(`https://transport-booking-app-backend.vercel.app/delete-vehicle/${vehicle_id}`)
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
            <h1 className="text-center" style={{ marginTop: '50px', color: 'black' }}>Vehicle List</h1>
            <table className="table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Vehicle ID</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Vehicle Name</th>
                    <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Vehicle Number</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Vehicle Type</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Vehicle Capacity</th>
                  <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Remaining Seats</th>
                    <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Location</th>
                    <th scope="col" style={{ background: 'rgb(34, 145, 224)' }}>Actions</th>

                </tr>
              </thead>
              <tbody>
                {allProducts.map((vehicles, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ background: 'rgb(160, 203, 235)' }}>{vehicles._id}</th>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{vehicles.vehicleName}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{vehicles.vehicleNumber}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{vehicles.vehicleType}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{vehicles.vehicleCapacity}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{vehicles.vehicleRemainingSeats}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>{vehicles.location}</td>
                    <td style={{ background: 'rgb(160, 203, 235)' }}>
                    <button className="btn btn-danger btn-sm" style={{ marginTop: '2px' }} onClick={() => handleVehicleDeletion(vehicles._id)} >
                        <FontAwesomeIcon icon={faCancel} /> Remove Vehicle </button>
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

export default AdminVehicleList
