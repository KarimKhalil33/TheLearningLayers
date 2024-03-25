const express = require('express');
const router = express.Router();
const Course = require("../models/courses");

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


