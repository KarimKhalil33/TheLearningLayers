// Importing the database configuration (assuming it sets up the connection to MongoDB)
require('./database');

// Importing required modules
const express = require('express');
const cors = require('cors');

// Define the port for the server to listen on
const port = 4000;

// Create an Express application
const app = express();

// Enable CORS middleware to allow cross-origin requests
app.use(cors());

// Importing bodyParser middleware (assuming it's used to parse JSON requests)
const bodyParser = require('express').json;

// Importing route functionalities for Express to use
const userRouter = require('./api/routes'); // Assuming this handles user-related routes
const pendingEnrollmentsRoutes = require('./api/enrolmentRoute'); // Assuming this handles enrolment routes
const adminRoute = require('./api/adminRoute'); // Assuming this handles delete operations

// Using bodyParser middleware to parse incoming JSON requests
app.use(bodyParser());

// Mounting userRouter for routes starting with '/user'
app.use('/user', userRouter);

// Mounting deleteRoute for routes starting with '/api/delete'
app.use('/api/adminRoute', adminRoute);

// Mounting pendingEnrollmentsRoutes for routes starting with '/api/enrolmentRoute'
app.use('/api/enrolmentRoute', pendingEnrollmentsRoutes);

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

