//schema of all signups 
//import of all the express
const express=require('express');
//router helps in passing things across
const router=express.Router();
//accessing the class of the schema we are building and sending to the database
const User=require("../models/student");

//gets a post request for the information of what we want to send
//for sending a get request, use router.get
router.post('/createAccount',  (req, res) => {
  //get the text body...
    const userData = req.body;

  try {
        //creating a new user in the database
      const newUser = new User(userData);
      //saving the user data to the database
       newUser.save();
      res.status(200).send("User saved to the database");
  } catch (error) {
      console.error('Error saving user data:', error);
      res.status(500).send("Unable to save user to the database");
  }
});

module.exports=router; //exports the router module, making it available for use in other parts of the application
//link to test post request on POSTMAN: http://localhost:4000/admin/createAccount
