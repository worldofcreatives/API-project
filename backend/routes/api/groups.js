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

const router = express.Router();

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

module.exports = router;
