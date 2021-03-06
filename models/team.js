"use strict";
let Sequelize = require("sequelize");
let bcrypt = require('bcrypt-nodejs');
let SALT_WORK_FACTOR = 12;

module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    var Team = sequelize.define("team", {
            id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
            email: {
                type: Sequelize.STRING
        },
            teamName: {
                type: Sequelize.STRING
        },
            password: {
                type: Sequelize.STRING
        },
            createdAt: {
                type: Sequelize.DATE
        },
            updatedAt: {
                type: Sequelize.DATE
        },
            role: {
                type: Sequelize.STRING
        },
            status:{
                type: Sequelize.STRING
        },
            teamMembers:{
                type: Sequelize.STRING
        },
            representativeName:{
                type: Sequelize.STRING
        },
            representativeEmail:{
                type: Sequelize.STRING
        },
            representativeNumber:{
                type: Sequelize.STRING
        },
            city:{
                type: Sequelize.STRING
        },
            state:{
                type: Sequelize.STRING
        },
            videoLink:{
                type:Sequelize.STRING
        },
            duration:{
                type:Sequelize.STRING
        },
            public_id:{
                type:Sequelize.STRING
        },
            statusText:{
                type:Sequelize.STRING
        },
            votes:{
                type:Sequelize.TEXT
        },
            votesCount:{
                type:Sequelize.INTEGER
        }

    },
    {
        tableName: "team",
        timestamps: true,
        instanceMethods: {
            generateHash: function(password){
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },

            validPassword: function(password){
                console.log(bcrypt);
                return bcrypt.compareSync(password, this.password);
            },
            toJSON: function () {
                console.log("tojson");
              var values = Object.assign({}, this.get());
              delete values.password;
              return values;
            }
        }

    });

    Team.beforeCreate(function(user, options) {
        var hashedPw = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        user.password = hashedPw;
    });


    function getTeam(id){
            console.log("working in getme model");
            return Team.findById(id);
    }


    function createNewTeam(params){
        console.log(User);
        console.log("working here");
            console.log(params);
            return Team.create({username:params.username, password:params.password});
    }

    function getAllTeams(){
        return Team.findAll()
    }

    function getAllTeamsForReport(){
        return Team.findAll({
            raw:true,
            attributes:["teamName","city","state","videoLink","status","representativeName","representativeEmail"]
        });
    }

    function deleteTeam(id){
        return Team.destroy({
            where:{
                id:id
            }
        })
    }

    function createNewRegistration(data){

        console.log("working in create new registration");
        var teamMembers = [];
        var representativeName = {};
        representativeName.firstName = data.representativeName;
        representativeName.lastName = data.representativeLastName;
        var i = 0;
        data.teamMemberName.forEach(teamMemberName=>{
            teamMembers.push({firstName:teamMemberName, lastName:data.teamMemberLastName[i]})
            i++;
        })
        return Team.create({
            email: data.email,
            teamName: data.teamName,
            role: "team",
            status:"En evaluación",
            teamMembers:JSON.stringify(teamMembers),
            representativeName:JSON.stringify(representativeName),
            representativeEmail:data.teamRepresentativeEmail,
            representativeNumber:data.teamRepresentativeNumber,
            city:data.city,
            state:data.state,
            videoLink:data.video_url,
            duration:data.duration,
            public_id:data.public_id,
            password:data.password
        });
    }

    function findByTeamId(email){
        return Team.findAll(
            {
                where:{
                    email:email
                }
            })
    }

    function checkTeamName(name){
        return Team.findAll({
            where:{teamName:name}
        })
    }

    function deleteAllTeams(){
        return Team.destroy({
            where: {},
            truncate: true
        })
    }

    function findTeam(query){
        return Team.findAll({
            where: {
                status:"Accepted",
                $or: [
                    {
                      teamName: {
                        $like: '%'+query+'%'
                      }
                    },
                    {
                      representativeName: {
                        $like: '%'+query+'%'
                      }
                    },
                    {
                      representativeEmail: {
                        $like: '%'+query+'%'
                      }
                    },
                    {
                      city: {
                        $like: '%'+query+'%'
                      }
                    },
                    {
                      state: {
                        $like: '%'+query+'%'
                      }
                    }
                ]
            },
        })
    }

    function getTeamsOrderedByStatus(){
        return Team.findAll({
            raw:true,
            attributes:[
                [Sequelize.fn("COUNT", Sequelize.col("id")),"count"],
                "status"
            ],
            group:"status"
        })
    }

    function getTeamsOrderedByTime(){
        return Team.findAll({
            raw:true,
            attributes:[
                [Sequelize.fn("COUNT", Sequelize.col("id")),"count"],
                [Sequelize.fn("DATE_FORMAT", Sequelize.literal("`createdAt`,'" + "%d %M %Y" + "'")), "date"]
            ],
            group:[Sequelize.fn("DATE_FORMAT", Sequelize.literal("`createdAt`,'" + "%d %M %Y" + "'"))],
            order:"createdAt"
        })
    }

    function getUnEvaluatedTeams(){
        return Team.findAll({
            where:{
                status:"En evaluación"
            }
        })
    }

    function getAcceptedTeams(){
        return Team.findAll({
            where:{
                status:"Accepted"
            }
        })
    }

    function getDeclinedTeams(){
        return Team.findAll({
            where:{
                status:"Declined"
            }
        })
    }

    function updateTeamStatus(status,statusText,id){
        return Team.update({
            status:status,
            statusText:statusText
        },{
            where:{
                id:id
            }
        })
    }

    function getAllTeamsByStatus(status){
        return Team.findAll({
            where:{
                status:status
            }
        })
    }

    function addVote(teamId, voterId){
        return new Promise((resolve,reject)=>{
            Team.findById(teamId).then(data=>{
                console.log("found team");
                var votes = [];
                var votesCount = 0;

                if(data.votes){
                    votes = JSON.parse(data.votes);
                    console.log("votes are");
                    console.log(votes);
                }
                if(data.votesCount){
                    console.log("vote count is");
                    console.log(data.votesCount);
                    votesCount=parseInt(data.votesCount);
                }
                votesCount++;
                console.log("vote count post is");
                console.log(votesCount);
                votes.push(voterId);
                console.log(votes);
                Team.update({
                    votes:JSON.stringify(votes),
                    votesCount:votesCount
                },{
                    where:{
                        id:teamId
                    }
                }).then(data=>{
                    console.log(data);
                    return resolve(data);
                }).catch(err=>{
                    console.log(err);
                    return reject(err);
                })
            }).catch(err=>{
                return reject(err);
            })
        })
        
    }

    function getTotalNumberOfMembers(){
        return new Promise((resolve,reject)=>{
            var numberOfMembers = 0;
            Team.findAll({raw:true}).then(data=>{
                numberOfMembers=data.length;
                data.forEach((team)=>{
                    if(team.teamMembers){
                        var count = 0;
                        var members = JSON.parse(team.teamMembers);
                        members.forEach(member=>{
                            if(member.firstName || member.lastName){
                                if(member.firstName.trim()=="" && member.lastName.trim()==""){

                                }
                                else
                                {
                                    count++;
                                }
                            }
                        })
                        numberOfMembers=numberOfMembers+count;
                    }
                })
                console.log(numberOfMembers);
                return resolve(numberOfMembers);
            })
        })
    }

    function getTeamsByPlace(){
        return new Promise((resolve,reject)=>{
            return Team.findAll({
                raw:true,
                attributes:[
                    [Sequelize.fn("COUNT", Sequelize.col("id")),"count"],
                    "city"
                ],
                where:{
                    status:"Accepted"
                },
                group:"city",
                order:"count DESC"
            }).then(data=>{
                console.log("hehehehe");
                return resolve(data);
                console.log(data);
            }).catch(err=>{
                console.log("errr");
                console.log(err);
                
            })
        })
        
    }

    function getDownloadReportAllVotes(){

        return Team.findAll({
            raw:true,
            where:{
                votesCount:{
                    $ne: null
                }
            },
            attributes:["teamName","city","state","videoLink","status","representativeName","representativeEmail","votesCount"],
            order:"votesCount DESC"
        })
    }

    function getTeamById(id){
        return Team.findById(id,{raw:true});
    }

    function deleteVoteByVoterId(id){
        console.log("deleteVoteByVoterId:"+id);
        return new Promise((resolve,reject)=>{
            Team.findAll({raw:true, where:{status:"Accepted"}}).then(teamDataArray=>{
                var promises = [];
                teamDataArray.forEach(teamData=>{
                    var votes = JSON.parse(teamData.votes);
                    var index=votes.indexOf(id);
                    if(index > -1){
                         
                         votes.splice(index, 1);
                         
                         var votesCount = votes.length;
                         var votesToSave=JSON.stringify(votes);

                         var promise = Team.update({
                            votes:votesToSave,
                            votesCount:votesCount
                         },{
                            where:{
                                id:teamData.id
                            }
                         })

                         promises.push(promise);
                    }
                })

                Promise.all(promises).then(data=>{
                    return resolve("all complete with this id");
                }).catch(err=>{
                    console.log("error coming on thisone");
                    return reject(err);
                })
            })
        })
        
    }

    return {
        Team,
        getTeam,
        createNewTeam,
        getAllTeams,
        deleteTeam,
        createNewRegistration,
        findByTeamId,
        checkTeamName,
        deleteAllTeams,
        findTeam,
        getTeamsOrderedByStatus,
        getTeamsOrderedByTime,
        getUnEvaluatedTeams,
        getDeclinedTeams,
        getAcceptedTeams,
        updateTeamStatus,
        getAllTeamsByStatus,
        addVote,
        getTotalNumberOfMembers,
        getTeamsByPlace,
        getAllTeamsForReport,
        getDownloadReportAllVotes,
        getTeamById,
        deleteVoteByVoterId
    };
};
