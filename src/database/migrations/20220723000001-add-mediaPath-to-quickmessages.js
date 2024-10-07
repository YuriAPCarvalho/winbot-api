const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('QuickMessages', 'mediaPath', {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('QuickMessages', 'mediaPath');
  }
};
