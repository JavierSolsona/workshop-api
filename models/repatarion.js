'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repatarion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Repatarion.belongsTo(models.Car)
    }
  };
  Repatarion.init({
    date: {
      allowNull: false,
      type: Sequelize.DATEONLY
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
    }
  }, {
    sequelize,
    modelName: 'Repatarion',
  });
  return Repatarion;
};