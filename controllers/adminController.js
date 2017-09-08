"use strict";

module.exports = app => {
    let adminService = app.services.adminService;
    let teamService = app.services.teamService;
    
    function getDashboardStats (req, res, next) {
        adminService.getDashboardStats().then(data=>{
            res.send(data);
        }).catch(err=>{
            res.next(err);
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

    return {
        getDashboardStats,
        renderAdminVideosPage,
        updateTeamStatus,
        getAcceptedTeams,
        getDeclinedTeams
    };
};