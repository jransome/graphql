const { Schema, model } = require('mongoose');

const filmSchema = new Schema({
  name: String,
  number: Number,
  crewId: String
});

module.exports = model('Film', filmSchema);
