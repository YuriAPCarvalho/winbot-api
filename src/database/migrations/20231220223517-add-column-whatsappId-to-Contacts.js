const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Contacts', 'whatsappId', {
      type: DataTypes.INTEGER,
      references: { model: 'Whatsapps', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Contacts', 'whatsappId');
  }
};
