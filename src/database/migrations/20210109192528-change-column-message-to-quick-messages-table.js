const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.changeColumn('QuickMessages', 'message', {
      type: DataTypes.TEXT
    });
  },
  down: queryInterface => {
    return queryInterface.changeColumn('QuickMessages', 'message', {
      type: DataTypes.STRING
    });
  }
};
