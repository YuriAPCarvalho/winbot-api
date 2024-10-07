const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Schedules', 'status', {
      type: DataTypes.STRING,
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Schedules', 'status');
  }
};
