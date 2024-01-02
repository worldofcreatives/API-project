'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 1,
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 2,
        url: 'image url',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 3,
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 4,
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 5,
        url: 'image url',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GroupImages', null, {});
  }
};