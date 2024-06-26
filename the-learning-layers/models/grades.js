const mongoose=require('mongoose'); //use to import MongoDB methods

//creating the schema for our model
const grades = new mongoose.Schema({
    course:{type: String},
    assignmentGrades: [{
        studentNum: Number ,
        assignmentName: String,
        grade: Number,
        status: { type: String, default: 'missing' },
        comment:String
    }],
    quizGrades:[{
        studentNumber:Number,
        studentName: String,
        quizName: String,
        quizId: String,
        status: { type: String, enum: ['Submitted', 'Missing', 'Pending', 'Graded', 'In Review', 'Incomplete'] , default:'Submitted'},
        grade: Number,
        answers: String,
        comments: {type: String, default: 'No Comment from Instructor'}
    }]
}, { collection: 'grades' });

const Grades = mongoose.model('Grades', grades); //creating that model in our database

module.exports=Grades; //exporting it so it can be used in any other class