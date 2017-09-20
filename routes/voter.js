"use strict"

let router = require("express").Router();

module.exports = app => {
    let passport = app.auth.passport;
    let voterController = app.controllers.voterController;

    router.route('/facebook').get(passport.authenticate('facebook', 
        { 
            profileFields: ['id', 'email', 'link', 'name','location'],
            scope: ['email','public_profile','user_location','user_hometown'],
            failureRedirect: '/'
        }));

    //callbacks
    router.route('/facebook/callback').get(
        passport.authenticate('facebook', {
            failureRedirect: '/',
            successRedirect: '/team',
            display: 'popup'
        }));

    router.route("/vote").post((req,res,next)=>{
        console.log("Route:Voter:vote");
        console.log(req.user.voted);
        console.log(typeof req.body.team_id);
        if(req.user.voted){
            if(JSON.parse(req.user.voted) instanceof Array){
                if(JSON.parse(req.user.voted).indexOf(req.body.team_id)> -1){
                    res.redirect("/team");
                }
                else
                {
                    voterController.vote(req,res,next);
                }
            }
            else
            {
               voterController.vote(req,res,next); 
            }
        }
        else
        {
            voterController.vote(req,res,next);
        }
        
    })

    router.route("/register").post((req,res,next)=>{
        voterController.registerVoter(req,res,next);
    })

    router.route("/signin").post(passport.authenticate(
            'local-voter-login',
            {   successRedirect: '/sendsuccess',
                failureRedirect: '/senderror',
                failureFlash: false
            }
        ))

    router.route("/logout").get((req,res,next)=>{
        req.logout();
        res.redirect("/team");
    })

    return router;
}