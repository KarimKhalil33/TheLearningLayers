const express = require('express');
const router = express.Router();
const User = require("../models/student");

router.post('/createAccount', (req, res) => {
    const userData = req.body;
    // find the email or username in the database
    User.find( { username: userData.username } ).then(result => {
        if (result.length) {
            // return failed status if user exists
            res.status(400).json({
                status: "FAILED",
                message: "User with the provided username already exists"
            })
        }
        //save to database
        else {
            try {
                const newUser = new User(userData);
                newUser.save();
                res.status(200).send("User saved to the database");
            } catch (error) {
                console.error('Error saving user data:', error);
                res.status(500).send("Unable to save user to the database");
            }
        }
    })
});

module.exports=router;