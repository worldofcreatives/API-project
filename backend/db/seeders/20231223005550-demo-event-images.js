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
        url: 'https://groupgordon.com/wp-content/uploads/2022/04/Messe_Luzern_Corporate_Event.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 1,
        url: 'https://media.istockphoto.com/id/974238866/photo/audience-listens-to-the-lecturer-at-the-conference.jpg?s=612x612&w=0&k=20&c=p_BQCJWRQQtZYnQlOtZMzTjeB_csic8OofTCAKLwT0M=',
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 2,
        url: 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 3,
        url: 'https://images.inc.com/uploaded_files/image/1920x1080/getty_479977238_253066.jpg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 4,
        url: 'https://www.mlm.com/wp-content/uploads/2014/01/52b3ac4c618e8.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 5,
        url: 'https://www.mlm.com/wp-content/uploads/2014/01/52b3ac4c618e8.jpeg',
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        eventId: 6,
        url: 'https://www.mlm.com/wp-content/uploads/2014/01/52b3ac4c618e8.jpeg',
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
