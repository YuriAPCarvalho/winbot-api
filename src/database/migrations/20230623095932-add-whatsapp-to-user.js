const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('Users', 'whatsappId', {
      type: DataTypes.INTEGER,
      references: { model: 'Whatsapps', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('Users', 'whatsappId');
  }
};
