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

    return {
        checkAndRegisterTeam
    }
}