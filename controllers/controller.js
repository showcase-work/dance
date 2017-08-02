"use strict";

module.exports = app => {
    let locationsService = app.services.locationsService;
    
    function fetchLocations (req, res, next) {
        validator.validateLocationsParams(req.query).then(params => {
            return locationsService.fetchLocations(params);
        }).then(data => {
            res.send(data);
        }).catch(err => next(err));
    };

    return {
        fetchLocations
    };
};