const express = require('express');
const jobPictureRouter = express.Router();

const { findById, getAll, add, attachFile, edit, remove, upload, findByDjId, findByJobId } = require('../controllers/jobPicture.controllers');

jobPictureRouter.post('/add', upload.single('picture'), attachFile, add);
jobPictureRouter.get('/list', getAll);
jobPictureRouter.get('/findById', findById);
jobPictureRouter.put('/update', edit);
jobPictureRouter.delete('/delete', remove);
jobPictureRouter.get('/findByJobId', findByJobId);
jobPictureRouter.get('/findByDjId', findByDjId);

module.exports = jobPictureRouter;