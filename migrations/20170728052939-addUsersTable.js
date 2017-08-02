'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
            email: {
            type: Sequelize.STRING
        },
            username: {
            type: Sequelize.STRING
        },
            password: {
            type: Sequelize.STRING
        },
            createdAt: {
            type: Sequelize.DATE
        },
            updatedAt: {
            type: Sequelize.DATE
        },
            role: {
                type: Sequelize.STRING
        }
    },
    {
        tableName: "users",
        timestamps: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
