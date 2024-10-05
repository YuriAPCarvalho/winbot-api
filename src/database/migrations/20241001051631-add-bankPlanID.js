const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Plans', 'bankPlanID', {
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Plans', 'bankPlanID');
  }
};
