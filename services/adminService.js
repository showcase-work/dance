"use strict"

let json2csv = require('json2csv');

module.exports = app => {

    let Team = app.models.team;
    let Voter = app.models.voter;

    


    function getDashboardStats(){

        return new Promise((resolve,reject)=>{
            var details = {};

            Promise.all([Team.getTeamsOrderedByStatus(), Team.getTeamsOrderedByTime(), Team.getTotalNumberOfMembers(),Voter.getVotesByType(), Team.getTeamsByPlace()]).then(data=>{
                
                console.log(data[4]);
                details.teamsOrderedByStatus = data[0];
                details.teamsOrderedByTime = data[1];
                details.totalMembers = data[2];
                details.voterDetails = data[3];
                details.teamsByPlace = data[4];
                return resolve(details);
            }).catch(err=>{
                return reject(err);
            })

        })
    }

    function getDownloadReport(req,res,next){
        var fieldNames = ['Team', 'City','State','VideoLink','Status','RepName','RepEmail'];
        var fields = ['teamName', 'city','state','videoLink','status','representativeName','representativeEmail'];

        Team.getAllTeamsForReport().then(data=>{
            console.log(data);
            var csv = json2csv({ data: data, fields: fields, fieldNames: fieldNames });
            res.setHeader('Content-disposition', 'attachment; filename=teams.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
            
        })
    }

    function getDownloadReportAllVotes(req,res,next){
        var fieldNames = ['Team', 'City','State','VideoLink','Status','RepName','RepEmail','Votes'];
        var fields = ['teamName', 'city','state','videoLink','status','representativeName','representativeEmail','votes'];

        Team.getDownloadReportAllVotes().then(data=>{
            console.log(data);
            var csv = json2csv({ data: data, fields: fields, fieldNames: fieldNames });
            res.setHeader('Content-disposition', 'attachment; filename=votes.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }).catch(err=>{
            console.log(err);
        })
    }

    function getDownloadReportAllVoters(req,res,next){
        var fieldNames = ['Name', 'Email','Location','FacebookId'];
        var fields = ["name","email","location","facebook"];

        Voter.getDownloadReportAllVoters().then(data=>{
            var csv = json2csv({ data: data, fields: fields, fieldNames: fieldNames });
            res.setHeader('Content-disposition', 'attachment; filename=voters.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(csv);
        }).catch(err=>{
            console.log(err);
        })

    }

    return {
        getDashboardStats,
        getDownloadReport,
        getDownloadReportAllVotes,
        getDownloadReportAllVoters
    };
}