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

// Validation middleware for creating an event image
const validateEventImage = [
  check('url').notEmpty().withMessage('Image URL is required.'),
  check('preview').isBoolean().withMessage('Preview must be a boolean.'),
  handleValidationErrors
];

// Validation middleware for editing an event
const validateEventEditing = [
  check('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters'),
  check('type').isIn(['Online', 'In person']).withMessage('Type must be Online or In person'),
  check('capacity').isInt().withMessage('Capacity must be an integer'),
  check('price').isFloat().withMessage('Price is invalid'),
  check('description').notEmpty().withMessage('Description is required'),
  check('startDate').isISO8601().withMessage('Start date must be in the future'),
  check('endDate').isISO8601().withMessage('End date is less than start date'),
  handleValidationErrors
];

// Get all events

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: Group,
          as: 'group',
          attributes: ['id', 'name', 'city', 'state']
        },
        {
          model: Venue,
          as: 'venue',
          attributes: ['id', 'city', 'state']
        },
        {
          model: Attendance,
          as: 'attendances',
          attributes: []
        },
        {
          model: EventImage,
          as: 'eventImages',
          attributes: []
        }
      ],
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("attendances.id")),
            "numAttending"
          ],
        ],
        exclude: ["attendances"]
      },
      group: ["Event.id", "group.id", "venue.id"]
    });

    // Process each event to add previewImage
    const formattedEvents = events.map(event => {
      let previewImage = "No preview image found.";
      // Check if eventImages is defined and is an array before calling forEach
      if (Array.isArray(event.eventImages)) {
        event.eventImages.forEach(image => {
          if (image.preview === true) {
            previewImage = image.url;
          }
        });
      }

      return {
        id: event.id,
        groupId: event.groupId,
        venueId: event.venueId,
        name: event.name,
        type: event.type,
        startDate: event.startDate,
        endDate: event.endDate,
        numAttending: event.dataValues.numAttending,
        previewImage,
        Group: event.group,
        Venue: event.venue
      };
    });

    res.status(200).json({ Events: formattedEvents });
  } catch (err) {
    next(err);
  }
});

// Add an image to an event
router.post('/:eventId/images', requireAuth, validateEventImage, async (req, res, next) => {
  const eventId = parseInt(req.params.eventId, 10);
  const { url, preview } = req.body;
  const userId = req.user.id; // Assuming you're storing the user's ID on the request object

  try {
    // Find the event and group associated with it
    const event = await Event.findByPk(eventId, { include: { model: Group, as: 'group' } });
    if (!event) {
      return res.status(404).json({ message: "Event couldn't be found" });
    }

    const groupId = event.group.id;

    // Check if the user is attending the event
    const attendance = await Attendance.findOne({
      where: { eventId, userId, status: 'attending' }
    });

    // Check if the user is a co-host or organizer of the group
    const membership = await Membership.findOne({
      where: { groupId, userId, status: ['co-host', 'member'] }
    });

    const isOrganizer = event.group.organizerId === userId;

    // User must be an attendee, co-host, or the organizer of the group
    if (!attendance && !membership && !isOrganizer) {
      return res.status(403).json({ message: "You must be an attendee, host, or co-host to add images." });
    }

    // Create the event image
    const image = await EventImage.create({ eventId, url, preview });

    // Respond with the new image details
    res.status(200).json({
      id: image.id,
      url: image.url,
      preview: image.preview
    });

  } catch (err) {
    next(err);
  }
});


// Edit an event
router.put('/:eventId', requireAuth, validateEventEditing, async (req, res, next) => {
  const eventId = parseInt(req.params.eventId, 10);
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
  const userId = req.user.id; // Assuming you're storing the user's ID on the request object

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Bad Request", errors: errors.array() });
  }

  try {
    // Find the event and its related group
    const event = await Event.findByPk(eventId, { include: { model: Group, as: 'group' } });
    if (!event) {
      return res.status(404).json({ message: "Event couldn't be found" });
    }

    const groupId = event.group.id;
    const group = await Group.findByPk(groupId);

    // Authorization check: current user must be the organizer of the group or a co-host
    const isOrganizer = group && group.organizerId === userId;
    const membership = await Membership.findOne({
      where: { groupId, userId, status: 'co-host' }
    });
    if (!isOrganizer && !membership) {
      return res.status(403).json({ message: "You must be the organizer or a co-host to edit the event." });
    }

    // Check if the venue exists if venueId is provided
    if (venueId) {
      const venue = await Venue.findByPk(venueId);
      if (!venue) {
        return res.status(404).json({ message: "Venue couldn't be found" });
      }
    }

    // Update the event
    await event.update({ venueId, name, type, capacity, price, description, startDate, endDate });

    // Respond with selected updated event details
    const responseEvent = {
      id: event.id,
      venueId: event.venueId,
      groupId: event.groupId,
      name: event.name,
      description: event.description,
      type: event.type,
      capacity: event.capacity,
      price: event.price,
      startDate: event.startDate,
      endDate: event.endDate
    };

    res.status(200).json(responseEvent);
  } catch (err) {
    next(err);
  }
});

// Delete an event
router.delete('/:eventId', requireAuth, async (req, res, next) => {
  const eventId = parseInt(req.params.eventId, 10);
  const userId = req.user.id; // Assuming you're storing the user's ID on the request object

  try {
    // Find the event and its related group
    const event = await Event.findByPk(eventId, { include: { model: Group, as: 'group' } });
    if (!event) {
      return res.status(404).json({ message: "Event couldn't be found" });
    }

    const groupId = event.group.id;
    const group = await Group.findByPk(groupId);

    // Authorization check: current user must be the organizer of the group or a co-host
    const isOrganizer = group && group.organizerId === userId;
    const membership = await Membership.findOne({
      where: { groupId, userId, status: 'co-host' }
    });
    if (!isOrganizer && !membership) {
      return res.status(403).json({ message: "You must be the organizer or a co-host to delete the event." });
    }

    // Delete the event
    await event.destroy();

    // Respond with confirmation message
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    next(err);
  }
});

// Get all Attendees of an Event specified by its id

router.get('/:eventId/attendees', async (req, res, next) => {
  try {
      const eventId = parseInt(req.params.eventId, 10);
      if (isNaN(eventId)) {
          return res.status(400).json({ message: "Invalid event ID" });
      }

      // Fetch the event with corrected alias
      const event = await Event.findByPk(eventId, {
          include: [{
              model: Attendance,
              as: 'attendances',
              include: [{
                  model: User,
                  as: 'user',
                  attributes: ['id', 'firstName', 'lastName'],
              }]
          }]
      });

      if (!event) {
          return res.status(404).json({ message: "Event couldn't be found" });
      }

      // Ensure attendances data exists before tryna map it
      const attendees = event.attendances ? event.attendances.map(att => {
          const { id, firstName, lastName } = att.user;
          return {
              id,
              firstName,
              lastName,
              Attendance: {
                  status: att.status
              }
          };
      }) : [];

      res.status(200).json({ Attendees: attendees });
  } catch (err) {
      next(err);
  }
});

// Request to Attend an Event based on the Event's id

router.post('/:eventId/attendance', requireAuth, async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.eventId, 10);
        const userId = req.user.id;

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event couldn't be found" });
        }

        const membership = await Membership.findOne({
            where: { groupId: event.groupId, userId: userId }
        });
        if (!membership) {
            return res.status(403).json({ message: "You must be a member of the group to request attendance" });
        }

        const existingAttendance = await Attendance.findOne({
            where: { eventId: eventId, userId: userId }
        });
        if (existingAttendance) {
            if (existingAttendance.status === 'pending') {
                return res.status(400).json({ message: "Attendance has already been requested" });
            }
            return res.status(400).json({ message: "User is already an attendee of the event" });
        }

        const newAttendance = await Attendance.create({
            eventId: eventId,
            userId: userId,
            status: 'pending'
        });

        res.status(200).json({
            userId: newAttendance.userId,
            status: newAttendance.status
        });
    } catch (err) {
        next(err);
    }
});

// Change the status of an attendance for an event specified by id

router.put('/:eventId/attendance', requireAuth, async (req, res, next) => {
  try {
      const eventId = parseInt(req.params.eventId, 10);
      const { userId, status } = req.body;
      const currentUserId = req.user.id;

      const event = await Event.findByPk(eventId);
      if (!event) {
          return res.status(404).json({ message: "Event couldn't be found" });
      }

      const userToUpdate = await User.findByPk(userId);
      if (!userToUpdate) {
          return res.status(404).json({ message: "User couldn't be found" });
      }

      const group = await Group.findByPk(event.groupId);
      const isOrganizer = group && group.organizerId === currentUserId;
      const isCoHost = await Membership.findOne({
          where: { userId: currentUserId, groupId: group.id, status: 'co-host' }
      });

      if (!isOrganizer && !isCoHost) {
          return res.status(403).json({ message: "You must be the organizer or a co-host to change attendance status." });
      }

      if (status === "pending") {
          return res.status(400).json({ message: "Cannot change an attendance status to pending" });
      }

      const attendance = await Attendance.findOne({
          where: { eventId: eventId, userId: userId }
      });

      if (!attendance) {
          return res.status(404).json({ message: "Attendance between the user and the event does not exist" });
      }

      await attendance.update({ status });

      res.status(200).json({
          id: attendance.id,
          eventId: attendance.eventId,
          userId: attendance.userId,
          status: attendance.status
      });
  } catch (err) {
      next(err);
  }
});

// Delete an Event specified by its ID

router.delete('/:eventId/attendance/:userId', requireAuth, async (req, res, next) => {
    try {
        const eventId = parseInt(req.params.eventId, 10);
        const targetUserId = parseInt(req.params.userId, 10);
        const currentUserId = req.user.id;

        // Check if event exists
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event couldn't be found" });
        }

        // Check if the user to be deleted exists
        const user = await User.findByPk(targetUserId);
        if (!user) {
            return res.status(404).json({ message: "User couldn't be found" });
        }

        // Authorization check: current user must be the organizer or the target user
        const group = await Group.findByPk(event.groupId);
        const isOrganizer = group && group.organizerId === currentUserId;
        if (!isOrganizer && currentUserId !== targetUserId) {
            return res.status(403).json({ message: "Insufficient permissions to delete attendance" });
        }

        // Find and delete the attendance
        const attendance = await Attendance.findOne({
            where: { eventId: eventId, userId: targetUserId }
        });

        if (!attendance) {
            return res.status(404).json({ message: "Attendance does not exist for this User" });
        }

        await attendance.destroy();

        res.status(200).json({ message: "Successfully deleted attendance from event" });
    } catch (err) {
        next(err);
    }
});


module.exports = router;
