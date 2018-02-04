const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds123258.mlab.com:23258/persons'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
    name: String,
    phone: String,
    id: Number
  })  

module.exports = Person