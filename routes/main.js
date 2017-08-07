"use strict";

let router = require("express").Router();

module.exports = app => {
    
    router.route("/").get((req,res,next)=>{
        res.render("main");
    })

    
    return router;
};


