// import React from 'react';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import AdminDashboard from './components/AdminDashboard';
// import UserDashboard from './components/UserDashboard';
// import UserShowRequests from './components/UserShowRequests';
// import UserProductList from './components/UserProductList';
// import AdminShowRequest from './components/AdminShowRequests';
// import AdminAddDriver from './components/AdminAddDriver';
// import AdminDriverList from './components/AdminDriverList';
// import AdminAddDVehicle from './components/AdminAddVehicle';
// import AdminVehicleList from './components/AdminVehicleList';
// import PaymentSuccess from './components/PaymentSuccess';
// import PaymentFailure from './components/PaymentFailure';

// import { BrowserRouter, Route, Routes} from 'react-router-dom';
// import { useState, useEffect } from 'react';


// const App = () => {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<Signup />} />
//           <Route path="/admindashboard" element={<AdminDashboard />} />
//           <Route path="/userdashboard" element={<UserDashboard />} />
//           <Route path="/UserShowRequests" element={<UserShowRequests />} />
//           <Route path="/UserProductList" element={<UserProductList />} />
//           <Route path="/AdminShowRequests" element={<AdminShowRequest />} />
//           <Route path="/AdminAddDriver" element={<AdminAddDriver />} />
//           <Route path="/AdminDriverList" element={<AdminDriverList />} />
//           <Route path="/AdminAddVehicle" element={<AdminAddDVehicle />} />
//           <Route path="/AdminVehicleList" element={<AdminVehicleList />} />
//           <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
//           <Route path="/PaymentFailure" element={<PaymentFailure />} />
//         </Routes>
//       </BrowserRouter>
//     );
//   };
  
//   export default App;


// App component

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import UserShowRequests from './components/UserShowRequests';
import UserProductList from './components/UserProductList';
import AdminShowRequest from './components/AdminShowRequests';
import AdminAddDriver from './components/AdminAddDriver';
import AdminDriverList from './components/AdminDriverList';
import AdminAddDVehicle from './components/AdminAddVehicle';
import AdminVehicleList from './components/AdminVehicleList';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';


const authenticate = (token) => {
  localStorage.setItem('token', token);
};

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const logout = () => {
  localStorage.removeItem('token');
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    if (isAuthenticated()) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    authenticate(token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Signup />} />
        {isLoggedIn ? (
          <>
            <Route path="/admindashboard" element={<AdminDashboard onLogout={handleLogout} />} />
            <Route path="/userdashboard" element={<UserDashboard onLogout={handleLogout} />} />
            <Route path="/UserShowRequests" element={<UserShowRequests />} />
            <Route path="/UserProductList" element={<UserProductList />} />
            <Route path="/AdminShowRequests" element={<AdminShowRequest />} />
            <Route path="/AdminAddDriver" element={<AdminAddDriver />} />
            <Route path="/AdminDriverList" element={<AdminDriverList />} />
            <Route path="/AdminAddVehicle" element={<AdminAddDVehicle />} />
            <Route path="/AdminVehicleList" element={<AdminVehicleList />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
            <Route path="/PaymentFailure" element={<PaymentFailure />} />
          </>
        ) : (
          // Redirect to login if not logged in
          // <Navigate to="/login" />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;