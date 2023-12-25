'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Group, { foreignKey: 'groupId' });
      GroupImage.belongsTo(models.Group, { foreignKey: 'groupId' });

    }
  }
  GroupImage.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPreview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false // Assume by default the image is not a preview image
    }
  }, {
    sequelize,
    modelName: 'GroupImage',
    tableName: 'GroupImages',
    timestamps: true // Assuming you want Sequelize to handle `createdAt` and `updatedAt`
  });

  return GroupImage;
};
