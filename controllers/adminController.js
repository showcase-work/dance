"use strict";

module.exports = app => {
    let adminService = app.services.adminService;
    let teamService = app.services.teamService;
    
    function getDashboardStats (req, res, next) {
        adminService.getDashboardStats().then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    };

    function renderAdminVideosPage (req,res,next){

        teamService.getUnEvaluatedTeams().then(data=>{
            res.render("admin/videos",{videos:data, tab:"unevaluated"});
        }).catch(err=>{
            next(err);
        })
    }

    function getDeclinedTeams (req,res,next){

        teamService.getDeclinedTeams().then(data=>{
            res.render("admin/videos",{videos:data, tab:"declined"});
        }).catch(err=>{
            next(err);
        })
    }

    function getAcceptedTeams (req,res,next){

        teamService.getAcceptedTeams().then(data=>{
            res.render("admin/videos",{videos:data, tab:"accepted"});
        }).catch(err=>{
            next(err);
        })
    }

    function updateTeamStatus(req,res,next){

        teamService.updateTeamStatus(req.body.status,req.body.statusText,req.body.id).then(data=>{
            res.send(data);
        }).catch(err=>{
            next(err);
        })
    }

    function getDownloadReport(req,res,next){
        adminService.getDownloadReport(req,res,next);
    }

    function getDownloadReportAllVotes(req,res,next){
        adminService.getDownloadReportAllVotes(req,res,next);
    }

    function getDownloadReportAllVoters(req,res,next){
        adminService.getDownloadReportAllVoters(req,res,next);
    }

    function cleanDbById(req,res,next){
        var id=null;
        adminService.cleanDb(id).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(err);
        })
    }

    return {
        getDashboardStats,
        renderAdminVideosPage,
        updateTeamStatus,
        getAcceptedTeams,
        getDeclinedTeams,
        getDownloadReport,
        getDownloadReportAllVotes,
        getDownloadReportAllVoters,
        cleanDbById
    };
};