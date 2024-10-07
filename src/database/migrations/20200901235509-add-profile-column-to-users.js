const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Users', 'profile', {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Users', 'profile');
  }
};
