const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  googleId: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  
 
});

const User = mongoose.model("userData", userSchema);

module.exports = { User };
