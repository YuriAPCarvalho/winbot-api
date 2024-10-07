const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return (
      queryInterface.addColumn('Plans', 'useOpenAi', {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }),
      queryInterface.addColumn('Plans', 'useIntegrations', {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      })
    );
  },

  down: queryInterface => {
    return (
      queryInterface.removeColumn('Plans', 'useOpenAi'),
      queryInterface.removeColumn('Plans', 'useIntegrations')
    );
  }
};
