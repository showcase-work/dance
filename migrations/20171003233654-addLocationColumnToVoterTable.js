'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn({
        tableName: 'voters'
      },
      'location',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'voters',
      'location');
  }

}