const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const Entry = require('./models/entry');
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

// GET ALL PEOPLE
app.get('/api/persons', (req, res) => {
  Entry.find({}).then((result) => {
    res.json(result);
  });
});
// CREATE A PERSON
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return found
      ? res.status(400).json({
          error: 'name must be unique',
        })
      : res.status(400).json({
          error: 'content missing or duplicate entry',
        });
  }

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  entry
    .save()
    .then((savedNumber) => {
      console.log('number saved');
      res.json(savedNumber);
    })
    .catch((err) => next(err));
});

//GET A SINGLE PERSON
app.get('/api/persons/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));

  // return found ? res.json(found) : res.status(404).end();
});

// DELETE A PERSON
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;

  Entry.findByIdAndDelete(id)
    .then((response) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
  // phonebook = phonebook.filter((entry) => entry.id !== id);
});

// UPDATE number
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;
  console.log(request.body);

  Entry.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedEntry) => {
      response.json(updatedEntry);
    })
    .catch((error) => next(error));
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});
