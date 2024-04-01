const mongoose = require('mongoose');

// Creating a schema for assignment model
const assignmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: {type: String, required: true },
    description: {type: String, required: true },
    filepath: {type: String, required: true },
    startDate: {type: String, required: true },
    dueDate: {type: String, required: true },
    course: {type: String, required: true },
}, { collection: 'assignment' });

const Assignment = mongoose.model('Assignment', assignmentSchema); //creating that model in our database

module.exports = Assignment; //exporting it so it can be used in any other class