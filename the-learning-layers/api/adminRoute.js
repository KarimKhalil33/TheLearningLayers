const express = require('express');
const router = express.Router();
const Course = require('../models/courses');
const Teacher = require('../models/teacher'); // Import the Teacher model



// New route to fetch teachers
router.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        // Map the teacher data to include a full name field
        const teacherNames = teachers.map(teacher => ({
            name: `${teacher.firstName} ${teacher.lastName}`,
            username: teacher.username // Include the username if needed for identification
        }));
        res.json(teacherNames);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a course
router.delete('/delete', async (req, res) => {
  
    const courseId = req.body.courseId; // Accessing courseId from the request body
    
    console.log(courseId);
    try {
       
        // Delete the course from the database
        await Course.deleteOne({ _id: courseId });
        console.log("courses sucesfuly found and deleted");

        // Send a success response
        res.status(200).json({ success: true, message: 'Course deleted successfully.' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting course:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//when the user clicks view course, get the course details
router.get('/viewCoursesAdmin', async(req,res) =>{
    try{
        const name = req.query.name;
        const courseId = req.query.courseId;
        const course = await Course.findOne({ name, courseId });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    }
    catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
});

//when the user clicks view course, get the course details
router.get('/viewCourseStudent', async(req,res) =>{
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

module.exports = router;

