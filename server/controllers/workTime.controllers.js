const WorkTimeModel = require('../models/workTime.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');

const add = async (req, res) => {
    const workTime = await WorkTimeModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Added', workTime })
};

const getAll = async(req, res) => {
    const workTimes = await WorkTimeModel.find({})
    res.status(StatusCodes.OK).json({ nbHits: workTimes.length, workTimes })
};

const findById = async(req, res) => {
    const workTimeId = req.query.id;
    const workTime = await WorkTimeModel.findById(workTimeId);
    if (!workTime) {
        throw new BadRequestError(`workTime not found!`);
    }
    res.status(StatusCodes.OK).json({ workTime });
};

const findByTime = async(req, res) => {
    const time = req.query.time;
    const workTime = await WorkTimeModel.findOne({ time: time });
    if (!workTime) {
        throw new BadRequestError(`WorkTime not found!`);
    }
    res.status(StatusCodes.OK).json({ workTime });
};

const remove = async(req, res) => {
    const workTimeId = req.query.id;
    const deletedworkTime = await WorkTimeModel.findByIdAndRemove({ _id: workTimeId});

    if (!deletedworkTime) {
        throw new NotFoundError(`workTime with id ${workTimeId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'workTime deleted'})
};

const edit = async(req, res) => {
    const workTimeId = req.query.id;
    // Join request before updating
    const request = await WorkTimeModel.findByIdAndUpdate({ _id: workTimeId}, req.body);
    const updatedworkTime = await WorkTimeModel.findById(request._id);

    if (!updatedworkTime) {
        throw new NotFoundError(`Join request not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Updated', payload: updatedworkTime})
};

module.exports = { add, getAll, edit, findByTime, findById, remove }