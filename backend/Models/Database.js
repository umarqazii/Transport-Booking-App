const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//---------------------------------------------------
let customerSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: "customer", 
  }
);

//---------------------------------------------------

let bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    bookingDate: { type: String, required: true },
    bookingTime: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    bookingStatus: { type: String, required: true },
    fare: { type: Number, required: true },
    driverName: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
  },
  {
    collection: "bookings", 
  }
);



//---------------------------------------------------


let predefinedRouteSchema = new Schema(
  {
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    fare: { type: Number, required: true },
  },
  {
    collection: "predefinedRoutes", 
  }
);


//---------------------------------------------------

let driverSchema = new Schema(
  {
    driverName: { type: String, required: true },
    driverAvailability: { type: String, required: true, default: "Available" },
    driverLicenseNumber: { type: String, required: true },
  },
  {
    collection: "drivers",
  }
);


//---------------------------------------------------

let vehicleSchema = new Schema(
  {
    vehicleName: { type: String, required: true },
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    vehicleCapacity: { type: Number, required: true },
    vehicleRemainingSeats: { type: Number, required: true },
    location: { type: String, required: true },
  },
  {
    collection: "vehicles", 
  }
);

//---------------------------------------------------

// Only export once and include all models
module.exports = {
  Booking: mongoose.model("Booking", bookingSchema),
  Customer: mongoose.model("Customer", customerSchema),
  PredefinedRoute: mongoose.model("PredefinedRoute", predefinedRouteSchema),
  Driver: mongoose.model("Driver", driverSchema),
  Vehicle: mongoose.model("Vehicle", vehicleSchema),
};


//---------------------------------------------------