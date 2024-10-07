const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return (
      queryInterface.addColumn('QueueIntegrations', 'typebotSlug', {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      }),
      queryInterface.addColumn('QueueIntegrations', 'typebotExpires', {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }),
      queryInterface.addColumn('QueueIntegrations', 'typebotKeywordFinish', {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      }),
      queryInterface.addColumn('QueueIntegrations', 'typebotUnknownMessage', {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      })
    );
  },

  down: queryInterface => {
    return (
      queryInterface.removeColumn('QueueIntegrations', 'typebotSlug'),
      queryInterface.removeColumn('QueueIntegrations', 'typebotExpires'),
      queryInterface.removeColumn('QueueIntegrations', 'typebotKeywordFinish'),
      queryInterface.removeColumn('QueueIntegrations', 'typebotUnknownMessage')
    );
  }
};
