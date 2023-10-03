const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// Async function for handling HTTP requests
const requestHandler = async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/api/users') {
      // Read user data from a file using Promises and async/await
      const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
};

// Create an HTTP server using the http module and async function
const server = http.createServer(requestHandler);

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});

