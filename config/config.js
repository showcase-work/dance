"use strict";

let path = require("path");
let dotenv = require("dotenv");
dotenv.load({ path: ".env" });

module.exports = {
    "development": {
        "username": process.env.CAL_DB_USERNAME,
        "password": process.env.CAL_DB_PASSWORD,
        "database": process.env.CAL_DB_NAME,
        "host": process.env.CAL_DB_HOST,
        "dialect": "mysql",
    },
    "test": {
        "username": process.env.CAL_DB_USERNAME,
        "password": process.env.CAL_DB_PASSWORD,
        "database": process.env.CAL_DB_NAME,
        "host": process.env.CAL_DB_HOST,
        "dialect": "mysql",
    },
    "production": {
        "username": process.env.CAL_DB_USERNAME,
        "password": process.env.CAL_DB_PASSWORD,
        "database": process.env.CAL_DB_NAME,
        "host": process.env.CAL_DB_HOST,
        "dialect": "mysql",
    }
}