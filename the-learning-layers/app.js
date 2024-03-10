// app.js

const mongoose = require('mongoose');

// Your mongoose-related code goes here

// Example: Connecting to a MongoDB database
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Example: Define a mongoose schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Example: Creating a new user
const newUser = new User({
  name: 'John Doe',
  email: 'john@example.com',
});

newUser.save((err, savedUser) => {
  if (err) {
    console.error(err);
  } else {
    console.log('User saved:', savedUser);
  }
});
