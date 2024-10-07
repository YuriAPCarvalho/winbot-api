const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('Contacts', ['number', 'companyId'], {
      type: 'unique',
      name: 'number_companyid_unique'
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'Contacts',
      'number_companyid_unique'
    );
  }
};
