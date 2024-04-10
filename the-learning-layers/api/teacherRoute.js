const express = require('express');
const multer = require('multer');
const router = express.Router();
const Course = require('../models/courses');
const Student = require('../models/student');
const Assignment = require('../models/assignments');
const Quiz = require('../models/quiz');
const Grades = require('../models/grades');

//when the user clicks view course, get the course details
router.get('/viewCourseTeacher', async(req,res) =>{
    try{
        const name = req.query.name;
        const courseId = req.query.courseId;
        const course = await Course.findOne({ name, courseId });

        console.log(course);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
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
    }
});
  
const upload = multer({ storage: storage });
  
// Route to create a new assignment
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

// Route to get student details by their student numbers
router.get('/viewStudents', async (req, res) => {
    const studentNumbers = req.query.studentNumbers.split(',').map(num => parseInt(num)); // Assuming studentNumbers are passed as a comma-separated string
    try {
        const students = await Student.find({ 'studentNum': { $in: studentNumbers } });
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get quizzes for a certain course from database
router.get('/quizzes', async (req, res) => {
    const { courseName, courseId } = req.query;

    try {
        // Find the course by name and ID
        const course = await Course.findOne({ name: courseName, _id: courseId });

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

// Route to get individual student grades for assignments and quizzes
router.get('/studentGrades', async (req, res) => {
    const { course } = req.query;

    try {
        const grades = await Grades.findOne({ course: course });

        if (!grades) {
            return res.status(404).json({ message: 'Grades not found for the given course' });
        }

        res.json(grades);
    } catch (error) {
        console.error('Error fetching student grades:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;