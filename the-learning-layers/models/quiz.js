
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

    status: { type: String, enum: ['Submitted', 'Missing', 'Pending', 'Graded', 'In Progress'] , default:'In Progress'},

    createdAt: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: String,
        default: function() {
            // Set default due date to a week from the current date
            const currentDate = new Date();
            const oneWeekFromNow = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            
            // Get year, month, and day
            const year = oneWeekFromNow.getFullYear();
            const month = String(oneWeekFromNow.getMonth() + 1).padStart(2, '0');
            const day = String(oneWeekFromNow.getDate()).padStart(2, '0');
    
            // Set the time to 11:59 PM
            const hours = 23;
            const minutes = 59;
    
            // Format the time as '11:59PM'
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedMinutes = String(minutes).padStart(2, '0');
            const timeString = `${formattedHours}:${formattedMinutes}${ampm}`;
    
            // Construct the final formatted date string
            const formattedDate = `${year}-${month}-${day} ${timeString}`;
    
            return formattedDate;
        }
    }
    
    
    
});

// Create and export the Quiz model
const Quiz = mongoose.model('Quiz', quizSchema);


module.exports = Quiz;
