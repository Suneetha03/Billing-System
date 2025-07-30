const express = require("express");
const router = express.Router();
const Price = require("../models/Price");

router.get("/", async (req, res) => {
  try {
    const prices = await Price.find();
    res.json(prices); //Sends actual data to the client
  } 
  catch (error) {
    console.error("Error fetching prices:", error);
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, category, price } = req.body; //Destructuring
    const newPrice = new Price({ name, category, price });
    await newPrice.save();
    res.json({ success: true }); //Sends a status message confirming the operation succeeded. No actual data.
  } 
  catch (error) {
    console.error("Error adding price:", error);
  }
});

module.exports = router;