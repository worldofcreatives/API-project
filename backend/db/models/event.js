'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Group, { foreignKey: 'groupId' });
      // this.belongsTo(models.Venue, { foreignKey: 'venueId' });
      // this.hasMany(models.Attendance, { foreignKey: 'eventId' });
      Event.hasMany(models.EventImage, { foreignKey: 'eventId', as: 'eventImages', onDelete: 'CASCADE' });
      Event.hasMany(models.Attendance, { foreignKey: 'eventId', as: 'attendances', onDelete: 'CASCADE' });
      Event.belongsTo(models.Venue, { foreignKey: 'venueId', as: 'venue' });
      Event.belongsTo(models.Group, { foreignKey: 'groupId', as:'group'});

    }
  }
  Event.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Venue',
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('In person', 'Online'), // Adjust as per your specific use case
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'Events',
    timestamps: true // Assuming you want Sequelize to handle `createdAt` and `updatedAt`
  });

  return Event;
};
