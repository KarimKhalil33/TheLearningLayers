const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/student");
const Teacher = require("../models/teacher");
const Course = require("../models/courses");
const Admin = require("../models/admin");


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
      const newStudent = new User(userData);
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

router.post('/login', async (req, res) => {
  var collection;
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
    try {
      // Array of collection names to check
      const collectionNames = ['User', 'Admin', 'Teacher'];

      // Flag to track if user is found
      let userFound = false;

      // Iterate over each collection
      for (const collectionName of collectionNames) {

        const Collection = mongoose.model(collectionName);
        const user = await Collection.findOne({ username }); //find the username in one of these collections

        if (user) {

          // Compare passwords
          if (user.password === password) {
            // User found, set flag and break out of loop
            userFound = true;
            collection = collectionName; //set the collectionName so they can be redirected on frontend
            break;
          }
        }
      };

      if (userFound) { //send a success request if the user was found
        res.json({
          status: "SUCCESS",
          message: "Login successful",
          collectionName: collection,
          authenticationId: 'logged'
        });
      } else { //send a failed request if user credentials have not been found
        res.status(400).json({
          status: "FAILED",
          message: "Invalid credentials entered!"
        });
      }

    } catch (error) { //send a failed request if any other error occurs
      res.status(500).json({
        status: "FAILED",
        message: "An error occurred while checking for existing user"
      });
    }
    
  }
});

// Route to create a new course
router.post('/createCourse', (req, res) => {
  const courseData = req.body;

  // add validation or checks here

  // If instructor is not specified, set it to "TBD"
  if (!courseData.teacher || courseData.teacher.trim() === '') {
    courseData.teacher = "TBD";
  }

  try {

    const newCourse = new Course(courseData);
    newCourse.save();
    res.status(200).send("Course saved to the database");
  } catch (error) {
    console.error('Error saving course data:', error);
    res.status(500).send("Unable to save course to the database");
  }
});

// Route to fetch all the courses
router.get('/course', async (req, res) => {
  try {
    const courses = await Course.find({}); // Fetch all courses from the database
    res.json(courses); // Send the courses as a response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error });
  }
});



module.exports = router;
