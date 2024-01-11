const express = require('express');
const ratingRouter = express.Router();

const { findById, add, remove, edit, getAll, findByDjId } = require('../controllers/rating.controllers');

ratingRouter.post('/add', add);
ratingRouter.get('/list', getAll);
ratingRouter.get('/findById', findById);
ratingRouter.get('/findByDjId', findByDjId);
ratingRouter.put('/update', edit);
ratingRouter.delete('/delete', remove);

module.exports = ratingRouter;
