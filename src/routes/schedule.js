const express = require('express');
const dbConnection = require('../../config/connection');
const router = express.Router();

const Schedule = require('../models/Schedule');
const scheduleController = require('../controllers/scheduleController');
const authentication = require('../../middlewares/auth');

router.post('/create', authentication, scheduleController.createSchedule)
router.get('/getall', authentication, scheduleController.getUserSchedules)

module.exports = router