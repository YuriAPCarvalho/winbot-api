const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addColumn('TicketTraking', 'ratingAt', {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn('TicketTraking', 'rated', {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.removeColumn('TicketTraking', 'ratingAt'),
      queryInterface.removeColumn('TicketTraking', 'rated')
    ]);
  }
};
