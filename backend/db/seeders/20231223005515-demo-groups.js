'use strict';

const { Group } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Group.bulkCreate([
      {
        organizerId: 1,
        name: 'Palette Pioneers',
        about: 'A collective of artists who experiment with unconventional materials and techniques to create thought-provoking pieces.',
        type: 'In person',
        private: false,
        city: 'San Francisco',
        state: 'CA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizerId: 1,
        name: 'Strings Synergy',
        about: 'A quartet that combines classical string instruments with modern music genres to create a unique fusion sound.',
        type: 'Online',
        private: false,
        city: 'New York',
        state: 'NY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizerId: 1,
        name: 'The Gravity Defiers',
        about: 'A dance troupe known for their high-energy, acrobatic performances that blend street dance with contemporary.',
        type: 'In person',
        private: true,
        city: 'Chicago',
        state: 'IL',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizerId: 2,
        name: 'The Bronze Guild',
        about: 'A group of sculptors dedicated to reviving classical bronze casting methods to produce statues that celebrate historical narratives.',
        type: 'In person',
        private: false,
        city: 'Los Angeles',
        state: 'CA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        organizerId: 3,
        name: 'Echoes of Electronica',
        about: 'A band that pushes the boundaries of electronic music, known for their immersive live shows that incorporate virtual reality experiences.',
        type: 'Online',
        private: false,
        city: 'Seattle',
        state: 'WA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Groups"
    await queryInterface.bulkDelete(options);
  }
};
