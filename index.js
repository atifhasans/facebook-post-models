const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/posts', postRoutes);

// MongoDB connection
const MONGO_URI = 'mongodb+srv://atifobjects:mn14K2zHIoHALbrN@cluster0.s7rhz.mongodb.net/';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
