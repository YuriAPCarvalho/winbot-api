const { DataTypes } = require('sequelize');
//
module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addColumn('Whatsapps', 'transferQueueId', {
        type: DataTypes.INTEGER,
        allowNull: true
      }),

      queryInterface.addColumn('Whatsapps', 'timeToTransfer', {
        type: DataTypes.INTEGER,
        allowNull: true
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('Whatsapps', 'timeToTransfer'),
      queryInterface.removeColumn('Whatsapps', 'transferQueueId')
    ]);
  }
};
