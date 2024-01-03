'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Memberships', [
      {
        userId: 1,
        groupId: 1,
        status: 'co-host',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        groupId: 2,
        status: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        groupId: 2,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        groupId: 3,
        status: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        groupId: 3,
        status: 'co-host',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Memberships', null, {});
  }
};
