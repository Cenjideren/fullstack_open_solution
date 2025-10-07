// mongo.js
require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model('Entry', entrySchema);

// Add a new entry
if (process.argv.length === 4) {
  const name = process.argv[2];
  const number = process.argv[3];

  const entry = new Entry({ name, number });
  entry.save().then(() => {
    console.log(`📇 Added ${name} with number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

// List all entries
if (process.argv.length === 2) {
  Entry.find({}).then(result => {
    console.log('📖 Phonebook:');
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`);
    });
    mongoose.connection.close();
  });
}