const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Tickets', 'whatsappId', {
      type: DataTypes.INTEGER,
      references: { model: 'Whatsapps', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tickets', 'whatsappId');
  }
};
