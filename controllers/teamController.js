"use strict";

module.exports = app =>{
    let teamService = app.services.teamService;
    let cloudinary = app.services.cloudinary;
    let mailService = app.services.mailService;

    function checkAndRegisterTeam(req,res,next){
        teamService.checkAndRegisterTeam(req.body).then(data=>{
            mailService.sendRegistrationMail(data);
            req.login(data, function (err) {
                            if ( ! err ){
                                res.redirect('/team/dashboard');
                            } else {
                                console.log(err);
                            }
                        });
            //res.render("userdashboard",{user:data});
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

    function uploadVideo(req,res,next){
        cloudinary.uploadVideo(req.file).then(data=>{
            console.log("wokring in here");
            console.log(data);
            res.send(data);
            console.log(data);
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }

    return {
        checkAndRegisterTeam,
        getTeamsPage,
        checkTeamName,
        deleteAllTeams,
        uploadVideo
    }
}