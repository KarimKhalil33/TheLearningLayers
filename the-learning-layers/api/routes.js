const express = require('express');
const router = express.Router();
const User = require("../models/student");
const Teacher = require("../models/teacher");

router.post('/createAccount', async (req, res) => {
    const userData = req.body;

    // Find the email or username in the database
    const existingUser = await User.findOne({ username: userData.username });
    

    if (existingUser) {
        // Return failed status if user exists
        return res.status(400).json({
            status: "FAILED",
            message: "User with the provided username already exists"
        });
    }

    try {
        // Save the user to the 'user' collection
        const newUser = new User(userData);
        await newUser.save();

        // Check the user's position and save to the appropriate collection
        if (userData.position === "Student") {
            const newStudent = new Student(userData);
             newStudent.save();
        } else if (userData.position === "Teacher") {
            const newTeacher = new Teacher(userData);
             newTeacher.save();
        }

        res.status(200).json({
            status: 'SUCCESS',
            message: 'User successfully created'
        });
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).json({
            status: 'FAILED',
            message: 'Unable to save user to the database'
        });
    }
});

module.exports = router;
