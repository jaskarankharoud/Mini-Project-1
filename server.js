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
