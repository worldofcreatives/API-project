'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EventImages', [
      {
        eventId: 1, // Replace with actual event IDs from Events table
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 1,
        url: 'image url',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 2,
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 3,
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 4,
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EventImages', null, {});
  }
};