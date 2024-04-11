const express = require('express');
const multer = require('multer');
const router = express.Router();
const Course = require('../models/courses');
const Student = require('../models/student');
const Assignment = require('../models/assignments');
const Quiz = require('../models/quiz');
const Grades = require('../models/grades');
const Submission=require('../models/submissions');


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
    const filepath = req.file.path;
  
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
    console.log("We are looking for quizzes for thsi course");

    const { courseId, courseName } = req.query;

    try {
        // Find the course by name and ID
        const course = await Course.findOne({ name: courseName, courseId: courseId });
        console.log(course);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Find all quizzes associated with the courseId
        const quizzes = await Quiz.find({courseId : course._id });

        
        console.log(quizzes);
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

router.post('/quizzes', async (req, res) => {
    console.log("Trying to save a new quiz");
    try {
        const { name, courseName, courseId, questions } = req.body;

        console.log(name);
        console.log(courseId);


          // Find the course by name and ID
          const course = await Course.findOne({ name: courseName, courseId: courseId });

          console.log(course);
          console.log(course._id);
        console.log(questions);

        // Create a new quiz object
        const newQuiz = new Quiz({
            name: name,
            courseId: course._id,
            questions: questions
        });

        console.log("quiz created");

        // Save the quiz to the database
        const savedQuiz = await newQuiz.save();
        console.log("quiz saved");

        // Respond with the saved quiz object
        res.status(201).json(savedQuiz);

    } catch (error) {
        console.error('Error adding quiz:', error);
        res.status(500).json({ error: 'Failed to add quiz' });
    }
});


router.post('/delete', async (req, res) => {
    console.log("I'm in the quiz deletion function");
    try {
             // Retrieve data from body
             const {id} = req.body;
   
        // Find and delete the enrollment 
         await Quiz.findOneAndDelete({_id: id});

        res.status(200).json({ message: 'Enrollment rejected successfully' });
    } catch (error) {
        console.error('Error rejecting enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/getAssignmentDetails',async(req,res)=>{
    try{
         var assignmentName="";
         const assignmentId=req.query.assignmentId;
         const assignment=await Assignment.findOne({_id:assignmentId});
         if(assignment){
              assignmentName=assignment.name;
         }
         res.json(assignmentName);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.get('/getSubmissions',async(req,res)=>{
    try{
        const assignmentId=req.query.assignmentId;
        const submissions=await Submission.findOne({assignmentId});
        res.json(submissions.submissions);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/storeGrades', async (req, res) => {
    try {
        const { courseName,assignmentName, studentGrades } = req.body;

        // Find the document for the assignment
        let assignment = await Grades.findOne({ 'assignmentGrades.assignmentName': assignmentName });

        // If the assignment exists, update the grades for each student
        if (assignment) {
            studentGrades.forEach(async (studentGrade) => {
                // Find the index of the student in the assignmentGrades array
                const index = assignment.assignmentGrades.findIndex((grade) => grade.assignmentName === assignmentName && grade.studentNum === studentGrade.studentNum);
                
                // If the student is already graded for this assignment, update the grade and comment
                if (index !== -1) {
                    assignment.assignmentGrades[index].grade = studentGrade.grade;
                    assignment.assignmentGrades[index].status = 'graded';
                    assignment.assignmentGrades[index].comment = studentGrade.comment; // Update the comment
                } else {
                    // If the student is not graded for this assignment, add a new grade
                    assignment.assignmentGrades.push({
                        assignmentName: assignmentName,
                        studentNum: studentGrade.studentNum,
                        grade: studentGrade.grade,
                        status: 'graded',
                        comment: studentGrade.comment // Add the comment
                    });
                }
            });

            // Save the updated assignment document
            await assignment.save();
        } else {
            // If the assignment does not exist, create a new document
            const newAssignment = new Grades({
                course: courseName,
                assignmentGrades: studentGrades.map((studentGrade) => ({
                    assignmentName: assignmentName,
                    studentNum: studentGrade.studentNum,
                    grade: studentGrade.grade,
                    status: 'graded',
                    comment: studentGrade.comment // Add the comment
                }))
            });

            // Save the new assignment document
            await newAssignment.save();
        }
        
        res.status(200).json({ message: 'Grades stored successfully' });
    } catch (error) {
        console.error('Error storing grades:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;