const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://wannabedevandy:${password}@cluster0.khvzj9m.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Entry = mongoose.model('Entry', entrySchema);

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newEntry = new Entry({
    name: name,
    number: number,
    id: Math.floor(Math.random() * 999999999),
  });

  newEntry.save().then((result) => {
    console.log('entry saved');
    mongoose.connection.close();
  });
} else {
  Entry.find({}).then((result) => {
    result.forEach((entry) => console.log(entry));
    mongoose.connection.close();
  });
}
