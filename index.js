const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes'); // Ensure the path is correct

const app = express();

// Middleware
app.use(bodyParser.json());

// Default route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js API!');
});

// Routes
app.use('/api/posts', postRoutes);

// MongoDB connection
const MONGO_URI = 'mongodb+srv://atifobjects:mn14K2zHIoHALbrN@cluster0.s7rhz.mongodb.net/';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
