const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return (
      queryInterface.addColumn('QueueIntegrations', 'typebotKeywordRestart', {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      }),
      queryInterface.addColumn('QueueIntegrations', 'typebotRestartMessage', {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      })
    );
  },

  down: queryInterface => {
    return (
      queryInterface.removeColumn('QueueIntegrations', 'typebotKeywordRestart'),
      queryInterface.removeColumn('QueueIntegrations', 'typebotRestartMessage')
    );
  }
};
