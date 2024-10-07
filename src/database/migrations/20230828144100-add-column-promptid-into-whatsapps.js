const { DataTypes } = require('sequelize');

module.exports = {
  up: async queryInterface => {
    const table = 'Whatsapps';
    const column = 'promptId';

    const tableInfo = await queryInterface.describeTable(table);
    if (tableInfo[column]) {
      return Promise.resolve();
    }

    return queryInterface.addColumn(table, column, {
      type: DataTypes.INTEGER,
      references: { model: 'Prompts', key: 'id' },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Whatsapps', 'promptId');
  }
};
