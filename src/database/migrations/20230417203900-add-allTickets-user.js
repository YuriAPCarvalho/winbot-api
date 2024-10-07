const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Users', 'allTicket', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'desabled'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Users', 'allTicket');
  }
};
