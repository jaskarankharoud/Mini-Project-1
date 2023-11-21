
import express from 'express';
import mongoose from 'mongoose';
import getPort from 'get-port';
import * as fileOperations from './fileOperations.js'; 

const app = express();


const startServer = async () => {
  try {
    const port = await getPort({ port: 3001 });

    await mongoose.connect('mongodb://127.0.0.1:27017/fitnessTracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB using Mongoose');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Error starting the server:', err);
  }
};

startServer();
