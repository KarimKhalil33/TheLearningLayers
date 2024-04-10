const express = require('express');
const router = express.Router();
const Course = require("../models/courses");
const User = require("../models/student");
const Enrollments = require('../models/enrollments');


// Route to fetch enrollments for a specific student
router.post('/courses', async (req, res) => {
    console.log("im in the enrolled course retrival function");
    try {
        //get username from front end
        const { username } = req.body;

        //find student in database
        const student = await User.findOne({username});
        const studentNum = student.studentNum;
        console.log(student);

        // Fetch enrollments for the student based on student Num
        const enrollments = await Enrollments.find({studentNum , status: 'Approved' });

        res.status(200).json(enrollments);

    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to fetch courses student can enroll in for a specific student
router.post('/available', async (req, res) => {
    try {

        console.log("im in the available enrollment course retrival function");
        // Get username from the query parameters
        const username = req.body.username;
        console.log(username);

        // Find the student in the database
        const student = await User.findOne({username});


        console.log(student);
        const studentNum = student.studentNum;


        console.log(studentNum);

        // Fetch current enrollments for the student
        const currentEnrollments = await Enrollments.find({studentNum});

        console.log('Current Enrollments:', currentEnrollments);

        // Get courses the student isn't enrolled in
        const allCourses = await Course.find({}); // Assuming you have a Course model

        const availableEnrollments = allCourses.filter(course => {
            return !currentEnrollments.some(enrollment => enrollment.courseId == (course.courseId));
        });

        res.json(availableEnrollments);

    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});





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
        const {studentNum , title} = req.body;

        console.log(title);
        console.log(studentNum);

   // Find the course by title and update its student array
   const course = await Course.findOne({title: title });
   course.students.push(studentNum);

        console.log("course student array attempt");

        // Save the course with the updated students array
        await course.save();

        console.log("course saved");

        // Find the enrollment by key
        let enrollment = await Enrollments.findOne({studentNum, title});

        console.log("enrollment trace found");


        // If enrollment object exists, update its status to 'Approved'
        if (enrollment) {
            enrollment.status = 'Approved';
            // Save the enrollment object
            await enrollment.save();
            console.log("enrollment saved");
            

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
             // Retrieve data from body
             const {id,studentNum, title} = req.body;
             console.log(id);
             console.log(title);
             console.log(studentNum);
   
        // Find and delete the enrollment 
        const enrollment = await Enrollments.findOne({studentNum, title});
        

        console.log("Enrollment found");
        console.log(enrollment);

        // If enrollment object exists, update its status to 'Rejected'
        if (enrollment) {
            // Update status to 'Rejected'
            enrollment.status = 'Rejected';
            await enrollment.save();
            console.log("Status changed");

            await Enrollments.findOneAndDelete({ _id: enrollment._id});
            console.log("Enrollment deleted ");
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

