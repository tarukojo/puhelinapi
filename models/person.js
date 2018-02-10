const mongoose = require('mongoose')

require('dotenv').config()

const url = ""

if ( process.env.NODE_ENV !== 'production' ) {
  url = process.env.MONGODB_URI
} else {
  url = process.env.MONGODB_URIPROD
}


mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
    name: String,
    phone: String,
    id: Number
  })  

module.exports = Person