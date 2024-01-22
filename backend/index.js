const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(express.json());
app.use(requestLogger);
app.use(morgan('tiny'));
app.use(express.static('dist'));
app.use(cors());

const generateID = () => {
  return Math.floor(Math.random() * 999999999);
};

let phonebook = [
  {
    name: 'Randal Michel',
    number: '786-514',
    id: 1,
  },
  {
    name: 'Ryan Michel',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Rose Napoleon',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Workmond Napoleon',
    number: '39-23-6423122',
    id: 4,
  },
];
// GET ALL PEOPLE
app.get('/api/persons', (req, res) => {
  res.json(phonebook);
});
// CREATE A PERSON
app.post('/api/persons', (req, res) => {
  const body = req.body;
  const found = phonebook.find((element) => element.name === req.body.name);

  if (!body.name || !body.number || found) {
    return found
      ? res.status(400).json({
          error: 'name must be unique',
        })
      : res.status(400).json({
          error: 'content missing or duplicate entry',
        });
  }

  let entry = {
    name: req.body.name,
    number: req.body.number,
    id: generateID(),
  };

  phonebook = phonebook.concat(entry);

  res.json(body);
});

//GET A SINGLE PERSON
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = phonebook.find((element) => element.id === id);

  return found ? res.json(found) : res.status(404).end();
});

// DELETE A PERSON
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter((entry) => entry.id !== id);

  return res.status(204).end();
});

// GET INFO ON TIME OF REQUEST
app.get('/info', (req, res) => {
  const time = new Date().toLocaleDateString();
  //   console.log(time);
  res.send(
    `<p>Phonebook has info for ${phonebook.length} people</p><p>${time}</p>`
  );
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});
