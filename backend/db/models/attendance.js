'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, { foreignKey: 'userId' });
      // this.belongsTo(models.Event, { foreignKey: 'eventId' });
      Attendance.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
      Attendance.belongsTo(models.User, { foreignKey: 'userId',  as: 'user' });


    }
  }

  Attendance.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Event',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'), // Adjust as per your specific use case
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'Attendances',
    timestamps: true // Assuming you want Sequelize to handle `createdAt` and `updatedAt`
  });

  return Attendance;
};
