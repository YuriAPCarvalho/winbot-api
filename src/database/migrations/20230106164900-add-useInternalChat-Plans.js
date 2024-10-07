const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Plans', 'useInternalChat', {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Plans', 'useInternalChat');
  }
};
