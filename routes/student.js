"use strict";

let router = require("express").Router();

module.exports = app => {
    let studentController = app.controllers.studentController;
    let passport = app.auth.passport;
    /*let tokenService = app.services.tokenService;
    

    function getToken(req, res, next){
        tokenService.generateToken({id:req.user.id, name:req.user.username }).then(token=>{
            var generatedToken = token;
            req.token = generatedToken;
            next();
        });
    }

    function respond(req, res) { 
      res.status(200).json({
      token: req.token
      });
    }

    function serialize(req, res, next) { 
      db.updateOrCreate(req.user, function(err, user){
               if(err) {
            return next(err);}
        req.user = user;
        next();
      });
    }

    function respondAndClose(req,res,next){
        return res.render("misc/closewindow",{token:req.token});
    }

    const db = {  
      updateOrCreate: function(user, cb){
        cb(null, user);
      }
    };*/


    /*router.route('/local').post((req,res,next)=>{
        passport.authenticate(
           'local-login', { session:false
        }, function(err,user,info){
            if(!user){
                res.render("login",{error:info})
            }
            else
            {
                req.user = user;
                next();
            }
        })(req,res,next)
    },serialize, getToken, respond);

    router.route('/').get((req,res,next)=>{
        res.render("login");
    });*/

    router.route("/register").post((req,res,next)=>{
        studentController.checkAndRegisterStudent(req,res,next);
    })

    router.route("/login").post(passport.authenticate(
            'local-login',
            {   successRedirect: '/essay',
                failureRedirect: '/',
                failureFlash: false 
            }
        )
    )

    return router;
};


