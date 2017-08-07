"use strict"

let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
let sequelize = require('sequelize');


module.exports = app => {

    let Team = app.models.team.Team;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(team, done) {
            console.log("working in serilize");
            done(null, student);
        });

    passport.deserializeUser(function(team, done) {
        console.log("working in deserilize1");
        Team.findById(team.id).then(team=>{
            console.log("working in deserilize2");
            done(null, team);
        }).catch(err=>{
            done(err, null);
        }) 
    });


    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

      process.nextTick(function() {

                Team.find({ where: {email: email} }).then(function(team) {

                    if (team) {
                        var test = team.validPassword(password);
                        if(test){
                            team.password = undefined;
                            return done(null, team);
                        }
                        return done(null, false);
                    } 
                });
          })
        }
    ));

    return passport;

}