const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const trainingRoutes = require('./routes/training');
const progressRouter = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/progress', progressRouter);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Training Compliance Platform API');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
