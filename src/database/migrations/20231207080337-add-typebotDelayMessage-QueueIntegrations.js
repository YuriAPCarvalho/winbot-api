const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn(
      'QueueIntegrations',
      'typebotDelayMessage',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1000
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      'QueueIntegrations',
      'typebotDelayMessage'
    );
  }
};
