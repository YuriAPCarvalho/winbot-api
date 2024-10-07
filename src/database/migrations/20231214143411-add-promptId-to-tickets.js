const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Tickets', 'promptId', {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tickets', 'promptId');
  }
};
