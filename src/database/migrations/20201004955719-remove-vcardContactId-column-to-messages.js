const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('Messages', 'vcardContactId');
  },

  down: queryInterface => {
    return queryInterface.addColumn('Messages', 'vcardContactId', {
      type: DataTypes.INTEGER,
      references: { model: 'Contacts', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
};
