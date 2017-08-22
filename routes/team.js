"use strict";

let router = require("express").Router();
let multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  }
})
let upload = multer({ storage: storage });

module.exports = app => {
    let teamController = app.controllers.teamController;
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

    router.route("/register").post(upload.single('video'),(req,res,next)=>{
        teamController.checkAndRegisterTeam(req,res,next);
    })

    router.route("/login").post(passport.authenticate(
            'local-login',
            {   successRedirect: '/team/dashboard',
                failureRedirect: '/',
                failureFlash: false 
            }
        )
    )

    router.route("/checkTeamName").post((req,res,next)=>{
        teamController.checkTeamName(req,res,next);
    })

    router.route("/").get((req,res,next)=>{
        teamController.getTeamsPage(req,res,next);
    })

    router.route("/deleteAllTeams").post((req,res,next)=>{
        teamController.deleteAllTeams(req,res,next);
    })

    router.route("/upload/video").post(upload.single('video'),(req,res,next)=>{
        console.log("working in uploading video");
        if(!req.file){
            next({error:"no file uploaded"});
        }
        else if(req.file.mimetype=="video/mp4" || req.file.mimetype=="video/3gpp" || req.file.mimetype=="video/quicktime" || req.file.mimetype=="video/x-msvideo")
        {
            teamController.uploadVideo(req,res,next);
        }
        else
        {
            next({error:"Incorrect format uploaded"});
        }
        
    })

    router.route("/dashboard").get((req,res,next)=>{
        console.log(req.user);
        if(req.user){
            console.log("rendering dashboard");
            res.render("userdashboard",{user:req.user});
        }
        else
        {
            res.redirect("/");
        }
    })

    return router;
};


