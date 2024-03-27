const mongoose = require('mongoose');

// Creating a schema for course model
const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    name: { type: String, required: true },
    description: {type: String, required: true },
    title: {type: String, required: true},
    teacher: { type: String},
    students: [{ type: Number }],
}, { collection: 'course' });

const Course = mongoose.model('Course', courseSchema); //creating that model in our database

module.exports = Course; //exporting it so it can be used in any other class
