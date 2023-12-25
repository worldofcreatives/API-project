'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Memberships', [
      {
        userId: 6, // Replace with actual user IDs from Users table
        groupId: 16, // Replace with actual group IDs from Groups table
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 12,
        groupId: 17,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 13,
        groupId: 16,
        role: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 14,
        groupId: 18,
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 12,
        groupId: 19,
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
