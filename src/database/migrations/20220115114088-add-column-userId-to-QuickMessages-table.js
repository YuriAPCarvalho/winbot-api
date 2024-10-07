const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('QuickMessages', 'userId', {
      type: DataTypes.INTEGER,
      references: { model: 'Users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('QuickMessages', 'userId');
  }
};
