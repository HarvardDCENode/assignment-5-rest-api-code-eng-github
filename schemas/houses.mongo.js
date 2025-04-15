const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
  address: String,
  price: Number
});

const House = mongoose.model('House', houseSchema);

module.exports = House;