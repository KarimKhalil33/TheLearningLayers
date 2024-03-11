//schemas for courses 

const mongoose=require('mongoose'); 

const loginSchema = new mongoose.Schema({
    course_name: {type: String, required: true  },
    course_number: { type: Number, required: true  },
    
});

const Course = mongoose.model('course', courseSchema); //creating that model in our database

module.exports=Course; 