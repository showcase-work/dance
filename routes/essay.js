"use strict";

let router = require("express").Router();

module.exports = app => {
    
    router.route("/").get((req,res,next)=>{
        if(!req.user){
            res.render("/");
        }
        else
        {
            res.render("essay",{user:req.user});

        }
        //studentController.checkAndRegisterStudent(req,res,next);
    })

    
    return router;
};


