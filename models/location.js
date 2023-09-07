const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  playDate: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('location', locationSchema);