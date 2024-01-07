'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, { foreignKey: 'organizerId' });
      Group.hasMany(models.Event, { foreignKey: 'groupId', as: 'events', onDelete: 'CASCADE' });
      Group.belongsTo(models.User, { foreignKey: 'organizerId', as: 'organizer' });
      Group.hasMany(models.Membership, { foreignKey: 'groupId', as: 'memberships', onDelete: 'CASCADE' });
      Group.hasMany(models.Venue, { foreignKey: 'groupId', as: 'venues', onDelete: 'CASCADE' });
      Group.hasMany(models.GroupImage, { foreignKey: 'groupId', as: 'groupImages', onDelete: 'CASCADE' });
    }
  }

  Group.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('In person', 'Online'),
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'Groups',
    timestamps: true,
  });

  return Group;
};
