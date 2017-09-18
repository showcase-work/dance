'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('voters', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
          email: {
              type: Sequelize.STRING
      },
          name: {
              type: Sequelize.STRING
      },
          voted: {
              type: Sequelize.STRING
      },
          facebook: {
                type: Sequelize.STRING
      },
          createdAt: {
              type: Sequelize.DATE
      },
          updatedAt: {
              type: Sequelize.DATE
      }
    },
    {
        tableName: "voters",
        timestamps: true
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('voter');
  }
};
