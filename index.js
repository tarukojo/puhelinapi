const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
//const morganBody = require('morgan-body')

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
    res.json(persons)
  })

  app.get('/info', (req,res) => {
    res.send('<div>puhelinluettelossa '+ persons.length + ' henkilön tiedot</div><p/><div>'+ new Date() +'</div>')
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if ( person ) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const newId = Math.floor(Math.random() * Math.floor(100000))
    // tarkistetaan onko id jo olemassa, jos on generoidaan id uudelleen
    // rekursiivisesti
    const isSaved = persons.filter(person => person.id === newId)    
    if (isSaved.length > 0) {
      generateId() 
    }
    return newId
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

    if ((persons.filter(person => person.name === body.name)).length > 0) {
      return response.status(400).json({error: 'name must be unique'})
    }

    const person = {
      name: body.name,
      phone: body.phone,
      id: generateId()
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
