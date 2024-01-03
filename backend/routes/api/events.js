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

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all events

router.get('/', async (req, res, next) => {
    try {
      const events = await Event.findAll({
        include: [
          {
            model: Group,
            attributes: ['id', 'name', 'city', 'state'],
            as: 'group'
          },
          {
            model: Venue,
            attributes: ['id', 'city', 'state'],
            as: 'venue'
          }
        ]
      });

      // You might need to calculate numAttending and previewImage or ensure they are included in the model
      const formattedEvents = events.map(event => {

        return {
          id: event.id,
          groupId: event.groupId,
          venueId: event.venueId,
          name: event.name,
          type: event.type,
          startDate: event.startDate,
          endDate: event.endDate,
          numAttending: event.numAttending, // Make sure this is calculated or included correctly
          previewImage: event.previewImage, // Make sure this is calculated or included correctly
          Group: event.Group, // This assumes Group data is included
          Venue: event.Venue // This assumes Venue data is included and can be null
        };
      });

      res.status(200).json({ Events: formattedEvents });
    } catch (err) {
      next(err);
    }
  });



module.exports = router;
