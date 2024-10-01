const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable('ChargeInfo', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      cpf: {
        type: DataTypes.STRING
      },
      birth: {
        type: DataTypes.STRING
      },

      phone_number: {
        type: DataTypes.STRING
      },

      city: {
        type: DataTypes.STRING
      },

      state: {
        type: DataTypes.STRING
      },

      street: {
        type: DataTypes.STRING
      },

      number: {
        type: DataTypes.INTEGER
      },

      neighborhood: {
        type: DataTypes.STRING
      },

      zipcode: {
        type: DataTypes.STRING
      },
      cardNumber: {
        type: DataTypes.STRING
      },

      cardDate: {
        type: DataTypes.STRING
      },
      cardFlag: {
        type: DataTypes.STRING
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },

      companyId: {
        type: DataTypes.INTEGER,
        references: { model: 'Companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('ChargeInfo');
  }
};
