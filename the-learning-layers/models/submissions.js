const mongoose = require('mongoose');

// Creating a schema for assignment model
const submissionSchema = new mongoose.Schema({
    assignmentId:{type:String},
    submissions: [{
        studentNumber: { type: Number },
        submissionDate:{type:Date},
        submissionType: { type: String },
        content: { type: String } 
    }]
}, { collection: 'submission' });

const Submission = mongoose.model('Submission', submissionSchema); //creating that model in our database

module.exports = Submission; //exporting it so it can be used in any other class