"use strict";

module.exports = app =>{
    let teamService = app.services.teamService;
    let mailService = app.services.mailService;

    function checkAndRegisterTeam(req,res,next){
        teamService.checkAndRegisterTeam(req.body, req.file.filename).then(data=>{
            mailService.sendRegistrationMail(data);
            res.render("userdashboard",{user:data});
            //res.send(data);
        }).catch(err=>{
            console.log(err);
        })
    }

    function getTeamsPage(req,res,next){
        teamService.getAllTeams().then(data=>{
            console.log("working in here");
            res.render("teams",{teams:data});
        }).catch(err=>{
            console.log("error coming");
            console.log(err);
            next(err);
        })
    }

    function checkTeamName(req,res,next){
        teamService.checkTeamName(req.body.team).then((data)=>{
            if(data.length>0){
                res.send(false);
            }
            else
            {
                res.send(true);
            }


        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }

    function deleteAllTeams(req,res,next){
        teamService.deleteAllTeams().then(data=>{
            res.send("done");
        }).catch(err=>{
            next(err);
        })
    }

    return {
        checkAndRegisterTeam,
        getTeamsPage,
        checkTeamName,
        deleteAllTeams
    }
}