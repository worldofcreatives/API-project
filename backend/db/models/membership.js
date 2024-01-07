'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User, { foreignKey: 'userId' });
      // this.belongsTo(models.Group, { foreignKey: 'groupId' });
      Membership.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Membership.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });



    }
  }
  Membership.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
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
    status: {
      type: DataTypes.ENUM('member', 'co-host', 'pending'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Membership',
    tableName: 'Memberships',
    timestamps: true
  });

  return Membership;
};
