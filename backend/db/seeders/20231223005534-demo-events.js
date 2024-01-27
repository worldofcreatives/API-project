'use strict';

const { Event } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Event.bulkCreate([
      {
        venueId: 1, // valid venue IDs
        groupId: 1, // valid group IDs
        name: 'Chromatic Convergence',
        description: 'An annual gathering where artists from around the world showcase their work that focuses on the exploration of color and its emotional impact.',
        type: 'In person',
        capacity: 500,
        price: 299.40,
        startDate: new Date(2021, 9, 10),
        endDate: new Date(2021, 9, 12),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Melody Marathon',
        description: 'A day-long music festival showcasing a lineup of up-and-coming bands and solo artists across multiple stages.',
        type: 'In person',
        capacity: 100,
        price: 0, //free event
        startDate: new Date(2021, 10, 5),
        endDate: new Date(2021, 10, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Harmonic Heights',
        description: 'A concert series held atop a city skyscraper, offering an intimate setting with acoustic performances by singer-songwriters.',
        type: 'In person',
        capacity: 100,
        price: 0, //free event
        startDate: new Date(2024, 10, 5),
        endDate: new Date(2024, 10, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Bass and Beats Bash',
        description: 'An electronic music extravaganza featuring famous DJs, laser shows, and dance parties that last until dawn.',
        type: 'In person',
        capacity: 100,
        price: 0, //free event
        startDate: new Date(2022, 10, 5),
        endDate: new Date(2022, 10, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        venueId: 2,
        groupId: 2,
        name: 'Major 7 Live',
        description: 'Come one. Come all! A music festival that celebrates the diversity of the human experience through the power of music.',
        type: 'In person',
        capacity: 100,
        price: 0, //free event
        startDate: new Date(2024, 9, 5),
        endDate: new Date(2024, 9, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        groupId: 5,
        name: 'Virtual Reality Expo',
        description: 'Explore the latest in Music VR technology.',
        type: 'Online',
        capacity: 200,
        price: 150.11,
        startDate: new Date(2021, 11, 1),
        endDate: new Date(2021, 11, 3),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        venueId: 3,
        groupId: 3,
        name: 'Rhythmic Rendezvous',
        description: 'A celebration of dance, this event features performances from various dance troupes specializing in everything from ballet to breakdance.',
        type: 'In person',
        capacity: 50,
        price: 200,
        startDate: new Date(2021, 12, 15),
        endDate: new Date(2021, 12, 17),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        venueId: 2,
        groupId: 4,
        name: 'Canvas Carnival',
        description: 'A vibrant, family-friendly festival where local artists paint live murals, and the public can participate in various interactive art installations.',
        type: 'Online',
        capacity: 30,
        price: 100,
        startDate: new Date(2022, 1, 20),
        endDate: new Date(2022, 1, 20),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Events"
    await queryInterface.bulkDelete(options);
  }
};
