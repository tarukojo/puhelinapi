const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
//const morganBody = require('morgan-body')

const Person = require('./models/person')

app.use(express.static('build'))

app.use(cors())

app.use(bodyParser.json())

// Morgan usage way 1
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['body'](req,res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))

// Morgan usage way 2: Another way instead of "morgan" to simply use nicer "morgan-body"
//morganBody(app)

let persons =  [
      {
        "name": "Matti Vanhanen",
        "phone": "050-1234567",
        "id": 1
      },
      {
        "name": "Taru Kojo",
        "phone": "040-2222222",
        "id": 2
      },
      {
        "name": "Linda Liukas",
        "phone": "032-44674747",
        "id": 3
      },
      {
        "name": "Marie Curie",
        "phone": "050-322222",
        "id": 4
      } 
    ]
  
  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    Person
    .find({})
    .then(persons => {
      res.json(persons.map(formatPerson))
    })
  })

  app.get('/info', (req,res) => {
    Person
    .find({})
    .then(persons => {
      res.send('<div>puhelinluettelossa '+ persons.length + ' henkilön tiedot</div><p/><div>'+ new Date() +'</div>')
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    
    Person
    .findOne({_id: id})
    .then(person => {
      response.json(formatPerson(person))
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })

  })

  app.delete('/api/persons/:id', (request, response) => {

    Person
    .findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(404).end()
    })

  })

  const generateId = () => {
    return Math.floor(Math.random() * Math.floor(100000))
  }
  
  const formatPerson = (person) => {
    return {
      name: person.name,
      phone: person.phone,
      id: person._id
    }
  }

  morgan.token('type', function (req, res) { return JSON.stringify(req.body) })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
      return response.status(400).json({error: 'name missing'})
    }
    if (body.phone === undefined) {
      return response.status(400).json({error: 'phone missing'})
    }

    const person = new Person({
      name: body.name,
      phone: body.phone,
    })

    Person
    .findOneAndUpdate({name: body.name}, {name: body.name, phone: body.phone}, {upsert:true, new: true} )
    .then(updatedPerson => {
      response.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
  
  })

  app.put('/api/persons/:id', (request, response) => {
    
    console.log("ID: ", request.params.id)

    const body = request.body

    Person
    .findOneAndUpdate({_id: request.params.id}, {phone: body.phone}, {upsert:false, new: true} )
    .then(updatedPerson => {
      response.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })

  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
