const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.addColumn('Tickets', 'uuid', {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      })
    ]);
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tickets', 'uuid');
  }
};
