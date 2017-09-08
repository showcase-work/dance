"use strict";

let router = require("express").Router();

module.exports = app => {
    
    let adminController = app.controllers.adminController;

    router.route("/").get((req,res,next)=>{
        /*if(!req.user){
            res.render("/");
        }
        else
        {*/
            res.render("admin/dashboard");
        /*}*/
        /*studentController.checkAndRegisterStudent(req,res,next);*/
    })

    router.route("/api/get-dashboard-stats").get((req,res,next)=>{
        adminController.getDashboardStats(req,res,next);
    })

    router.route("/videos").get((req,res,next)=>{
        adminController.renderAdminVideosPage(req,res,next);
    })

    router.route("/videos/accepted").get((req,res,next)=>{
        adminController.getAcceptedTeams(req,res,next);
    })

    router.route("/videos/declined").get((req,res,next)=>{
        adminController.getDeclinedTeams(req,res,next);
    })

    router.route("/videos/update-status").post((req,res,next)=>{
        adminController.updateTeamStatus(req,res,next);
    })

    router.route("/statistics").get((req,res,next)=>{
        res.render("admin/dashboard");
    })

    
    return router;
};


