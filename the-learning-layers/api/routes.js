const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/student");
const Teacher = require("../models/teacher");
const Course = require("../models/courses");
const Admin = require("../models/admin");
const Assignment = require('../models/assignments');
const Grades=require('..models/grades');

router.post('/createAccount', async (req, res) => {
  const userData = req.body;

  // Find the email or username in the database
  const existingUser = await User.findOne({username: userData.username });


  if (existingUser) {
    // Return failed status if user exists
    return res.status(400).json({
      status: "FAILED",
      message: "User with the provided username already exists"
    });
  }




  try {
    // Save the user to the 'user' collection

    console.log(userData.position);

    // Check the user's position and save to the appropriate collection
    if (userData.position === "Student") {
      const newStudent = new User(userData);
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
        const user = await Collection.findOne({username}); //find the username in one of these collections

        if (user) {

          // Compare passwords
          if (user.password === password) {
            // User found, set flag and break out of loop
            userFound = true;
            collection = collectionName; //set the collectionName so they can be redirected on frontend

             // If the user is a student, store the student number in the session
             if (collectionName === 'User') {
              req.session.studentNum = user.studentNum;

              console.log(req.session.studentNum)
            }
            break;
          }
        }
      };

      if (userFound) { //send a success request if the user was found
        res.json({
          status: "SUCCESS",
          message: "Login successful",
          collectionName: collection,
          authenticationId: username
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

// Endpoint to fetch user profile information
router.get('/profile/:username', async (req, res) => {
  const { username } = req.params;
  try {
      // You can extend this to search in different collections based on user role
      let user = await User.findOne({ username });
      if (!user) {
          user = await Teacher.findOne({ username });
      }
      if (!user) {
          user = await Admin.findOne({ username });
      }
      if (user) {
          res.json(user);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile' });
  }
});


// Route to fetch the course information
router.get('/viewCourseTeacher/:courseId/:courseName', async (req, res) => {
  const { courseId, courseName } = req.params;

  try {
    let course = await Course.findOne({ courseId, name: courseName }); // Fetch course info from the database
    console.log("Course", course); // Log the course document found
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course); // Send the course as a response
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Error fetching course data' });
  }
});


router.post('/teacherPage', async (req, res) => {
  const authenticationId = req.headers.authorization; // Assuming the authentication ID is sent in the Authorization header
  try {
    let teacher = await Teacher.findOne({ username: authenticationId });
    console.log("Teacher:", teacher); // Log the teacher document found
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    let courses = await Course.find({ teacher: teacher.firstName + " " + teacher.lastName });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching courses', error: error });
  }
});

// Set up storage engine with multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      console.log("Destination function called");
      cb(null, '../Files'); // Save files in the 'Files' directory
  },
  filename: function(req, file, cb) {
      console.log("Filepath log check");
      cb(null, file.originalname);
      console.log("check?");
  }
});

// Endpoint to fetch all teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    // Assuming you want to send back a list of full names
    const teacherNames = teachers.map(teacher => ({
      name: teacher.firstName + ' ' + teacher.lastName,
      username: teacher.username // Include the username if it's needed on the frontend
    }));
    res.status(200).json(teacherNames);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const upload = multer({ storage: storage });

// Route to create a new assignment
console.log("before saving to database check")
router.post('/teacherAssignments', upload.single('file'), async (req, res) => {
  console.log("Route handler for '/teacherAssignments' called");
  console.log("Uploaded file info: ", req.file);
  console.log("Form data: ", req.body);
  const { name, course, weight, description, startDate, dueDate } = req.body;
  const filepath = req.file.originalname;

  // add validation or checks here
  
  try {

    console.log("Assign create log check");
    const newAssignment = new Assignment({ name, course, weight, description, filepath, startDate, dueDate });
    newAssignment.save();
    console.log("Assign saved log check");
    res.status(200).send("Assignment saved to the database");
  } catch (error) {
    console.error('Error saving assignment data:', error);
    res.status(500).send("Unable to save assignment to the database");
  }
});


// Route to get a specific assignment
router.get('/assignments/:assignmentId', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ message: 'Error fetching assignment details' });
  }
});

router.get('/getAssignments',async(req,res)=>{
  try{
    const name = req.query.name;
    const courseId = req.query.courseId;
    const course=name+" "+courseId;
    const assignment = await Assignment.findOne({ course });
    res.json(assignment);
}
catch(error){
    res.status(500).json({ error: 'Internal server error' });
}
})

router.get('/getGrades',async(req,res)=>{
  try{
    const name = req.query.name;
    const courseId = req.query.courseId;
    const course=name+" "+courseId;
    const studentNum= req.body.studentNum;

    const grades = await Grades.findOne({course,studentNum});
    res.json(grades);
  }
  catch(error){
    res.status(500).json({ error: 'Internal server error' });
}
})



module.exports = router;