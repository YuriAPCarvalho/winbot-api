'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('ChargeInfo', 'subscriptionID', {
      type: DataTypes.INTEGER,
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('ChargeInfo', 'subscriptionID');
  }
};
