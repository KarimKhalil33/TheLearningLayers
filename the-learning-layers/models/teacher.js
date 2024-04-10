const mongoose=require('mongoose'); //use to import MongoDB methods

//creating the schema for our model
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, //we get the username from the frontend and same for other fields
    lastName: { type: String, required: true },
    studentNum : { type: Number, required: true },
    position: {type:String, required:true},
    username: { type: String, required: true },
    email: { type: String, required: true,  unique : true},
    password: { type: String, required: true},
}, { collection: 'teacher' });

const Teacher = mongoose.model('Teacher', userSchema); //creating that model in our database

module.exports=Teacher; //exporting it so it can be used in any other class