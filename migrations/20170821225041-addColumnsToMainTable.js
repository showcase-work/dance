'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   
    queryInterface.addColumn({
        tableName: 'team'
      },
      'duration',
      Sequelize.STRING
    );
    queryInterface.addColumn({
        tableName: 'team'
      },
      'public_id',
      Sequelize.STRING
    );
  },

  down: function (queryInterface, Sequelize) {


    queryInterface.removeColumn(
      'team',
      'duration');

    queryInterface.removeColumn(
      'team',
      'public_id');
    }
};