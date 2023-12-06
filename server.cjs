const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Welcome to the fitness tracker!');
});

// MongoDB and Mongoose setup
mongoose.connect('mongodb://localhost:27017/fitnessTracker', { useNewUrlParser: true, useUnifiedTopology: true });


// Updated Fitness Schema
const fitnessSchema = new mongoose.Schema({
  name: String,
  type: String,
  posted_by: mongoose.Schema.Types.ObjectId
});

const Fitness = mongoose.model('Fitness', fitnessSchema);

// JWT Middleware
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(req.headers.authorization, 'SECRET', (err, decoded) => {
      if (err) return res.status(401).send({ message: 'Unauthorized' });
      req.user = decoded;
      next();
    });
  } else {
    next();
  }
});

// Updated Routes
app.post('/workout', (req, res) => {
  if (!req.user) return res.status(401).send({ message: 'Unauthorized' });
  const newWorkout = new Fitness(req.body);
  newWorkout.posted_by = req.user._id;
  newWorkout.save();
  res.json({ message: 'Workout added successfully' });
});

// HTTPS Configuration
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

https.createServer(httpsOptions, app).listen(3000, () => {
  console.log('HTTPS server running on <https://localhost:3000/>');
});
