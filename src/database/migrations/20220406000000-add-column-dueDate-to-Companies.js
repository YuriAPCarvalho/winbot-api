const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Companies', 'dueDate', {
      type: DataTypes.DATE,
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Companies', 'dueDate');
  }
};
