const express = require("express");
const {
  Group,
  GroupImage,
  User,
  Membership,
  Venue,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Sequelize } = require("sequelize");

const { check, validationResult } = require('express-validator');

const router = express.Router();

// Define validation checks
const validateGroup = [
  check('name')
    .isLength({ max: 60 })
    .withMessage('Name must be 60 characters or less'),
  check('about')
    .isLength({ min: 50 })
    .withMessage('About must be 50 characters or more'),
  check('type')
    .isIn(['Online', 'In person'])
    .withMessage("Type must be 'Online' or 'In person'"),
  check('private')
    .isBoolean()
    .withMessage('Private must be a boolean'),
  check('city')
    .notEmpty()
    .withMessage('City is required'),
  check('state')
    .notEmpty()
    .withMessage('State is required'),
];

router.post('/', requireAuth, validateGroup, async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors.array().reduce((acc, error) => ({...acc, [error.param]: error.msg}), {})
    });
  }

  try {
    const { name, about, type, private, city, state } = req.body;
    const organizerId = req.user.id;

    const group = await Group.create({
      organizerId,
      name,
      about,
      type,
      private,
      city,
      state
    });

    res.status(201);

    return res.json(group);
  } catch (err) {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      res.status(400);
      return res.json({
        message: "Validation error",
        errors: err.errors.map(e => e.message)
      });
    }
    next(err);
  }

});

//^ Get all groups
router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: GroupImage,
          as: "groupImages",
        },
        {
          model: Membership,
          as: "memberships",
        }
      ],
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("memberships.id")),
            "numMembers",
          ],
        ],
        exclude: ["memberships"],
      },
      group: ["Group.id"],
    });

    let groupList = [];

    groups.forEach(group => {
      groupList.push(group.toJSON())
    });

    groupList.forEach(group => {
      group.groupImages.forEach( image => {
        if (image.preview === true) {
          group.previewImage  = image.url
        }
      })

      if (!group.previewImage) {
        group.previewImage = "No preview image found."
      }

      delete group.groupImages
      delete group.memberships
    })

    return res.json({"Groups": groupList});
  } catch (err) {
    next(err);
  }
});


// Route to get all groups joined or organized by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const groups = await Group.findAll({
      where: {
        [Sequelize.Op.or]: [
          { organizerId: userId }, // the user is the organizer of the group
          // OR
          { '$memberships.userId$': userId } // the user is a member of the group
        ]
      },
      include: [
        {
          model: GroupImage,
          as: "groupImages",
          attributes: ['url'],
          where: { preview: true }
        },
        {
          model: Membership,
          as: "memberships",
          attributes: []
        }
      ],
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("memberships.id")),
            "numMembers"
          ],
        ],
        exclude: ["memberships"],
      },
      group: ['Group.id', 'groupImages.id']
    });

    const groupList = groups.map(group => {
      const groupJSON = group.toJSON();
      groupJSON.previewImage = groupJSON.groupImages.length ? groupJSON.groupImages[0].url : "No preview image found.";
      delete groupJSON.groupImages;
      return groupJSON;
    });

    return res.json({ "Groups": groupList });
  } catch (err) {
    next(err);
  }
});


// Route to get details of a group by ID
router.get('/:groupId', async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(groupId)) {
      res.status(400);
      return res.json({ message: "Invalid group ID" });
    }

    const group = await Group.findByPk(groupId, {
      include: [
        {
          model: GroupImage,
          as: "groupImages",
          attributes: ["id", "url", "preview"]
        },
        {
          model: User,
          as: "organizer",
          attributes: ["id", "firstName", "lastName"]
        },
        {
          model: Venue,
          as: "venues",
          attributes: ["id", "address", "city", "state", "lat", "lng"]
        }
      ]
    });

    if (!group) {
      res.status(404);
      return res.json({ message: "Group couldn't be found" });
    }

    res.status(200);
    return res.json(group);
  } catch (err) {
    next(err);
  }
});

// Add an Image to a Group based on the Group's id

router.post('/:groupId/images', requireAuth, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupId, 10);
    const { url, preview } = req.body;
    const organizerId = req.user.id;

    // Validate groupId
    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }

    // Find the group and verify the current user is the organizer
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group couldn't be found" });
    }

    if (group.organizerId !== organizerId) {
      return res.status(403).json({ message: "You must be the organizer of the group to add images." });
    }

    // Create the new image for the group
    const image = await GroupImage.create({
      groupId,
      url,
      preview
    });

    // Construct the response object with only some fields
    const responseImage = {
      id: image.id,
      url: image.url,
      preview: image.preview
    };

    res.status(201).json(responseImage);
  } catch (err) {
    next(err);
  }
});

// Edit a group

//🚨 my error is not showing the right stuff
router.put('/:groupId', requireAuth, validateGroup, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().reduce((acc, err) => {
      acc[err.param] = err.msg;
      return acc;
    }, {});

    return res.status(400).json({
      message: "Bad Request",
      errors: formattedErrors
    });
  }

  try {
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }

    const { name, about, type, private, city, state } = req.body;
    const organizerId = req.user.id;

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group couldn't be found" });
    }

    if (group.organizerId !== organizerId) {
      return res.status(403).json({ message: "You must be the organizer of the group to edit it." });
    }

    const updatedGroup = await group.update({ name, about, type, private, city, state });

    const responseGroup = {
      id: updatedGroup.id,
      organizerId: updatedGroup.organizerId,
      name: updatedGroup.name,
      about: updatedGroup.about,
      type: updatedGroup.type,
      private: updatedGroup.private,
      city: updatedGroup.city,
      state: updatedGroup.state,
      createdAt: updatedGroup.createdAt,
      updatedAt: updatedGroup.updatedAt
    };

    res.status(200).json(responseGroup);
  } catch (err) {
    next(err);
  }
});

// Delete a group
router.delete('/:groupId', requireAuth, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupId, 10);
    if (isNaN(groupId)) {
      return res.status(400).json({ message: "Invalid group ID" });
    }

    const organizerId = req.user.id;

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group couldn't be found" });
    }

    if (group.organizerId !== organizerId) {
      return res.status(403).json({ message: "You must be the organizer of the group to delete it." });
    }

    await group.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
