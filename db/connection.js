"use strict";

module.exports = app => {
    let Sequelize = require("sequelize");
    let config = app.config.variables;
  // let userModel = app.models.user.UserModelSchema;

    var sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql.options);

    return sequelize;
};

