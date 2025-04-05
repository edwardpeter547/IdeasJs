const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./backend/config/db');


// setup the port from the environment.
const port = process.env.PORT || 8000;

// connect to the database
connectDB();

const app = express();

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// set the static folder to our public folder.
app.use(express.static(path.join(__dirname, 'public')));

// cors middleware
app.use(cors({origin: ['http://localhost:5000', 'http://localhost:3000'], credentials: true}));

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
});

app.get('/', (request, response) => {
    response.send({message: 'Welcome to the random ideas api'});
});

const ideasRouter = require('./backend/routes/ideas');
app.use('/api/ideas', ideasRouter);