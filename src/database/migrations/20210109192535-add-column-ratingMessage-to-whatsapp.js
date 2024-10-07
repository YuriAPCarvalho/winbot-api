const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'ratingMessage', {
      type: DataTypes.TEXT
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'ratingMessage');
  }
};
