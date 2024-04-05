const mongoose = require('mongoose'); // Import MongoDB methods

// Creating the schema for the Admin model
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Admin's username
    email: { type: String, required: true, unique: true }, // Admin's email
    password: { type: String, required: true } // Admin's password
}, { collection: 'admin' });

const Admin = mongoose.model('Admin', adminSchema); // Creating the Admin model in the database

module.exports = Admin; // Exporting the model for use in other parts of the application
