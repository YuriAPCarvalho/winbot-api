const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return (
      queryInterface.addColumn('Tickets', 'useIntegration', {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
      }),
      queryInterface.addColumn('Tickets', 'integrationId', {
        references: { model: 'QueueIntegrations', key: 'id' },
        type: DataTypes.INTEGER,
        defaultValue: null,
        allowNull: true
      })
    );
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('Tickets', 'useIntegration'),
      queryInterface.removeColumn('Tickets', 'integrationId')
    ]);
  }
};
