const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Schedules', 'mediaPath', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Schedules', 'mediaPath');
  }
};
