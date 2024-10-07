const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return (
      queryInterface.removeConstraint('Tickets', 'contactid_companyid_unique'),
      queryInterface.addConstraint(
        'Tickets',
        ['contactId', 'companyId', 'whatsappId'],
        {
          type: 'unique',
          name: 'contactid_companiesid_unique'
        }
      )
    );
  },

  down: queryInterface => {
    return queryInterface.removeConstraint(
      'Tickets',
      'contactid_companiesid_unique'
    );
  }
};
