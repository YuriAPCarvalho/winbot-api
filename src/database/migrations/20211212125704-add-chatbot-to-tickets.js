const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addColumn('Tickets', 'chatbot', {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }),
      queryInterface.addColumn('Tickets', 'queueOptionId', {
        type: DataTypes.INTEGER,
        references: { model: 'QueueOptions', key: 'id' },
        onUpdate: 'SET null',
        onDelete: 'SET null',
        allowNull: true
      })
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tickets', 'chatbot');
  }
};
