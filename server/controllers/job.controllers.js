const JobModel = require('../models/job.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');

const add = async (req, res) => {
    const job = await JobModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Booking Created', job })
};

const getAll = async(req, res) => {
    const jobs = await JobModel.find({})
    res.status(StatusCodes.OK).json({ nbHits: jobs.length, jobs })
};

const findById = async(req, res) => {
    const jobId = req.query.id;
    const job = await JobModel.findById(jobId);
    if (!job) {
        throw new BadRequestError(`Job not found!`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const findBySuggestedDjId = async(req, res) => {
    const suggestedDjId = req.query.suggestedDjId;
    const foundJobs = await JobModel.find({suggestedDjId : suggestedDjId});
    const jobs = foundJobs.filter(job => job.status === 'Confirmed');
    if (!jobs) {
        throw new BadRequestError(`Job not found!`);
    }
    res.status(StatusCodes.OK).json({ jobs });
};

const remove = async(req, res) => {
    const jobId = req.query.id;
    const deletedJob = await JobModel.findByIdAndRemove({ _id: jobId});

    if (!deletedJob) {
        throw new NotFoundError(`Job with id ${jobId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Job deleted'})
};

const edit = async(req, res) => {
    const jobId = req.query.id;
    var job = await JobModel.findByIdAndUpdate(jobId, req.body);
    if (!job) {
        throw new NotFoundError(`Job not found!`);
    }
    var updatedJob = await JobModel.findById(job._id);
    res.status(StatusCodes.OK).json({ message: 'Job updated', updatedJob })
};

module.exports = { add, getAll, edit, findById, findBySuggestedDjId, remove };
