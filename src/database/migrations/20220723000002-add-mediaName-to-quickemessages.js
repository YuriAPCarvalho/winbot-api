const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('QuickMessages', 'mediaName', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('QuickMessages', 'mediaName');
  }
};
