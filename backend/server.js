require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // DOM Data Object Modelling
const cors = require("cors"); // Cross-Origin Resource Sharing -> allows FE to make requests to BE
const app = express();

// Import routes
const priceRoutes = require("./routes/prices");
const billRoutes = require("./routes/bills");

const PORT = process.env.PORT || 5000; // For both Atlas and local

const MONGO_URI =
  process.env.ACTIVE_DB === "local"
    ? process.env.MONGO_URI_LOCAL
    : process.env.MONGO_URI_ATLAS;

// Middlewares
app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose.connect(MONGO_URI); // updated version

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,  //To use the new MongoDB driver's URL string parser instead of the old one
//   useUnifiedTopology: true, //to use the new unified topology layer in the MongoDB driver
// });    


// Use routes
app.use("/api/prices", priceRoutes);  //http://localhost:5000/api/prices/
app.use("/api/bills", billRoutes);

// Start server
app.listen(PORT, () => {
  console.log("Server started on http://localhost:5000");
});

