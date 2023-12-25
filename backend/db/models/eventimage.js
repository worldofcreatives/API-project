'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Event, { foreignKey: 'eventId' });
      EventImage.belongsTo(models.Event, { foreignKey: 'eventId' });

    }
  }

  EventImage.init({
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
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EventImage',
    tableName: 'EventImages',
    timestamps: true // Assuming you want Sequelize to handle `createdAt` and `updatedAt`
  });

  return EventImage;
};
