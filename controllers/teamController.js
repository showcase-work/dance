"use strict";

module.exports = app =>{
    let teamService = app.services.teamService;

    function checkAndRegisterTeam(req,res,next){
        teamService.checkAndRegisterTeam(req.body, req.file.filename).then(data=>{
            console.log("here3");
            res.render("userdashboard",{user:data});
            //res.send(data);
        }).catch(err=>{
            console.log(err);
        })
    }

    function getTeamsPage(req,res,next){
        teamService.getAllTeams().then(data=>{
            res.render("teams",{team:data});
        }).catch(err=>{
            next(err);
        })
    }

    return {
        checkAndRegisterTeam,
        getTeamsPage
    }
}