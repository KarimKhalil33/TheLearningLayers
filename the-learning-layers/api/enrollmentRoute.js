const express = require('express');
const router = express.Router();
const Course = require("../models/courses");
const User = require("../models/student");

// POST route to handle course enrollment
router.post('/pending', async (req, res) => {
    try {
        // Retrieve student number from the request body
        const studentNum = 90434176;
        // Get course ID from the request body
        const courseId = req.body.courseId;

      //  console.log(studentNum);

        // Save enrollment data to the database
        const enrollmentData = {
            studentNum: studentNum,
            studentName: "jasond",
            courseId: courseId,
            status: 'Pending', // Set initial status as 'Pending',
            enrollmentDate: Date.now(),
            title: "Introduction to Programming"
        };

        // Assuming you have an Enrollment model
        const Enrollment = require('../models/enrollment');

        console.log(enrollmentData);

        // Create a new enrollment document in the database
        await Enrollment.create(enrollmentData);

        res.status(200).json({ success: true, message: 'Enrollment successful.' });
    } catch (error) {
        console.error('Error enrolling in course:', error);

        res.status(500).json({ success: false, message: 'Internal server error.' });
        res.status(500).json({ error});
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


