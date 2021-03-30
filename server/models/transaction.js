'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User,{foreignKey: 'userId'});
      Transaction.hasMany(models.Order, {
        as: 'orders'
      });
    }
  };
  Transaction.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.INTEGER,
    partnerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};