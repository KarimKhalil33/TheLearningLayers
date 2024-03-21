const mongoose = require('mongoose');

// Creating a schema for assignment model
const assignmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: {type: String, required: true },
    description: {type: String, required: true },
    file: {type: Buffer, required: true },
    startDate: {type: Date, required: true },
    dueDate: {type: Date, required: true },
}, { collection: 'assignment' });

const Assignment = mongoose.model('Assignment', assignmentSchema); //creating that model in our database

module.exports = Assignment; //exporting it so it can be used in any other class