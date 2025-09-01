const express = require('express');
const router = express.Router();
const JobPosting = require('../models/JobPosting')

router.post('/job-postings', async (req, res) => {
    try {
        const { title, department, location, type, description, requirements } = req.body;

        const jobPosting = new JobPosting({
            title,
            department,
            location,
            type,
            description,
            requirements,
        });

        await jobPosting.save();
        res.status(201).json({ message: 'Job posted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to post the job' });
    }
});

router.get('/job-postings', async (req, res) => {
    try {
        const jobPostings = await JobPosting.find(); // Fetch all job postings from the DB
        res.status(200).json(jobPostings); // Send the retrieved data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve job postings' });
    }
});

module.exports = router