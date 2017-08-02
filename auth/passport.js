"use strict"

let passport = require("passport");
let LocalStrategy = require('passport-local').Strategy;
let sequelize = require('sequelize');


module.exports = app => {

    let Student = app.models.student.Student;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(student, done) {
            console.log("working in serilize");
            done(null, student);
        });

    passport.deserializeUser(function(student, done) {
        console.log("working in deserilize1");
        Student.findById(student.id).then(student=>{
            console.log("working in deserilize2");
            done(null, student);
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

                Student.find({ where: {email: email} }).then(function(student) {

                    if (student) {
                        var test = student.validPassword(password);
                        if(test){
                            student.password = undefined;
                            return done(null, student);
                        }
                        return done(null, false);
                    } 
                });
          })
        }
    ));

    return passport;

}