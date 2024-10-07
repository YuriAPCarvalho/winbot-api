const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Users', 'tokenVersion', {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Users', 'tokenVersion');
  }
};
