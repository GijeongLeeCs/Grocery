const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const sendVerificationEmail = require("./email.js");

// Define the User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate and send a verification email
userSchema.methods.sendVerificationEmail = async function () {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
  this.verificationCode = verificationCode;
  await this.save();
  await sendVerificationEmail(this.email, verificationCode);
};

// Method to verify the user's email
userSchema.methods.verifyEmail = async function (code) {
  if (this.verificationCode === code) {
    this.isVerified = true;
    this.verificationCode = null; // Clear the verification code after successful verification
    await this.save();
    return true;
  }
  return false;
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;