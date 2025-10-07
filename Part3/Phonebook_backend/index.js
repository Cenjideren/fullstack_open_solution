const express = require('express')
const app = express()
const morgan = require('morgan');
const cors = require('cors'); 
const path = require('path');

app.use(cors());
app.use(express.static('dist'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const requestTime = new Date ();
  const entryCount = notes.length;
  response.send (
    `
    <div>
    <p> Phonebook has info for ${entryCount} people </p>
    <p> ${requestTime} </p>
    </div>
    `
  );
});

const generateId = () => {
  return String(Math.floor(Math.random()*1000000))
}



app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name||!body.number) {
    return response.status(400).json({ 
      error: 'name and number are required' 
    })
  }



  const nameExsits= notes.some(note => note.name === body.name)
  if (nameExsits) {
    return response.status (400).json (
        {
            error: 'name must be unique'
        }
    )
  }

  const note = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})