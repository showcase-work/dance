"use strict"

module.exports = app => {

    let Team = app.models.team;

    function getDashboardStats(){

        return new Promise((resolve,reject)=>{
            var details = {};

            Promise.all([Team.getTeamsOrderedByStatus(), Team.getTeamsOrderedByTime()]).then(data=>{
                details.teamsOrderedByStatus = data[0];
                details.teamsOrderedByTime = data[1];
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