"use strict"

module.exports = app => {

    let Team = app.models.team;
    let Voter = app.models.voter;

    function getDashboardStats(){

        return new Promise((resolve,reject)=>{
            var details = {};

            Promise.all([Team.getTeamsOrderedByStatus(), Team.getTeamsOrderedByTime(), Team.getTotalNumberOfMembers(),Voter.getVotesByType()]).then(data=>{
                details.teamsOrderedByStatus = data[0];
                details.teamsOrderedByTime = data[1];
                details.totalMembers = data[2];
                details.voterDetails = data[3];
                return resolve(details);
            }).catch(err=>{
                return reject(err);
            })

        })
    }

    return {
        getDashboardStats
    };
}