'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.changeColumn('ChargeInfo', 'cardFlag', {
        type: Sequelize.STRING, // Replace with the appropriate data type
        allowNull: true // This allows NULL values
      }),
      queryInterface.changeColumn('ChargeInfo', 'cardDate', {
        type: Sequelize.STRING, // Replace with the appropriate data type
        allowNull: true // This allows NULL values
      }),
      queryInterface.changeColumn('ChargeInfo', 'cardNumber', {
        type: Sequelize.STRING, // Replace with the appropriate data type
        allowNull: true // This allows NULL values
      })
    );
  },

  down: (queryInterface, Sequelize) => {
    return (
      queryInterface.changeColumn('ChargeInfo', 'cardFlag', {
        type: Sequelize.STRING, // Replace with the appropriate data type
        allowNull: false // This allows NULL values
      }),
      queryInterface.changeColumn('ChargeInfo', 'cardDate', {
        type: Sequelize.STRING, // Replace with the appropriate data type
        allowNull: false // This allows NULL values
      }),
      queryInterface.changeColumn('ChargeInfo', 'cardNumber', {
        type: Sequelize.STRING, // Replace with the appropriate data type
        allowNull: false // This allows NULL values
      })
    );
  }
};
