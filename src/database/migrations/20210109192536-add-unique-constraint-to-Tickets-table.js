const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('Tickets', ['contactId', 'companyId'], {
      type: 'unique',
      name: 'contactid_companyid_unique'
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'Tickets',
      'contactid_companyid_unique'
    );
  }
};
