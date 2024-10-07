const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Messages', 'quotedMsgId', {
      type: DataTypes.STRING,
      references: { model: 'Messages', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Messages', 'quotedMsgId');
  }
};
