const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gridSchema = new Schema({
  name: { type: String },
  raceID: { type: String, index: true, unique: true, required: true },
  grid: { type: Array },
});

const SingleGrid = mongoose.model("StartGrid", gridSchema);

module.exports = SingleGrid;
