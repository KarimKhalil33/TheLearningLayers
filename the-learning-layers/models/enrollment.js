const mongoose = require('mongoose');
const Course = require('./courses');

const enrollmentSchema = new mongoose.Schema({
    studentNum: { type: Number, ref: 'Student', required: true }, // Reference to the Student collection
    studentfisrtName: { type: String, ref: 'Student', required: true},
    studentlastName: { type: String, ref: 'Student', required: true},
    courseId: { type: String, ref: 'Course', required: true }, // Reference to the Course collection
    name: { type: String,ref: 'Course', required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Enrollment status
    enrollmentDate: { type: Date, default: Date.now }, // Date of enrollment (optional)
    title:  {type: String, ref: 'Course', required: true}
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
