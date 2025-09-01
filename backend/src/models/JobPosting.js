const mongoose = require('mongoose');

const JobPostingSchema = mongoose.model('JobPosting', {
    title: String,
    department: String,
    location: String,
    type: String,
    description: String,
    requirements: String,
  });


const JobPosting = mongoose.model('JobPosting', )
module.exports = JobPosting