import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import axios from "axios";

function Login({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);

        if (res.data.isAdmin) {
          // Admin login
          window.location.href = "/admindashboard";
           onLogin();
          
        } else {
          // User login
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          onLogin();
          window.location.href = "/userdashboard";

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   axios
  //     .post("http://localhost:5000/login", {
  //       username: username,
  //       password: password,
  //     })
  //     .then((res) => {
  //       console.log(res);
  
  //       if (res.data.isAdmin) {
  //         // Admin login
  //         window.location.href = "/admindashboard";
  //       } else {
  //         // User login
  //         localStorage.setItem("token", res.data.token);
  //         localStorage.setItem("user", JSON.stringify(res.data.user));
  //         window.location.href = "/userdashboard";
  //       }
  
  //       // Call onLogin after the redirection
  //       // onLogin();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">
                Please enter your login and password!
              </p>

              <MDBInput
                label="Username"
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                id="formControlLg"
                type="text"
                size="lg"
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                labelClass="text-white"
                label="Password"
                id="formControlpass"
                type="password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="mx-2 px-5 custom-btn"
                type="button"
                onClick={handleSubmit}
              >
                Login
              </button>

              <p className="small mb-3 pb-lg-2">
                <a className="text-white-50" href="#!">
                  Forgot password?
                </a>
              </p>

              <div>
                <p className="mb-0">Don't have an account?</p>
                <Link to="/" className="text-white-50 fw-bold">
                  Sign Up
                </Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
