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
         newUser.save();

         console.log(userData.position);

        // Check the user's position and save to the appropriate collection
        if (userData.position === `Student`) {
            const newStudent = new Student(userData);
             newStudent.save();
        } else if (userData.position === `Teacher`) {
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

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();

  if (username == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied"
    })
  }
  else {
    //Check if the user exists in the database
    User.find({ username })
      .then(data => {
        if (data.length) {
          //compare the password with the one in the database
          const pass = data[0].password;
          if (password === pass) {
            res.json({
              status: "SUCCESS",
              message: "Login successful",
              data: data
            })
          }
          else {
            res.status(400).json({
              status: "FAILED",
              message: "Invalid password entered"
            })
          }
        }
        else {
          res.status(400).json({
            status: "FAILED",
            message: "Invalid credentials entered!"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          status: "FAILED",
          message: "An error occured while checking for existing user"
        })
      })
  }
});

const Course = require("../models/courses");

// Route to create a new course
router.post('/createCourse', (req, res) => {
  const courseData = req.body;

  // add validation or checks here
  

  try {
      const newCourse = new Course(courseData);
      newCourse.save();
      res.status(200).send("Course saved to the database");
  } catch (error) {
      console.error('Error saving course data:', error);
      res.status(500).send("Unable to save course to the database");
  }
});


module.exports = router;
