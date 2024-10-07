const { DataTypes } = require('sequelize');
module.exports = {
  up: queryInterface => {
    return Promise.all([
      queryInterface.sequelize.query(
        'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
      )
    ]);
  }
};
