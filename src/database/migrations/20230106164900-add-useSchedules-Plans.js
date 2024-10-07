const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Plans', 'useSchedules', {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Plans', 'useSchedules');
  }
};
