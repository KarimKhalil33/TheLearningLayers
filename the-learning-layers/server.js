// Importing the database configuration (assuming it sets up the connection to MongoDB)
require('./database');

// Importing required modules
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');
const OpenAI = require('openai');

// Generate a random string of length 32 bytes (256 bits)
const key = crypto.randomBytes(32).toString('hex');

// Define the port for the server to listen on
const port = 4000;

// Create an Express application
const app = express();

//initialize a session
app.use(session({
    secret: key, 
    resave: false,
    saveUninitialized: false
}));

// Enable CORS middleware to allow cross-origin requests
app.use(cors());

// Importing bodyParser middleware (assuming it's used to parse JSON requests)
const bodyParser = require('express').json;

// Importing route functionalities for Express to use
const userRouter = require('./api/routes'); //  handles user-related routes
const pendingEnrollmentsRoutes = require('./api/enrollmentRoute'); 
const adminRoute = require('./api/adminRoute'); 
const teacherRoute = require('./api/teacherRoute');
const chatRouter = require('./api/chatRoute.js');

// Using bodyParser middleware to parse incoming JSON requests
app.use(bodyParser());

// Mounting userRouter for routes starting with '/user'
app.use('/user', userRouter);

// Mounting deleteRoute for routes starting with '/api/delete'
app.use('/api/adminRoute', adminRoute);

// Mounting pendingEnrollmentsRoutes for routes starting with '/api/enrolmentRoute'
app.use('/api/enrollmentRoute', pendingEnrollmentsRoutes);

app.use('/api/teacherRoute', teacherRoute);

// Mount the chatRouter for routes starting with '/api/chat'
app.use('/api/chat', chatRouter);

app.use('/files', express.static('../Files'));

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

