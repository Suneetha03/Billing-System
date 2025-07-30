const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  billNo: { type: Number, required: true },  // mandatory field
  customerName: String,
  phone: String,
  items: [
    {
      name: String,
      qty: Number,
      price: Number,
    },
  ],
  total: Number,
  date: {
    type: Date,
    default: Date.now,  //No values received means Default value used
  },
});

module.exports = mongoose.model("Bill", billSchema); // bills collection & To use in bills.js 
