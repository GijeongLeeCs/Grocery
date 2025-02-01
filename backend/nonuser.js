const mongoose = require("mongoose");

const nonUserSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("NonUser", nonUserSchema);
