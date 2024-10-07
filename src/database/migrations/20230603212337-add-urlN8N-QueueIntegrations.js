const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('QueueIntegrations', 'urlN8N', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('QueueIntegrations', 'urlN8N');
  }
};
