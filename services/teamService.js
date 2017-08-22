"use strict";
var generator = require('generate-password');

module.exports = app => {

    let Team = app.models.team;

    function checkAndRegisterTeam(body){
        console.log("is the body");
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        body.password = password;
        console.log(body);
        return new Promise((resolve,reject)=>{
            Team.createNewRegistration(body).then(data=>{
                console.log(data);
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
        
    }

    function getAllTeams(){
        return new Promise((resolve,reject)=>{
            Team.getAllTeams().then(data=>{
                return resolve(data);
            }).catch(err=>{
                console.log(err);
                return reject(err);
            })
        })
    }

    function checkTeamName(name){
        return new Promise((resolve,reject)=>{
            Team.checkTeamName(name).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function deleteAllTeams(){
        return new Promise((resolve,reject)=>{
            Team.deleteAllTeams().then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
        
    }

   

    return{
        checkAndRegisterTeam,
        getAllTeams,
        checkTeamName,
        deleteAllTeams
    }
}