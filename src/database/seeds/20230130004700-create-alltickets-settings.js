const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Settings',
      [
        {
          key: 'allTicket',
          value: 'disabled',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Settings', {});
  }
};
