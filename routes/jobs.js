const express = require("express");
const route = express.Router();

const { getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs')

route.route('/').get(getAllJobs).post(createJob)
route.route('/:id').get(getJob).patch(updateJob).delete(deleteJob)

module.exports = route