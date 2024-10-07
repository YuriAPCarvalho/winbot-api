const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'greetingMessage', {
      type: DataTypes.TEXT
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'greetingMessage');
  }
};
