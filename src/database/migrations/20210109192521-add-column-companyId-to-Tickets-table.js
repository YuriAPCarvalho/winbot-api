const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Tickets', 'companyId', {
      type: DataTypes.INTEGER,
      references: { model: 'Companies', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tickets', 'companyId');
  }
};
