const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  store: {
    type: String,
    required: true,
    enum: ["Walmart", "Safeway", "Target"], // Restrict to these stores
  },
  date: {
    type: Date,
    default: Date.now, // Track when the data was added
  },
});

module.exports = mongoose.model("Grocery", grocerySchema);
