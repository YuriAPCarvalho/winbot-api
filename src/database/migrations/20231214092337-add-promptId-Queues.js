const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Queues', 'promptId', {
      type: DataTypes.INTEGER,
      references: { model: 'Prompts', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Queues', 'promptId');
  }
};
