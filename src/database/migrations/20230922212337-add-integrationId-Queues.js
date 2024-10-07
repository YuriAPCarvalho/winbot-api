const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return (
      queryInterface.addColumn('Queues', 'integrationId', {
        type: DataTypes.INTEGER,
        references: { model: 'QueueIntegrations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('Whatsapps', 'integrationId', {
        type: DataTypes.INTEGER,
        references: { model: 'QueueIntegrations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    );
  },

  down: queryInterface => {
    return (
      queryInterface.removeColumn('Queues', 'integrationId'),
      queryInterface.removeColumn('Whatsapps', 'integrationId')
    );
  }
};
