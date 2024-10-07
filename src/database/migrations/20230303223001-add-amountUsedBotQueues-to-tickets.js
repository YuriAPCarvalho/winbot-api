const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Tickets', 'amountUsedBotQueues', {
      type: DataTypes.INTEGER
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tickets', 'amountUsedBotQueues');
  }
};
