const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const poolSchema = new Schema({
  raceID: { type: String, required: true, index: true, unique: true },
  raceName: { type: String, required: true },
  brackets: { type: Array },
});

const Pool = mongoose.model("Pool", poolSchema);

module.exports = Pool;
