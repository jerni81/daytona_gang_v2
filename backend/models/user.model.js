const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  brackets: { type: Array },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
