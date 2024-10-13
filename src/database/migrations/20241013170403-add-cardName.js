'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('ChargeInfo', 'cardName', {
      type: DataTypes.STRING,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ChargeInfo', 'cardName');
  }
};
