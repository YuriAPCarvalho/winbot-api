const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addColumn('Companies', 'status', {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }),
      queryInterface.addColumn('Companies', 'schedules', {
        type: DataTypes.JSONB,
        defaultValue: []
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('Companies', 'schedules'),
      queryInterface.removeColumn('Companies', 'status')
    ]);
  }
};
