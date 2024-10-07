const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.addColumn('FilesOptions', 'mediaType', {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('FilesOptions', 'mediaType');
  }
};
