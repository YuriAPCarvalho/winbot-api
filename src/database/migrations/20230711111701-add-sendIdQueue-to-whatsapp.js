const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Whatsapps', 'sendIdQueue', {
      type: DataTypes.INTEGER
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'sendIdQueue');
  }
};
