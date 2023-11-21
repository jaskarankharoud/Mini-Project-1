
// server.js

const express = require('express');
const methodOverride = require('method-override');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

let db;

(async function () {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true });
        console.log('Connected to MongoDB.');
        db = client.db("fitnessTracker");

    } catch (err) {
        console.error('Error occurred while connecting to MongoDB:', err);
    }
})();

app.get('/', (req, res) => {
    res.send(`<button ><a href="/api/workouts""> workouts </a> </button> <button ><a href="/api/workouts/add""> add workouts </a> </button> `);
});

app.get('/api/workouts', async (req, res) => {
    try {
        const collection = db.collection('workouts');
        const workouts = await collection.find({}).toArray();
        res.render("workouts", { workouts });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching from database');
    }
});

app.get('/api/workouts/add', (req, res) => {
    res.render('workoutForm.ejs');
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:27017/`);
});
=======
const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to read user data from users.json
function readUserData(callback) {
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      const userData = JSON.parse(data);
      callback(null, userData);
    }
  });
}

// Function to write user data to users.json
function writeUserData(userData, callback) {
  const jsonData = JSON.stringify(userData, null, 2);
  fs.writeFile(path.join(__dirname, 'users.json'), jsonData, 'utf8', callback);
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    // Read user data from the file
    readUserData((err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data, null, 2));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});
// Handle GET request to retrieve a specific user by ID
if (req.method === 'GET' && req.url.startsWith('/api/users/')) {
    // Extract user ID from the URL
    const userId = req.url.split('/').pop();
  
    // Read user data from the file
    readUserData((err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
  
      // Find the user with the specified ID
      const user = data.find((u) => u.id === userId);
  
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('User not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user, null, 2));
      }
    });
  }

