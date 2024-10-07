const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('TicketTraking', 'chatbotAt', {
      type: DataTypes.DATE,
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('TicketTraking', 'chatbotAt');
  }
};
