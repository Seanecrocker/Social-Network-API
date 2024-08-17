const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log the MongoDB connection status
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));