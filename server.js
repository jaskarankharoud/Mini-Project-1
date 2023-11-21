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
