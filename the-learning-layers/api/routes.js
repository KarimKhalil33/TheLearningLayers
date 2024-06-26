const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const User = require("../models/student");
const Teacher = require("../models/teacher");
const Course = require("../models/courses");
const Admin = require("../models/admin");
const Assignment = require('../models/assignments');
const Grades = require('../models/grades');
const Submission = require('../models/submissions');
const Quiz = require('../models/quiz'); 

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      console.log("Destination function called");
      cb(null, '../Files'); // Save files in the 'Files' directory
  },
  filename: function(req, file, cb) {
      console.log("Filepath log check");
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
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
        const user = await Collection.findOne({ username }); //find the username in one of these collections

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

router.get('/studentNum', async (req, res) => {
  const authenticationId = req.query.authenticationId; // Assuming the authentication ID is sent in the Authorization header
  try {
    let student = await User.findOne({ username: authenticationId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student.studentNum);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching studentNumber', error: error });
  }
})

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

router.get('/getAssignments', async (req, res) => {
  try {
    const name = req.query.name;
    const courseId = req.query.courseId;
    const course = name + " " + courseId;
    const assignment = await Assignment.find({ course });
    res.json(assignment);
  }
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/getGrades', async (req, res) => {
  try {
    const name = req.query.name;
    const courseId = req.query.courseId;
    const course = name + " " + courseId;
    const studentNum = req.query.studentNum;
    console.log(course);
    const grades = await Grades.findOne({ course }); // Only query based on 'course'
    if (!grades) {
      return res.status(404).json({ error: 'Grades not found' });
    }
    const assignmentGrades = grades.assignmentGrades.find(grade => grade.studentNum == studentNum);
    if (!assignmentGrades) {
      return res.status(404).json({ error: 'Grades for student not found' });
    }
    console.log(assignmentGrades);
    res.json(assignmentGrades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/submitAssignment', upload.single('file'), async (req, res) => {
  try {
    const assignmentId = req.query.assignmentId;
    const studentNumber = req.body.studentNumber;
    const submissionDate = req.body.submissionDate;
    const submissionType = req.body.submissionType;
    const content = req.body.content;
    console.log(assignmentId + "" + studentNumber + "" + submissionDate + "" + submissionType + "" + content)

    // Access uploaded file (if any)
    const file = req.file ? req.file.originalname : null; // Check if file exists

    console.log(file);

    // Check if a submission exists for the given assignmentId and studentNumber
    let existingSubmission = await Submission.findOne({ assignmentId, 'submissions.studentNumber': studentNumber });

    if (existingSubmission) {
      // If a submission exists, update it
      await Submission.findOneAndUpdate(
        { assignmentId, 'submissions.studentNumber': studentNumber },
        {
          $set: {
            'submissions.$.submissionDate': submissionDate,
            'submissions.$.submissionType': submissionType,
            'submissions.$.content': content,
            'submissions.$.file': file
          }
        }
      );
      const status = "Submitted"
      let grades = await Grades.findOne({ studentNum: studentNumber });
      if (grades) {
        await Grades.findOneAndUpdate(
          { studentNum: studentNumber, 'assignmentGrades.assignmentName': assignmentNameToUpdate },
          { $set: { 'assignmentGrades.$.status': status } }
        );
      }
      res.json(status);
    } else {
      // If no submission exists, create a new submission
      await Submission.findOneAndUpdate(
        { assignmentId },
        {
          $push: {
            submissions: {
              studentNumber,
              submissionDate,
              submissionType,
              content,
              file
            }
          }
        },
        { upsert: true } // Create a new document if no document matches the query
      );
      const status = "Submitted"
      res.json(status);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/quizzes', async (req, res) => {
  const { courseId, courseName } = req.query;

  try {
      // Find the course by courseId and courseName
      const course = await Course.findOne({ courseId: courseId, name: courseName });

      if (!course) {
          return res.status(404).json({ message: 'Course not found' });
      }
      
      // Find all quizzes associated with the courseId
      const quizzes = await Quiz.find({ courseId: course._id });

      res.json(quizzes);
  } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get quiz details by ID
router.get('/liveQuiz', async (req, res) => {
  console.log("Live quiz started")
  const { id } = req.query;

  try {
    // Fetch the quiz from the database using the provided ID
    const quiz = await Quiz.findById(id);
    console.log("quiz found");
   
    if (!quiz) {
      // If quiz is not found, return a 404 status and error message
      return res.status(404).json({ message: 'Quiz not found' });
    }
    console.log(quiz);
    // If quiz is found, return it in the response
    res.json(quiz);
  } catch (error) {
    // If an error occurs during database query, return a 500 status and error message
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint to save graded quiz
router.post('/saveGradedQuiz', async (req, res) => {
  console.log("trying to save  QUIZ GRADE");
  try {
    // Extract data from the request body
    const { username, courseId, name, quizId, totalGrade, answers } = req.body;
    const quiz = await Quiz.findOne({_id : quizId});
    console.log(quiz);
    const student = await User.findOne({ username });
    
    const course = name + " " + courseId  
    const studentName =  student.firstName + " " + student.lastName;
    const studentNumber = student.studentNum;

    const answer = JSON.stringify(answers);
    
    //Trim answer string 
    // Remove {} and "" from the string
const trimmedString = answer.replace(/[{}"]/g, '');

// Split the string by colon (:)
const parts = trimmedString.split(':');

// Concatenate "Question" at the beginning and "Answer" after the semi colon
const result = "Question : " + parts[0] + " ?  Answer : " + parts[1];


    console.log("student and quiz found");

    const grade = await Grades.findOne({course});
    if (grade) {
      if (grade.quizGrades) {
        // If quizGrades array exists, push the new quiz grade
        grade.quizGrades.push({ studentNumber:studentNumber,  studentName:studentName, quizName: quiz.name, quizId: quizId, status: 'Submitted',  grade: parseInt(totalGrade), answers: result });
        console.log("Quiz updated");
       await grade.save();
      } else {
        // If quizGrades array doesn't exist, update it with the new quiz grade
        await Grades.updateOne(
          {course: course},
          { $set: { 'quizGrades': [{studentNumber:studentNumber,studentName:studentName, quizName: quiz.name, quizId: quizId, status: 'Submitted',  grade: parseInt(totalGrade), answers: result }] } }
        );
       await grade.save();
        console.log("New quiz grade added");
      }
    } else {
      // If the document doesn't exist, create a new one
      const newGrade = new Grades({
        course: course,
        quizGrades: [{studentNumber:studentNumber, studentName:studentName, quizName: quiz.name, quizId: quizId, status: 'Submitted',  grade: parseInt(totalGrade), answers: result }] 
      });
      await newGrade.save();
      console.log("New document created with quiz grade");
    }

 
      // Change quiz status to "In Review"
      await Quiz.updateOne({ quizId }, { $set: { status: 'In Review' } });
      quiz.save();
  

    res.status(200).json({ message: 'Graded quiz saved successfully' });
  } catch (error) {
    console.error('Error saving graded quiz:', error);
    res.status(500).json({ error: 'Failed to save graded quiz' });
  }
});

router.get('/getQuizDetails', async (req, res) => {
  console.log("Im in getting quiz details");

  const {courseId, courseName, quizId } = req.query;
  const course = courseName + " " + courseId;


  try {
      const grade = await Grades.findOne({ course: course });
      const quizData = grade.quizGrades;

      console.log("found the grade for the course");
      console.log(grade);

      if (quizData) {
          const filteredGrade = grade.quizGrades.filter(quizGrade => quizGrade.quizId == quizId);
          console.log("Got the quiz grades:", filteredGrade);
          res.json(filteredGrade);
      } else {
          res.status(404).json({ message: 'Quiz grades not found' });
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



router.post('/checkStatus', async (req, res) => {
  try {
      // Ensure proper authentication before proceeding
      const studentNumber = req.headers.studentNum;
      const assignmentId=req.query.assignmentId;
      // Query the submissions collection to check if a submission exists for the student
      const submission = await Submission.findOne({ studentNumber,assignmentId });
      console.log(submission);
      if (submission) {
          // If a submission exists for the student, send a response indicating that the student has submitted
          return res.status(200).json({ status: 'submitted' });
      }
       else {
          // If no submission exists for the student, send a response indicating that the student has not submitted
          return res.status(200).json({ status: 'missing' });
      }
  } catch (error) {
      // If an error occurs, send a 500 internal server error response
      console.error('Error checking submission status:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/getStatus', async (req, res) => {
  console.log("Retrieving status and comments");
  try {
    // Extract quizId, username, and course from the request body
    const {quizId, username, course } = req.body;
    console.log(quizId);
    // Find the student using the provided username
    const student = await User.findOne({ username });
    

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

// Find the grade document that matches the course, quizId, and studentNumber
const grade = await Grades.findOne({
  course,
  quizGrades: {
    $elemMatch: {
      quizId: quizId,
      studentNumber: student.studentNum
    }
  }
});

    // Extract status and comments
    let status = 'no';
    let comments = 'No comments from Instructor';
    let score = false;


    console.log(grade);

    // If the grade is found
    if (grade) {
  
      // Find the quiz grade for the given quizId and studentNumber
      const quizGrade = grade.quizGrades.find(quiz => quiz.quizId === quizId && quiz.studentNumber === student.studentNum);
      console.log(quizGrade);

      if (quizGrade) {
         comments = quizGrade.comments;
         score = quizGrade.grade;
         status = quizGrade.status;
      }

      console.log("comments found");
      console.log(status);
      console.log(comments);
      console.log(score);

      // Return status and comments
      return res.status(200).json({ status, comments, score });
    } else {

      // If the grade is not found
      return res.status(200).json({ status, comments, score });
    }
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    return res.status(500).json({ error: 'Failed to fetch quiz details' });
  }
});



module.exports=router;





