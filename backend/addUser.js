const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addUser = async () => {
  try {
    const username = 'm0rty';
    const email = 'm0rty@example.com';
    const password = 'your_password'; // Replace with a secure password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
  } finally {
    mongoose.connection.close();
  }
};

addUser(); 