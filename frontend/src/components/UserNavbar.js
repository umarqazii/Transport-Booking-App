import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function UserNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link to={"/userdashboard"} className="nav-link">
                        <h2 style={{ color: "white" }}>Uzair Transport and Tourism</h2>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/userdashboard"} className="nav-link " style={{ color: 'white' }}>
                                    Book a Ride
                                </Link>
                            </li>
                            <li className="nav-item" style={{ border: "2px solid white", borderRadius: "15px", marginRight: "10px" }}>
                                <Link to={"/UserShowRequests"} className="nav-link" style={{ color: 'white' }}>
                                    My Booked Rides
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

export default UserNavbar