const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const STRIPE = require("stripe")("sk_test_51OKKvoFcYIhHSnv7bUG4IlDZJNFBD7gvHZwA17TlHD0DTDoiiW8t0pdOUJ7hAgxYTpJDZExEBWZtc9P0Ji8rpzbF00iYseuEi1");

var Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

//------------------------------------------------------------------------------------------------

function sendBookingDetailsByEmail(userEmail, BookingService) {
  // console.log("Sending EMAILING Details" + userEmail);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'umarqazii983@gmail.com', 
      pass: 'bdii zlxa vaeh swfn', 
    },
  });

  let mailsgen = new Mailgen({
    theme: 'default',
      product: {
        name: 'Mailgen',
        link: 'https://mailgen.js'
      }
  });


  const mailOptions = {
    from: 'umarqazii983@gmail.com', 
    to: userEmail,
    subject: 'Your Booking Details ',
    text: `Your Booking Details against ${userEmail} are as follows : 

      userId : ${BookingService.userId} ,
      bookingDate : ${BookingService.bookingDate} ,
      bookingTime : ${BookingService.bookingTime} ,
      pickupLocation : ${BookingService.pickupLocation} ,
      dropLocation :${BookingService.dropLocation} ,
      bookingStatus:  ${BookingService.bookingStatus} ,
      driverName: ${BookingService.driverName}  ,
      vehicleNumber: ${BookingService.vehicleNumber} ,
      fare: ${BookingService.fare},
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


//--------------------------------------------------------------------------------------------


const app = express();
const {
  Customer,
  Booking,
  PredefinedRoute,
  Driver,
  Vehicle,
} = require("./Models/Database");
// const nodemailer = require("nodemailer");


app.use(cors(
  {
    origin: ["https://transport-booking-app-frontend.vercel.app"],
    methods:["POST", "GET","PUT", "DELETE"],
    credentials: true
  }
));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((err) => console.log(err));

  




//---------------------------------------------------





app.post('/create-checkout-session', async (req, res) => {
  const { fare } = req.body;

  console.log("Fare: " + fare);
  try {
    const session = await STRIPE.checkout.sessions.create({
      //payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name: 'FAIR',
            },
            unit_amount: fare , // Convert the price to the smallest currency unit (cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/PaymentSuccess',
      cancel_url: 'http://localhost:3000/PaymentFailure',
    });

    res.json({url: session.url}) 


  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Error creating checkout session");
  }
});




//initialize userID as null
let userID = null;

// ----------------------------------Login route (used to check if the person is registered)----------------------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("login request: " + username);
  // Check if it's the admin login
  if (username === "admin" && password === "admin") {
    return res
      .status(200)
      .json({ isAdmin: true, message: "Admin login successful" });
  }

  // Check the database for a matching user
  Customer.findOne({ username: username, password: password })
    .then((user) => {
      if (user) {
        // User found, consider it a successful login
        userID = user._id;

        return res.status(200).json({
          isAdmin: false,
          token: "yourAuthToken",
          user: user,
          message: "Login successful",
        });
      } else {
        // No matching user found in the database
        return res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// ----------------------------------Register route (used for signup purpose)----------------------------------
app.post("/signup", (req, res) => {
  // Assuming you want to create a new user based on the User model
  Customer.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
// ----------------------------------Setting predefines routes from different cities--------------------------------

const predefinedFares = [
  { pickupLocation: "Karachi", dropLocation: "Islamabad", fare: 2000 },
  { pickupLocation: "Karachi", dropLocation: "Lahore", fare: 1500 },
  { pickupLocation: "Karachi", dropLocation: "Peshawar", fare: 2500 },
  { pickupLocation: "Karachi", dropLocation: "Quetta", fare: 3000 },
  { pickupLocation: "Islamabad", dropLocation: "Karachi", fare: 2000 },
  { pickupLocation: "Islamabad", dropLocation: "Lahore", fare: 500 },
  { pickupLocation: "Islamabad", dropLocation: "Peshawar", fare: 1000 },
  { pickupLocation: "Islamabad", dropLocation: "Quetta", fare: 2000 },
  { pickupLocation: "Lahore", dropLocation: "Karachi", fare: 1500 },
  { pickupLocation: "Lahore", dropLocation: "Islamabad", fare: 500 },
  { pickupLocation: "Lahore", dropLocation: "Peshawar", fare: 1000 },
  { pickupLocation: "Lahore", dropLocation: "Quetta", fare: 2000 },
  { pickupLocation: "Peshawar", dropLocation: "Karachi", fare: 2500 },
  { pickupLocation: "Peshawar", dropLocation: "Islamabad", fare: 1000 },
  { pickupLocation: "Peshawar", dropLocation: "Lahore", fare: 1000 },
  { pickupLocation: "Peshawar", dropLocation: "Quetta", fare: 2000 },
  { pickupLocation: "Quetta", dropLocation: "Karachi", fare: 3000 },
  { pickupLocation: "Quetta", dropLocation: "Islamabad", fare: 2000 },
  { pickupLocation: "Quetta", dropLocation: "Lahore", fare: 2000 },
  { pickupLocation: "Quetta", dropLocation: "Peshawar", fare: 2000 },
];

predefinedFares.forEach(async (route) => {
  const existingRoute = await PredefinedRoute.findOne(route);
  if (!existingRoute) {
    const newRoute = new PredefinedRoute(route);
    await newRoute.save();
  }
});

function getFare(pickupLocation, dropLocation) {
  // Find the corresponding fare from the PredefinedRoute collection
  const predefinedRoute = predefinedFares.find(
    (route) =>
      route.pickupLocation === pickupLocation &&
      route.dropLocation === dropLocation
  );

  if (predefinedRoute) {
    return predefinedRoute.fare;
  } else {
    return 0;
  }
}

// ----------------------------------Create Booking (used to create a Booking request)--------------------------------
app.post("/create-booking", async (req, res) => {
  //set each variable of request table explicitly
  const { bookingDate, bookingTime, pickupLocation, dropLocation } = req.body;
  const userId = userID;
  const fare = getFare(pickupLocation, dropLocation);

  if (pickupLocation === dropLocation) {
    return res
      .status(400)
      .json({ message: "Pickup and drop locations cannot be the same" });
  }

  //create request
  Booking.create({
    userId,
    bookingDate,
    bookingTime,
    pickupLocation,
    dropLocation,
    bookingStatus: "Pending",
    driverName: "Not Assigned",
    vehicleNumber: "Not Assigned",
    fare,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//--------------------------------------delete booking--------------------------------------
app.delete("/delete-booking/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const booking = await Booking.findOne({ _id: id });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await Driver.findOneAndUpdate(
      { driverName: booking.driverName },
      { $set: { driverAvailability: "Available" } },
      { new: true }
    );
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(deletedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------Show all requests route (show all requests to admin)----------------------------------
app.get("/all-requests", async (req, res) => {
  try {
    const allRequests = await Booking.find();
    res.json(allRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/get-user/:uid", async (req, res) => {
  try {
    const user = await Customer.findById(req.params.uid);
    console.log(user);
    res.json(user.username);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------Show user's own requests route (show user's own requests to user)----------------------------------
app.get("/user-own-requests", async (req, res) => {
  try {
    // Use the same userID variable that you've declared before
    const userRequests = await Booking.find({ userId: userID });

    res.json(userRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------------Admin can approve a booking request-----------------------------------
app.put("/update-booking/:id", async (req, res) => {
  const { id } = req.params;
  const { bookingStatus } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { bookingStatus },
      { new: true } // To get the updated document after the update
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------Admin can Edit the Fare of a booking request----------------------------------
app.put("/edit-fare/:id", async (req, res) => {
  const { id } = req.params;
  const { fare } = req.body;
  try {
    const updatedFare = await Booking.findByIdAndUpdate(
      id,
      { fare },
      { new: true } // To get the updated document after the update
    );

    if (!updatedFare) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(updatedFare);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// -------------------------------Admin can assign a driver to a booking request----------------------------------

// In your backend's index.js or routes file
app.put("/assign-driver/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  try {
    // Find an available driver in the drivers collection
    const availableDriver = await Driver.findOne({
      driverAvailability: "Available",
    });

    if (!availableDriver) {
      return res.status(404).json({ message: "No available drivers" });
    }

    // Update driverAvailability to 'Assigned' in the drivers collection
    await Driver.findByIdAndUpdate(availableDriver._id, {
      driverAvailability: "Assigned",
    });

    // Update driverName in the bookings collection for the specific booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { driverName: availableDriver.driverName },
      { new: true }
    );

    res.json(updatedBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// -------------------------------Admin can assign a vehicle to a booking request----------------------------------

// In your backend's index.js or routes file
app.put("/assign-vehicle/:bookingId", async (req, res) => {
  const { bookingId } = req.params;
  try {
    // Get the booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Find a vehicle that matches the criteria
    const availableVehicle = await Vehicle.findOne({
      location: booking.pickupLocation,
      vehicleRemainingSeats: { $gt: 0 },
    });

    if (!availableVehicle) {
      return res.status(404).json({ message: "No available vehicles" });
    }

    // Update vehicleRemainingSeats and assign the vehicle to the booking
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      availableVehicle._id,
      { $inc: { vehicleRemainingSeats: -1 } },
      { new: true }
    );

    // Update vehicleNumber in the bookings collection for the specific booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { vehicleNumber: updatedVehicle.vehicleNumber },
      { new: true }
    );

    const book = await Booking.findOne({_id: bookingId});
    const usr = await Customer.findOne({ _id: book.userId });

    
    if(!usr){
      console.log("User not found");
      res.json(updatedBooking);
    }else {
    // console.log("Booking updated");;
    let email = usr.email;
    // console.log("Email : " + email);
    sendBookingDetailsByEmail(email, updatedBooking);
    res.json(updatedBooking);
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//function to generate license key
function generateLicenseNumber() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  //generate 10 character license key
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// ----------------------------------Add product route (used to add a product)----------------------------------
app.post("/add-driver", async (req, res) => {
  //set each variable of product table explicitly
  const { driverName } = req.body;
  const driverLicenseNumber = generateLicenseNumber();
  const driverAvailability = "Available";

  //create driver
  Driver.create({ driverName, driverLicenseNumber, driverAvailability })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ----------------------------------Show all Products (show all Products to admin)----------------------------------
app.get("/driver-list", async (req, res) => {
  try {
    const allDrivers = await Driver.find();
    res.json(allDrivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------Edit driver availability (used to edit driver availability)----------------------------------
app.put("/edit-driver-availability/:id", async (req, res) => {
  const { id } = req.params;
  const { driverAvailability } = req.body;

  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { driverAvailability },
      { new: true } // To get the updated document after the update
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(updatedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------Delete driver (used to delete a driver)----------------------------------
app.delete("/delete-driver/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(deletedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ----------------------------------Add Vehicle--------------------------------
app.post("/add-vehicle", async (req, res) => {
  //set each variable of product table explicitly
  const { vehicleName, vehicleNumber, vehicleType, vehicleCapacity, location } =
    req.body;
  const vehicleRemainingSeats = vehicleCapacity;

  //create product
  Vehicle.create({
    vehicleName,
    vehicleNumber,
    vehicleType,
    vehicleCapacity,
    vehicleRemainingSeats,
    location,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ----------------------------------Show all Vehicles (show all Vehicles to admin)----------------------------------
app.get("/vehicle-list", async (req, res) => {
  try {
    const allVehicles = await Vehicle.find();
    res.json(allVehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.delete("/delete-vehicle/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(deletedVehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
