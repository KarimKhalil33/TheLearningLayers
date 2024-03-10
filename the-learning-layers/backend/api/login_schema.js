//schema of all logins 

const mongoose=require('mongoose'); 

const loginSchema = new mongoose.Schema({
    username: {type: String, required: true  },
    password: { type: String, required: true  },

});

const User = mongoose.model('loginUser', loginSchema); //creating that model in our database

module.exports=User; 