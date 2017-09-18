"use strict"

let passport = require("passport");
let FacebookStrategy = require('passport-facebook').Strategy;
let sequelize = require('sequelize');


module.exports = app => {

    let Voter = app.models.voter.Voter;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(voter, done) {
            console.log("working in serilize");
            console.log("wiringinging");
            done(null, voter);
        });

    passport.deserializeUser(function(voter, done) {
        console.log("working in deserilize1");
            console.log("wiringinging");

        Voter.findById(voter.id).then(voter=>{
            console.log("working in deserilize2");
            done(null, voter);
        }).catch(err=>{
            done(err, null);
        }) 
    });


    passport.use('facebook', new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID        : '1927644547501515',
            clientSecret    : '0e46ee3057e144d7c0fea47c8e012241',
            callbackURL     : 'http://localhost:3001/voter/facebook/callback',
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
                        facebook:profile.id
                      }
                    }).then(user=>{
                        if (user) {
                            console.log("user exists");
                            console.log(user);
                            return done(null, user);
                        } else {
                            // if there is no user found with that facebook id, create them
                            
                            var newUser = Voter.build({
                              name: profile.displayName,
                              email: emailid,
                              facebook: profile.id,
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