'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('ChargeInfo', 'tokenCard', {
      type: DataTypes.STRING,
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('ChargeInfo', 'tokenCard');
  }
};
