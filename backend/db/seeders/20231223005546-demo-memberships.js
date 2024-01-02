'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Memberships', [
      {
        userId: 1, // Replace with actual user IDs from Users table
        groupId: 1, // Replace with actual group IDs from Groups table
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        groupId: 2,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        groupId: 2,
        role: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        groupId: 3,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        groupId: 3,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Memberships', null, {});
  }
};
