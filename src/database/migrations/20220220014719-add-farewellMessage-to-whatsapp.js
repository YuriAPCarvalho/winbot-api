const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'farewellMessage', {
      type: DataTypes.TEXT
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'farewellMessage');
  }
};
