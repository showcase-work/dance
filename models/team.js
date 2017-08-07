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

    function deleteTeam(id){
        return Team.destroy({
            where:{
                id:id
            }
        })
    }

    function createNewRegistration(data, filename){
        console.log("working in create new registration");
        return Team.create({
            email: data.email,
            teamName: data.teamName,
            role: "team",
            status:"evaluation",
            teamMembers:JSON.stringify(data.teamMemberName),
            representativeName:data.representativeName,
            representativeEmail:data.teamRepresentativeEmail,
            representativeNumber:data.teamRepresentativeNumber,
            city:data.city,
            state:data.state,
            videoLink:filename
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

    return {
        Team,
        getTeam,
        createNewTeam,
        getAllTeams,
        deleteTeam,
        createNewRegistration,
        findByTeamId
    };
};
