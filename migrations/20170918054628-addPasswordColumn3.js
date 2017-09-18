'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn({
        tableName: 'voters'
      },
      'password',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'voters',
      'password');
  }

}