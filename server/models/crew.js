const { Schema, model } = require('mongoose');

const crewSchema = new Schema({
  name: String,
  captain: String,
});

module.exports = model('Crew', crewSchema);
