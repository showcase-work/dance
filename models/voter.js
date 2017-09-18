"use strict";
let Sequelize = require("sequelize");
let bcrypt = require('bcrypt-nodejs');
let SALT_WORK_FACTOR = 12;

module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    var Voter = sequelize.define("voters", {
            id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
            email: {
                type: Sequelize.STRING
        },
            name: {
                type: Sequelize.STRING
        },
            voted: {
                type: Sequelize.STRING
        },
            facebook: {
                type: Sequelize.STRING
        },
            createdAt: {
                type: Sequelize.DATE
        },
            updatedAt: {
                type: Sequelize.DATE
        },
            password:{
                type: Sequelize.STRING
            }

    },
    {
        tableName: "voters",
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

    Voter.beforeCreate(function(user, options) {
        var hashedPw = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        user.password = hashedPw;
    });

    function addVote(teamId, voterId){
        return Voter.update({
            voted:teamId
        },{
            where:{id:voterId}
        })
    }

    function registerVoter(email,name,password){
        return new Promise((resolve,reject)=>{
            Voter.findAll({
                where:{
                    email:email
                }
            }).then(data=>{
                console.log(data);
                if(data.length>0){
                    if(data[0].facebook != "signup"){
                        return reject("already logged in with facebook");
                    }
                    else
                    {
                        return reject("email already exists");
                    }
                }
                else
                {
                    Voter.create({
                        email:email,
                        name:name,
                        voted:null,
                        facebook:"signup",
                        password:password
                    }).then(data=>{
                        return resolve(data);
                    }).catch(err=>{
                        return reject(err);
                    })
                }
            })
        })
    }

    return {
        Voter,
        addVote,
        registerVoter
    };
};
