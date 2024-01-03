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

router.get('/:groupId/venues', requireAuth, async (req, res, next) => {
    try {
      const groupId = parseInt(req.params.groupId, 10);
      if (isNaN(groupId)) {
        return res.status(400).json({ message: "Invalid group ID" });
      }

      // Fetch the group to check if it exists and if the user is an organizer or co-host
      const group = await Group.findByPk(groupId, {
        include: {
          model: Membership,
          as: "memberships",
        }
      });
      if (!group) {
        return res.status(404).json({ message: "Group couldn't be found" });
      }

      // Check if the current user is the organizer or a co-host of the group
      const organizerId = group.organizerId;
      const userId = req.user.id;
      const isAuthorizedMember = group.memberships.some(membership =>
        membership.userId === userId &&
        (membership.role === 'organizer' || membership.role === 'co-host')
      );

      if (organizerId !== userId && !isAuthorizedMember) {
        return res.status(403).json({ message: "You must be the organizer or a co-host of the group to view venues." });
      }

      // Fetch and return all venues associated with the group
      const venues = await Venue.findAll({
        where: { groupId: groupId }
      });

      res.status(200).json({ Venues: venues });
    } catch (err) {
      next(err);
    }
  });

  module.exports = router;
