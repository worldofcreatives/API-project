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
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b456c138f047fdc4b212c2_art-student-painting-1-600x400.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 2,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b456c10ad147f556dcdf97_25054.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 3,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b456c102968299fefa8908_147597_00_2x.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 4,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b456c17db264a75dca1aa9_unsplash-image-Cecb0_8Hx-o.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 5,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b456c1ce759854081a4cd0_pexels-photo-7149156.jpeg',
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
