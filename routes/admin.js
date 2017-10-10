"use strict";

let router = require("express").Router();
let jwt = require('jsonwebtoken');


module.exports = app => {
    
    let adminController = app.controllers.adminController;

    router.route("/").get(verifyAdmin,(req,res,next)=>{
        
        res.render("admin/dashboard");
        
    })

    router.route("/api/get-dashboard-stats").get(verifyAdmin,(req,res,next)=>{
        adminController.getDashboardStats(req,res,next);
    })

    router.route("/videos").get(verifyAdmin,(req,res,next)=>{
        adminController.renderAdminVideosPage(req,res,next);
    })

    router.route("/videos/accepted").get(verifyAdmin,(req,res,next)=>{
        adminController.getAcceptedTeams(req,res,next);
    })

    router.route("/videos/declined").get(verifyAdmin,(req,res,next)=>{
        adminController.getDeclinedTeams(req,res,next);
    })

    router.route("/videos/update-status").post(verifyAdmin,(req,res,next)=>{
        adminController.updateTeamStatus(req,res,next);
    })

    router.route("/statistics").get(verifyAdmin,(req,res,next)=>{
        res.render("admin/statistics");
    })

    router.route("/login").get((req,res,next)=>{

        res.render("admin/login");
    })

    router.route("/download-report").get((req,res,next)=>{
        adminController.getDownloadReport(req,res,next);
    })

    router.route("/download-report/votes").get((req,res,next)=>{
        adminController.getDownloadReportAllVotes(req,res,next);
    })

    router.route("/download-report/voters").get((req,res,next)=>{
        adminController.getDownloadReportAllVoters(req,res,next);
    })

    router.route("/download-report/votersdate").get((req,res,next)=>{
        adminController.getDownloadReportAllVotersByDate(req,res,next);
    })

    function parseCookies(request) {
        var list = {},
            rc = request.headers.cookie;

        rc && rc.split(';').forEach(function( cookie ) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        return list;
    }


    router.route("/login").post((req,res,next)=>{
        if((req.body.username == "AlexisG" && req.body.password=="Alexis-B10!*") || (req.body.username == "AdminB10" && req.body.password=="Admin-B10!*") || (req.body.username == "GioM" && req.body.password=="Gio-B10!*")){
            var token = jwt.sign(req.body, 'danceisthesecret');
            res.cookie('admin',token);
            res.redirect("/admin/");
        }
        else
        {
            res.redirect("/admin/login");
        }
    })

    router.route("/cleandb").get((req,res,next)=>{
        adminController.cleanDbById(req,res,next);
    })

    function verifyAdmin(req,res,next){
        var cookies = parseCookies(req);
        jwt.verify(cookies.admin, 'danceisthesecret', function(err, decoded) {
            
            if(!err){
                if(decoded.username=="AlexisG" || decoded.username=="AdminB10" || decoded.username=="GioM"){
                    next();
                }
                else
                {
                    res.redirect("/admin/login")
                }
            }
            else
            {
                res.redirect("/admin/login")
            }
        });
        
    }
    return router;
};