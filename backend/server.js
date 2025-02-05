const express = require("express");
const mongoose = require("mongoose");
const Grocery = require("./grocery_data");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/groceryDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API endpoint to update prices
app.get("/update-prices", async (req, res) => {
  try {
    await Grocery.updatePrices();
    res.send("Prices updated successfully!");
  } catch (error) {
    res.status(500).send("Error updating prices: " + error.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});