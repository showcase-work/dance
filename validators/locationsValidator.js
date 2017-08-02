"use strict";

let joi = require("joi");

module.exports = app => {
    let schemas = app.validators.schemas.locationsSchema;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    function validateLocationsParams (params) {
        logger.info("Validating fetch Order Params");

        let joiValidationOption = {
            abortEarly: false,
            allowUnknown: true
        };

        return new Promise((resolve, reject) => {
            joi.validate(params, schemas.locationsParamsSchema, joiValidationOption, err => {
                if (err) {
                    let error = errorFormatter.createErrorObjectFromJoiErrors(err);
                    logger.error(`Validation failed : ${JSON.stringify(error.params)}`);
                    return reject(error);
                }
                logger.info("Validation successful for registerClient");
                return resolve(params);
            });
        });
    }

    return {
        validateLocationsParams
    };
};