"use strict"

module.exports = app => {

    let voterService = app.services.voterService;

    function vote(req,res,next){
        console.log("Controller:VoterController");

        voterService.vote(req.body.team_id, req.user.id).then(data=>{
            res.redirect("/team");
        }).catch(err=>{
            next(err);
        })
    }

    function registerVoter(req,res,next){
        voterService.registerVoter(req.body.email, req.body.name).then(data=>{
            /*req.login(data, function (err){
                if ( ! err ){
                    res.redirect('/team/');
                } else {
                    console.log(err);
                    next(err);
                }
            })*/
            res.send(data);
        }).catch(err=>{
            console.log(err);
            next(err);
        })
    }

    return {
        vote,
        registerVoter
    }
}