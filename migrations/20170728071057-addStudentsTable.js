'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('students', {
        id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
        },
        email: {
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
        status: {
            type: Sequelize.STRING
        },
        essay: {
            type: Sequelize.TEXT
        },
        curp: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        school:{
            type:Sequelize.STRING
        },
        entity:{
            type:Sequelize.STRING
        },
        grade:{
            type:Sequelize.INTEGER
        }
    },
    {
        tableName: "students",
        timestamps: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('students');
  }
};
