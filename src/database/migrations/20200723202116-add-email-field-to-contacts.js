const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Contacts', 'email', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Contacts', 'email');
  }
};
