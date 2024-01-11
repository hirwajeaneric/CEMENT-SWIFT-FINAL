const RatingModel = require('../models/rating.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/index');

const add = async (req, res) => {
    const rating = await RatingModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ message: 'Submitted', rating })
};

const getAll = async(req, res) => {
    const ratings = await RatingModel.find({})
    res.status(StatusCodes.OK).json({ nbHits: ratings.length, ratings })
};

const findById = async(req, res) => {
    const ratingId = req.query.id;
    const rating = await RatingModel.findById(ratingId);
    if (!rating) {
        throw new BadRequestError(`Rating not found!`);
    }
    res.status(StatusCodes.OK).json({ rating });
};

const findByDjId = async(req, res) => {
    const foundRatings = await RatingModel.find({djId : req.query.djId });
    if (!foundRatings) {
        throw new BadRequestError(`Rating not found!`);
    }
    res.status(StatusCodes.OK).json({ ratings: foundRatings });
};

const remove = async(req, res) => {
    const ratingId = req.query.id;
    const deletedRating = await RatingModel.findByIdAndRemove({ _id: ratingId});

    if (!deletedRating) {
        throw new NotFoundError(`Rating with id ${ratingId} not found!`);
    }

    res.status(StatusCodes.OK).json({ message: 'Rating deleted'})
};

const edit = async(req, res) => {
    const ratingId = req.query.id;
    var rating = await RatingModel.findByIdAndUpdate(ratingId, req.body);
    if (!rating) {
        throw new NotFoundError(`Rating not found!`);
    }
    var updatedRating = await RatingModel.findById(rating._id);
    res.status(StatusCodes.OK).json({ message: 'Rating updated', updatedRating })
};

module.exports = { add, getAll, edit, findById, findByDjId, remove };
