const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Messages', 'participant', {
      type: DataTypes.TEXT
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Messages', 'participant');
  }
};
