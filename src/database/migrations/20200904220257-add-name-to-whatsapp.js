const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'name', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'name');
  }
};
