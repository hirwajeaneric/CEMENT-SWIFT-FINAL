const express = require('express');
const jobRouter = express.Router();

const { findById, add, remove, edit, getAll, findBySuggestedDjId } = require('../controllers/job.controllers');

jobRouter.post('/add', add);
jobRouter.get('/list', getAll);
jobRouter.get('/findById', findById);
jobRouter.get('/findBySuggestedDjId', findBySuggestedDjId);
jobRouter.put('/update', edit);
jobRouter.delete('/delete', remove);

module.exports = jobRouter;
