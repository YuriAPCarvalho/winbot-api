const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return (
      queryInterface.addColumn('Whatsapps', 'maxUseBotQueues', {
        type: DataTypes.INTEGER,
        defaultValue: 3,
        allowNull: true
      }),
      queryInterface.addColumn('Whatsapps', 'expiresTicket', {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
      }),
      queryInterface.addColumn('Whatsapps', 'expiresInactiveMessage', {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: true
      }),
      queryInterface.addColumn('Whatsapps', 'timeUseBotQueues', {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
      })
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'companyId');
  }
};
