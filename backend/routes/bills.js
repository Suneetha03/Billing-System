const express = require("express");
const router = express.Router();
const Bill = require("../models/Bill"); //(..) Get up 1 directory above

// GET all bills -> Fetching from the Db
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find().sort({ date: -1 }); //Sorting in Descending order
    res.json(bills);
  } catch (err) {
    console.error("Error fetching bills:", err);
  }
});

// POST new bill - Posting into the Db
router.post("/", async (req, res) => {
  try {
    const { customerName, phone, items, total } = req.body; //(POST,PUT)contains data sent by the FE in the body of an HTTP request

    const billNo = Date.now(); //Timestamp in Milliseconds

    const newBill = new Bill({
      billNo,
      customerName,
      phone,
      items,
      total,
    });
    await newBill.save(); //Upload to Db
    res.json({ success: true, billNo });
  } 
  catch (error) {
    console.error("Error saving bill:", error);
  }
});

module.exports = router; //To use in server.js to import routes
