const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('Messages', 'userId');
  },

  down: queryInterface => {
    return queryInterface.addColumn('Messages', 'userId', {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
};
