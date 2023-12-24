import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("username: ", username);

    if (username.toLowerCase() === "admin") {
      // Display an alert if the username is 'admin'
      alert("Username cannot be set as 'admin'");
      return; // Do not proceed with the signup
    }

    axios
      .post("https://transport-booking-app-api.vercel.app/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        setSignupSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              {signupSuccess ? (
                <div className="mb-4 text-center">
                  <h5 className="text-success">Signup Successful!</h5>
                  <Link
                    to="/login"
                    className="mx-2 px-5 custom-btn"
                    type="button"
                    style={{ textDecoration: "none" }}
                  >
                    Move to Login
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                  <p className="text-white-50 mb-5">Create a new account!</p>
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Username"
                    id="username"
                    type="text"
                    size="lg"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Email address"
                    id="email"
                    type="email"
                    size="lg"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    label="Password"
                    id="password"
                    type="password"
                    size="lg"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* Call handleSubmit when the button is clicked */}
                  <button
                    className="mx-2 px-5 custom-btn"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>

                  <div>
                    <p className="mb-0">Already have an account?</p>
                    <Link to="/login" className="text-white-50 fw-bold">
                      Login
                    </Link>
                  </div>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
