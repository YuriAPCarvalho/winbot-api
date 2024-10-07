const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Companies', 'recurrence', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Companies', 'recurrence');
  }
};
