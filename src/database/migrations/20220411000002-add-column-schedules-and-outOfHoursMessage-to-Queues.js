const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addColumn('Queues', 'schedules', {
        type: DataTypes.JSONB,
        defaultValue: []
      }),
      queryInterface.addColumn('Queues', 'outOfHoursMessage', {
        type: DataTypes.TEXT,
        allowNull: true
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('Queues', 'schedules'),
      queryInterface.removeColumn('Queues', 'outOfHoursMessage')
    ]);
  }
};
