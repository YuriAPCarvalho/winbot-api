const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.changeColumn('Tickets', 'lastMessage', {
      defaultValue: '',
      type: DataTypes.TEXT
    });
  },

  down: queryInterface => {
    return queryInterface.changeColumn('Tickets', 'lastMessage', {
      defaultValue: '',
      type: DataTypes.TEXT
    });
  }
};
