const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Messages', 'queueId', {
      type: DataTypes.INTEGER,
      references: { model: 'Queues', key: 'id' },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Messages', 'queueId');
  }
};
