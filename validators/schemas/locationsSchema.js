"use strict";

let joi = require("joi");

module.exports = app => {

    let locationsParamsSchema = joi.object().keys({
        cloud_site_id: joi.number().required()
    });

    return {
        locationsParamsSchema
    };
};

