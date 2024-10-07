const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.sequelize.query('DELETE FROM "Settings"'),
      queryInterface.removeConstraint('Settings', 'Settings_pkey'),
      queryInterface.addColumn('Settings', 'id', {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      })
    ]);
  },

  down: queryInterface => {
    return Promise.all([
      queryInterface.sequelize.query('DELETE FROM "Settings"'),
      queryInterface.removeColumn('Settings', 'id'),
      queryInterface.addConstraint('Settings', ['key'], {
        type: 'primary key',
        name: 'Settings_pkey'
      })
    ]);
  }
};
