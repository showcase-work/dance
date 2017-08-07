'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('team', {
            id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
            email: {
                type: Sequelize.STRING
        },
            teamName: {
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
        },
            status:{
                type: Sequelize.STRING
        },
            teamMembers:{
                type: Sequelize.STRING
        },
            representativeName:{
                type: Sequelize.STRING
        },
            representativeEmail:{
                type: Sequelize.STRING
        },
            representativeNumber:{
                type: Sequelize.STRING
        },
            city:{
                type: Sequelize.STRING
        },
            state:{
                type: Sequelize.STRING
        },
            videoLink:{
                type:Sequelize.STRING
        }
    },
    {
        tableName: "team",
        timestamps: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('team');
  }
};
