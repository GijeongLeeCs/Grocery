const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  nonUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NonUser",
  },
  groceryItem: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);
