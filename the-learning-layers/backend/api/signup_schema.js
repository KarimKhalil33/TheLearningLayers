//schema of all signups 

const mongoose=require('mongoose'); 

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    ID: { type: Integer, required: true }, 
    position: {type: String, required: true},
    username: {type: String, required: true , unique : true }, //username, email and password must be unique for each user
    email: { type: String, required: true ,  unique : true},        
    password: { type: String, required: true ,  unique : true },

});

const User = mongoose.model('User', userSchema); //creating that model in our database

module.exports=User; 