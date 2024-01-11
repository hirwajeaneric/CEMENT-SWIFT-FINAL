const express = require('express');
const router = express.Router();

const user = require('./user.routes');
const job = require('./job.routes');
const rating = require('./rating.routes');
const workTime = require('./workTimes.routes');
const email = require('./email.routes');
const jobPictures = require('./jobPicture.routes');

router.use('/profile', express.static('./profiles'));
router.use('/pictures', express.static('./pictures'));

router.use('/email', email);
router.use('/user', user);
router.use('/job', job);
router.use('/rating', rating);
router.use('/workTime', workTime);
router.use('/email', email);
router.use('/jobPictures', jobPictures);

module.exports = router;