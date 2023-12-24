import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function AdminNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container">
                    <Link to={"/admindashboard"} className="nav-link">
                        <h2 style={{ color: 'white' }}>Uzair Transport and tourism</h2>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/AdminShowRequests"} className="nav-link" style={{ color: 'white' }}>
                                    Show Requests
                                </Link>
                            </li>
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/AdminAddDriver"} className="nav-link" style={{ color: 'white' }}>
                                    Add Driver
                                </Link>
                            </li>
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/AdminAddVehicle"} className="nav-link" style={{ color: 'white' }}>
                                    Add Vehicle
                                </Link>
                            </li>
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/AdminDriverList"} className="nav-link" style={{ color: 'white' }}>
                                    Drivers List
                                </Link>
                            </li>
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/AdminVehicleList"} className="nav-link" style={{ color: 'white' }}>
                                    Vehicles List
                                </Link>
                            </li>
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/"} className="nav-link" style={{ color: 'white' }}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AdminNavbar