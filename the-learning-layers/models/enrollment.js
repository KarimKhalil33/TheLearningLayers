const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    studentNum: { type: Number, ref: 'Student', required: true }, // Reference to the Student collection
    studentName: { type: String, ref: 'Student', required: true},
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to the Course collection
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }, // Enrollment status
    enrollmentDate: { type: Date, default: Date.now }, // Date of enrollment (optional)
    title:  {type: String, ref: 'Course', required: true}
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
