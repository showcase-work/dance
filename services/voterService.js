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
            var a = Team.addVote(teamId, voterId)

            var b = Voter.addVote(teamId, voterId)

            Promise.all([a,b]).then(data=>{
                console.log(data);
                return resolve(data);
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