const express = require('express')
const app = express()

let notes =  [
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
    res.json(notes)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
