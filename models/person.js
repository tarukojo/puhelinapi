const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
const url = 'mongodb://fullstack:sekred@ds123258.mlab.com:23258/persons'

//const url = process.env.MONGODB_URI

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
    name: String,
    phone: String,
    id: Number
  })  

module.exports = Person