const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('Whatsapps', 'default', 'isDefault');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('Whatsapps', 'isDefault', 'default');
  }
};
