"use strict";

module.exports = {
    secret: {
        key: "Caltia"
    },
    mysql: {
        username: process.env.CAL_DB_USERNAME,
        password: process.env.CAL_DB_PASSWORD,
        database: process.env.CAL_DB_NAME,
        options:{
            host: process.env.CAL_DB_HOST,
            timezone: '+05:30',
            dialect: "mysql"
        } 
    }
};