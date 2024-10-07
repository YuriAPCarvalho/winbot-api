const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'retries', {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'retries');
  }
};
