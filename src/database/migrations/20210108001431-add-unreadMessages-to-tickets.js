const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Tickets', 'unreadMessages', {
      type: DataTypes.INTEGER
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tickets', 'unreadMessages');
  }
};
