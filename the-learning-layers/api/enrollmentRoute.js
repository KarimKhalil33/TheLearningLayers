const express = require('express');
const router = express.Router();
const Course = require("../models/courses");
const User = require("../models/student");
const Enrollments = require('../models/enrollments');

// POST route to handle course enrollment
router.post('/pending', async (req, res) => {
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
        await Enrollments.create(enrollmentData);

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
        const enrollments = await Enrollments.find({ status: 'Pending' });

        // Send the fetched enrollments as a response
        res.status(200).json(enrollments);
    } catch (error) {
        console.error('Error fetching pending enrollments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//accept an enrollment
router.post('/accept', async (req, res) => {
    console.log("i'm in");
    try {
        const { key, title, studentNum } = req.body;

        console.log(title);
        console.log(key);
        console.log(studentNum);

        // Find the course by title and update it student array
       const course = await Course.findOneAndUpdate(
            { title },
            { $addToSet: { students: studentNum } },
            { new: true }
        );

        console.log("course student array attempt");

        // Save the course with the updated students array
        await course.save();

        console.log("course saved");

        // Find the enrollment by key
        let enrollment = await Enrollments.findOne({_id: key});

        console.log("enrollment trace found");


        // If enrollment object exists, update its status to 'Approved'
        if (enrollment) {
            enrollment.status = 'Approved';
            // Save the enrollment object
            await enrollment.save();
        } else {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.status(200).json({ message: 'Enrollment accepted successfully' });
    } catch (error) {
        console.error('Error accepting enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post('/reject', async (req, res) => {
    console.log("I'm in the rejection function");
    try {
        const {key } = req.body;

        // Find the enrollment by key
        const enrollment = await Enrollments.findOne({ _id: key });

        // If enrollment object exists, update its status to 'Rejected'
        if (enrollment) {
            enrollment.status = 'Rejected';
            // Save the enrollment object
            await enrollment.save();
        } else {
            return res.status(404).json({ error: 'Enrollment not found' });
        }

        res.status(200).json({ message: 'Enrollment rejected successfully' });
    } catch (error) {
        console.error('Error rejecting enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;


