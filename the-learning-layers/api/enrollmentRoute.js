const express = require('express');
const router = express.Router();
const Course = require("../models/courses");
const User = require("../models/student");
const Enrollment = require('../models/enrollment');

// POST route to handle course enrollment
router.post('/pending', async (req, res) => {
    console.log("Im in");
    try {
  

        // Retrieve data from the request body
        const {username, courseId, courseName , title } = req.body;

        //get student info from authId/username
        const student = await User.findOne({ username });

        // Set initial status as 'Pending'
        const status = 'Pending';

        // Create enrollment data object
        const enrollmentData = {
            studentNum: student.studentNum,
            studentfisrtName: student.firstName,
            studentlastName: student.lastName,
            courseId: courseId,
            name : courseName,
            status: status,
            enrollmentDate: new Date(),
            title: title
        };

        console.log(enrollmentData);

        // Create a new enrollment document in the enrollment collection
        await Enrollment.create(enrollmentData);
        
        // Send success response
        res.status(200).json({ success: true, message: 'Enrollment successful.' });
    } catch (error) {
        // Handle errors
        console.error('Error enrolling in course:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


router.get('/pending', async (req, res) => {
    try {
        // Query the database for pending enrollments
        const enrollments = await Enrollment.find({ status: 'Pending' });

        // Send the fetched enrollments as a response
        res.status(200).json(enrollments);
    } catch (error) {
        console.error('Error fetching pending enrollments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/accept', async (req, res) => {
    try {
        const {title, studentNum } = req.body;

        // Find the course by title
        const course = await Course.findOne({ title });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the student is already enrolled in the course
        if (course.students.includes(studentNum)) {
            return res.status(400).json({ error: 'Student is already enrolled in the course' });
        }

        // Add the student to the course's students array
        course.students.push(studentNum);
        await course.save();

        res.status(200).json({ message: 'Enrollment accepted successfully' });
    } catch (error) {
        console.error('Error accepting enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


