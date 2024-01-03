'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venue.hasMany(models.Event, { foreignKey: 'venueId', as: 'events' });
      Venue.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });
    }
  }
  Venue.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(10, 7), // Adjust precision and scale according to your needs
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL(10, 7), // Adjust precision and scale according to your needs
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Venue',
    tableName: 'Venues',
    timestamps: true // Assuming you want Sequelize to handle `createdAt` and `updatedAt`
  });

  return Venue;
};
