const { DataTypes } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Plans', 'term', {
      type: DataTypes.STRING,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Plans', 'term');
  }
};
