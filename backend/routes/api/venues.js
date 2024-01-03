const express = require("express");
const {
    Group,
    GroupImage,
    User,
    Membership,
    Venue,
    Attendance,
    Event,
    EventImage
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Sequelize } = require("sequelize");

const router = express.Router();

// Get All Venues for a Group specified by its id



  module.exports = router;
