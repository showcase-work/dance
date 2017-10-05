"use strict"

var generator = require('generate-password');


module.exports = app => {

    let Team = app.models.team;
    let Voter = app.models.voter;
    let mailService = app.services.mailService;

    function vote(teamId, voterId){
        console.log("asdjkfhsadhfjkhsadf");
        console.log("Service:VoterService");

        return new Promise((resolve,reject)=>{
            Team.addVote(teamId, voterId).then(data=>{
                console.log(data);
                Voter.addVote(teamId, voterId).then(data2=>{
                    console.log(data);
                    return resolve(data);
                }).catch(err=>{
                    return reject(err);
                })
            }).catch(err=>{
                return reject(err);
            })

        })
    }

    function registerVoter(email, name){
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        return new Promise((resolve,reject)=>{
            Voter.registerVoter(email,name,password).then(data=>{
                mailService.sendMailToVoter(email,name,password);
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    return {
        vote,
        registerVoter
    }
}