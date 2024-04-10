// Import required modules
const express = require('express');
const router = express.Router();
const OpenAIApi = require('openai');
const Grade = require('../models/grades');
const User = require("../models/student");

// Initialize the ChatGPT API client
const openai = new OpenAIApi({ apiKey: "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" });

// Endpoint to grade the quiz
router.post('/gradeQuiz', async (req, res) => {
    try {
        const { quizId, username, name, courseId, questions, answers } = req.body;
        const course = name + " " + courseId;

        // Find the document in the grades collection
        const grade = await Grade.findOne({ course });

        // Find the student
        const student = await User.findOne({ username });

        // Assuming quiz grades are stored as an array in quizGrades field
        const quizIndex = grade.quizGrades.findIndex(quiz => quiz.quizName === quizId.name);

        // Construct input prompt for ChatGPT
        let prompt = [
            {
                role: 'system',
                content: `Grade this quiz and give brief feedback. Generate the total grade representing the quiz grade out of 100. Return response in the following parsable JSON format:

        {
            "Total Grade": "grade",
            "Feedback": ""
        }`
            }
        ];

        questions.forEach((question, index) => {
            prompt.push({ role: 'user', content: `Question ${index + 1}: ${question.question}` });
            prompt.push({ role: 'user', content: `Answer: ${answers[question.question]}` });
        });

        console.log(prompt);

        // Use ChatGPT to grade the quiz
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: prompt,
            max_tokens: 1000
        });

        console.log(response.choices[0].message);

        // Extract the graded score and tips from the response
      
        const data = response.choices[0].message.content;
        

        // // Save the grade into the grade collection
        // if (quizIndex !== -1) {
        //     grade.quizGrades[quizIndex].grade = parseInt(totalGrade);
        //     grade.quizGrades[quizIndex].studentNum = student.studentNum; // Assuming studentNum is the field representing the student number in the User model
        // } else {
        //     grade.quizGrades.push({ studentNum: student.studentNum, quizName: quizId, grade: parseInt(totalGrade) });
        // }

        // await grade.save();
// Trim the data to remove quotes and curly braces
        const trimmedData = data.replace(/["{}]/g, '').trim();
        // Return the graded score and tips
        res.json(trimmedData);

    } catch (error) {
        console.error('Error grading quiz:', error);
        res.status(500).json({ error: 'Failed to grade quiz' });
    }
});

module.exports = router;
