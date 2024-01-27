'use strict';

const { EventImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await EventImage.bulkCreate([
      {
        eventId: 1, // Replace with actual event IDs from Events table
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b4549eb3d0d266d008b904_Kusama_Header_cropped.png',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 1,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b4549eb3d0d266d008b904_Kusama_Header_cropped.png',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 2,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b4549d5525915bb0b12bdd_singing-competition.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 3,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b4549df05a1fe4f3c963ed_banner.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 4,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/65b4549d0f1bbf5f5a805c77_visayas-art-fair-2022-main-1669111489.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 5,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/6009b6f91bf76c8e0a73621f_soul_night_by_ellysiumn_dce49m0-350t.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 6,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/5e294d0a74cbda7c9d18f761_man-jumping-leap-over-to-success-power-abstract-world-universe-inside-your-mind-watercolor-painting-art-hand-drawn-benjavisa.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 7,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/5e295d3c6cab06d08d16b305_public%20speaking%20dwayne%20picture3.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 8,
        url: 'https://uploads-ssl.webflow.com/5d6dde2cb8496e3f669a4b75/5e29647e0ab615e29d554447_creative%20face.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "EventImages"
    await queryInterface.bulkDelete(options);
  }
};
