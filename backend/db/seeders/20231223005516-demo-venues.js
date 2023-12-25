'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 16,
        address: '123 Tech Rd',
        city: 'Techville',
        state: 'Techas',
        lat: 37.773972,
        lng: -122.431297, // Coordinates for San Francisco
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 17,
        address: '456 Innovation Ave',
        city: 'Innovate City',
        state: 'Creativia',
        lat: 34.052235,
        lng: -118.243683, // Coordinates for Los Angeles
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 16,
        address: '789 Startup Blvd',
        city: 'Entrepreneur Town',
        state: 'Founderland',
        lat: 40.712776,
        lng: -74.005974, // Coordinates for New York City
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 17,
        address: '101 Data Dr',
        city: 'Server City',
        state: 'Compute',
        lat: 47.606209,
        lng: -122.332069, // Coordinates for Seattle
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 20,
        address: '202 AI Lane',
        city: 'Robotics Village',
        state: 'Automation',
        lat: 37.774929,
        lng: -122.419416, // Coordinates for San Francisco
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues', null, {});
  }
};
