const express = require('express');
const multer = require('multer');
const router = express.Router();
const Course = require('../models/courses');
const Assignment = require('../models/assignments');

//when the user clicks view course, get the course details
router.get('/viewCourseTeacher', async(req,res) =>{
    console.log("here 1");
    try{
        console.log("here 2");
        const courseName = req.query.name;
        const courseId = req.query.courseId;
        const course = await Course.findOne({ courseName, courseId });

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
        console.log("check?");
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
  

module.exports = router;