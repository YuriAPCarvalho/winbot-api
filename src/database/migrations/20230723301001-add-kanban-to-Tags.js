const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Tags', 'kanban', {
      type: DataTypes.INTEGER,
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Tags', 'kanban');
  }
};
