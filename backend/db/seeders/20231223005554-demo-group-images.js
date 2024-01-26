'use strict';

const { GroupImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await GroupImage.bulkCreate([
      {
        groupId: 1,
        url: 'https://media.istockphoto.com/id/1368965646/photo/multi-ethnic-guys-and-girls-taking-selfie-outdoors-with-backlight-happy-life-style-friendship.jpg?s=612x612&w=0&k=20&c=qYST1TAGoQGV_QnB_vMd4E8jdaQUUo95Sa2JaKSl_-4=',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 2,
        url: 'https://as2.ftcdn.net/v2/jpg/05/06/75/11/1000_F_506751155_fJ5Ko5T0wsTH7Q9VNwEgo6J81da8arlD.jpg',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 3,
        url: 'https://cdn.aarp.net/content/dam/aarp/about_aarp/aarp_policies/2020/1140-large-group-of-people.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 4,
        url: 'https://www.cdc.gov/tobacco/campaign/tips/groups/social-media-images/groups-TW-600x321.jpg?_=82358',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 5,
        url: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?cs=srgb&dl=pexels-fauxels-3184398.jpg&fm=jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "GroupImages"
    await queryInterface.bulkDelete(options);
  }
};
