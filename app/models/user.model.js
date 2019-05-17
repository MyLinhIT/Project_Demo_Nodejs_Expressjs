const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  displayName: String,
  age: Number,
  phone: String
});

module.exports = mongoose.model("User", UserSchema);
