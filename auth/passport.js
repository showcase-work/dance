"use strict"

let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let sequelize = require('sequelize');


module.exports = app => {

    let Team = app.models.team.Team;
    let Voter = app.models.voter.Voter;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(team, done) {
            console.log("working in serilize");
            done(null, team);
        });

    passport.deserializeUser(function(team, done) {
        console.log("working in deserilize1");
        if(team.facebook){
            Voter.findById(team.id).then(team=>{
                           console.log("working in deserilize2");
                           console.log("working in facebook deserialze");
                           done(null, team);
                       }).catch(err=>{
                           done(err, null);
                       }) 
        }
        else
        {
           Team.findById(team.id).then(team=>{
                console.log("working in team deserialze");
               console.log("working in deserilize2");
               done(null, team);
           }).catch(err=>{
               done(err, null);
           })  
        }
        
    });


    passport.use('local-login', new LocalStrategy({
        usernameField : 'teamName',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, teamName, password, done) {

      process.nextTick(function() {
                Team.find({ where: {teamName: teamName} }).then(function(team) {
                    if (team) {
                        var test = team.validPassword(password);
                        if(test){
                            team.password = undefined;
                            return done(null, team);
                        }
                        return done(null, false);
                    } 
                    else
                    {
                        return done(null, false);
                    }
                });
          })
        }
    ));



    passport.use('local-voter-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

      process.nextTick(function() {
                Voter.find({ where: {email: email} }).then(function(voter) {
                    if (voter) {
                        var test = voter.validPassword(password);
                        if(test){
                            voter.password = undefined;
                            return done(null, voter);
                        }
                        return done(null, false);
                    } 
                });
          })
        }
    ));


    passport.use('facebook', new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID        : '1927644547501515',
            clientSecret    : '0e46ee3057e144d7c0fea47c8e012241',
            callbackURL     : 'http://seatmx.com:3001/voter/facebook/callback',
            passReqToCallback : true,
            profileFields: ['id', 'email', 'displayName','hometown','location'],
            scope: ['email','user_location','user_hometown']
        },
        // facebook will send back the token and profile
        function(req, token, refreshToken, profile, done) {
            // asynchronous
            console.log(profile);
            process.nextTick(function() {
                // find the user in the database based on their facebook id\
                var emailid = null;
                if(profile.emails != undefined){
                    emailid = profile.emails[0].value;
                }

                    Voter.find({
                      where: {
                        $or:[
                            {facebook:profile.id},
                            {email:emailid}
                        ]
                      }
                    }).then(user=>{
                        if (user) {
                            return done(null, user);
                        } else {
                            // if there is no user found with that facebook id, create them
                            
                            var newUser = Voter.build({
                              name: profile.displayName,
                              email: emailid,
                              facebook: profile.id,
                              location:profile._json.hometown.name
                            });

                            newUser.save()
                            .then(user => {
                                done(null, user)
                            })
                            .catch(err => {
                                done(err)
                            });
                        }

                    }).catch(err=>{
                        console.log(err);
                        return done(err);
                    })


            });
        }
    ));

    return passport;

}