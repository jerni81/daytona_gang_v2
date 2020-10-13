const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  events: { type: Array },
});

const SingleEvent = mongoose.model("Event", eventSchema);

module.exports = SingleEvent;
