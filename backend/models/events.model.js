const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  singleEvent: { type: Object, required: true },
});

const SingleEvent = mongoose.model("Event", eventSchema);

module.exports = SingleEvent;
