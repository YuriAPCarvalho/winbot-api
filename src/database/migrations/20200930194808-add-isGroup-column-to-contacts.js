const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Contacts', 'isGroup', {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Contacts', 'isGroup');
  }
};
