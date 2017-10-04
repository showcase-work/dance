'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn({
        tableName: 'team'
      },
      'votesCount',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'team',
      'votesCount');
  }

}