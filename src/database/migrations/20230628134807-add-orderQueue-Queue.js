const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Queues', 'orderQueue', {
      type: DataTypes.INTEGER
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Queues', 'orderQueue');
  }
};
