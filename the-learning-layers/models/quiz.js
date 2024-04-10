
const mongoose = require('mongoose');
const Course = require('./courses');

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Course,
        required: true
    },
    questions: [{ question: String, options: [String] }],

    description: {  type: String,
        default: "Complete this quiz by due date"

    },

    status: { type: String, enum: ['Submitted', 'Missing', 'Pending', 'Graded'] , default:'InProgress'},

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the Quiz model
const Quiz = mongoose.model('Quiz', quizSchema);


module.exports = Quiz;
