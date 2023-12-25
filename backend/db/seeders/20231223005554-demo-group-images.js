'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GroupImages', [
      {
        groupId: 16,
        url: 'image url',
        isPreview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 17,
        url: 'image url',
        isPreview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 18,
        url: 'image url',
        isPreview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 19,
        url: 'image url',
        isPreview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 20,
        url: 'image url',
        isPreview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GroupImages', null, {});
  }
};
