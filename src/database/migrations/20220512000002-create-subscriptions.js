const { DataTypes } = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable('Subscriptions', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      userPriceCents: {
        type: DataTypes.INTEGER
      },
      whatsPriceCents: {
        type: DataTypes.INTEGER
      },
      lastInvoiceUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastPlanChange: {
        type: DataTypes.DATE,
        allowNull: true
      },
      companyId: {
        type: DataTypes.INTEGER,
        references: { model: 'Companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      providerSubscriptionId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('Subscriptions');
  }
};
