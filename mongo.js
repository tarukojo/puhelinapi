/* To connect using the mongo shell:
mongo ds123258.mlab.com:23258/persons -u <dbuser> -p <dbpassword>
mongodb://<dbuser>:<dbpassword>@ds123258.mlab.com:23258/persons

fullstack / sekred */

const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds123258.mlab.com:23258/persons'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {
  name: String,
  phone: String,
  id: Number
})

const newName = process.argv[2]
const newPhone = process.argv[3]


if (!newName || !newPhone) {
    console.log("Etsitään kaikki henkilöt")
    Person
    .find({})
    .then(result => {
      console.log("puhelinluettelo")
      result.forEach(note => {       
        console.log(note.name + " " + note.phone + " " + note.id)
        })
      mongoose.connection.close()
    })
} else {
    console.log("Tallennetaan henkilön tiedot")
    const person = new Person({
        name: newName,
        phone: newPhone,
        id: Math.floor(Math.random() * Math.floor(100000))
    })

    person
    .save()
    .then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}