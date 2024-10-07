const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'provider', {
      type: DataTypes.TEXT,
      defaultValue: 'stable'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'provider');
  }
};
