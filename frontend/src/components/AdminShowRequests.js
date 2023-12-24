import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faCheck,
  faUser,
  faBus,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "./AdminNavbar";

function AdminShowRequests() {
  const requests = [];
  const [allRequests, setAllRequests] = useState(requests);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all-requests");
        const requestsData = await Promise.all(
          response.data.map(async (request) => {
            const result = await axios.get(
              `http://localhost:5000/get-user/${request.userId}`
            );
            return {
              username: result.data,
              bookingId: request._id,
              bookingDate: request.bookingDate,
              bookingTime: request.bookingTime,
              pickupLocation: request.pickupLocation,
              dropLocation: request.dropLocation,
              bookingStatus: request.bookingStatus,
              fare: request.fare,
              driverName: request.driverName,
              vehicleNumber: request.vehicleNumber,
            };
          })
        );
        setAllRequests(requestsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEditFare = (bookingId) => {
    const newFare = prompt("Enter the new fare");

    axios
      .put(`http://localhost:5000/edit-fare/${bookingId}`, {
        fare: newFare,
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleApproveBooking = (bookingId) => {
    axios
      .put(`http://localhost:5000/update-booking/${bookingId}`, {
        bookingStatus: "Approved",
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleAssignDriver = (bookingId) => {
    axios
      .put(`http://localhost:5000/assign-driver/${bookingId}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleAssignVehicle = (bookingId) => {
    axios
      .put(`http://localhost:5000/assign-vehicle/${bookingId}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteBooking = (bookingId) => {
    axios
      .delete(`http://localhost:5000/delete-booking/${bookingId}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="">
          <div className="col-md-8">
            <h1
              className="text-center"
              style={{ marginTop: "50px", color: "black" }}
            >
              All Requests
            </h1>
            <table
              className="table table-responsive align-middle"
              style={{ marginTop: "20px" }}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Customer ID
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Pickup
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Drop
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Fare
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Driver
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Vehicle NO.
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "rgb(34, 145, 224)" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {allRequests.map((booking, index) => (
                  <tr className="" style={{ textAlign: "center" }} key={index}>
                    <th
                      scope="row"
                      style={{ background: "rgb(160, 203, 235)" }}
                    >
                      {booking.username}
                    </th>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.pickupLocation}
                    </td>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.dropLocation}
                    </td>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.bookingDate}
                    </td>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.bookingTime}
                    </td>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.fare}
                    </td>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.bookingStatus}
                    </td>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.driverName}
                    </td>
                    <td style={{ background: "rgb(160, 203, 235)" }}>
                      {booking.vehicleNumber}
                    </td>
                    <td
                      className="d-flex gap-1 flex-row justify-content-center"
                      style={{ background: "rgb(160, 203, 235)" }}
                    >
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditFare(booking.bookingId)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        Fare
                      </button>

                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleAssignDriver(booking.bookingId)}
                      >
                        <FontAwesomeIcon icon={faUser} />
                        Driver
                      </button>

                      <button
                        className="btn btn-warning btn-sm "
                        onClick={() => handleAssignVehicle(booking.bookingId)}
                      >
                        <FontAwesomeIcon icon={faBus} />
                        Vehicle
                      </button>

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleApproveBooking(booking.bookingId)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteBooking(booking.bookingId)}
                      >
                        <FontAwesomeIcon icon={faCancel} />
                        End
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminShowRequests;
