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
                data.password = password;
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

    function findTeam(query){
        return new Promise((resolve,reject)=>{
            console.log(query);
            console.log("wokring in this");
            Team.findTeam(query).then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getUnEvaluatedTeams(){
        return new Promise((resolve,reject)=>{
            Team.getUnEvaluatedTeams().then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getDeclinedTeams(){
        return new Promise((resolve,reject)=>{
            Team.getDeclinedTeams().then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function getAcceptedTeams(){
        return new Promise((resolve,reject)=>{
            Team.getAcceptedTeams().then(data=>{
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
    }

    function updateTeamStatus(status,id){
        return new Promise((resolve,reject)=>{
            Team.updateTeamStatus(status,id).then(data=>{
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
        deleteAllTeams,
        findTeam,
        getUnEvaluatedTeams,
        getDeclinedTeams,
        getAcceptedTeams,
        updateTeamStatus
    }
}