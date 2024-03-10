const mongoose=require('mongoose'); //use to import MongoDB methods
// const autoIncrement =require( 'mongoose-auto-increment'); //commented this out because we don't need incremented

//creating the schema for our model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, //we get the username from the frontend and same for other fields
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema); //creating that model in our database

module.exports=User; //exporting it so it can be used in any other class
