const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'token', {
      type: DataTypes.TEXT,
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'token');
  }
};
