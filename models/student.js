"use strict";
let Sequelize = require("sequelize");
let bcrypt = require('bcrypt-nodejs');
let SALT_WORK_FACTOR = 12;
module.exports = app => {

    let sequelize = app.db.connection;
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    var Student = sequelize.define("students", {  
        id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
        },
        email: {
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
        status: {
                type: Sequelize.STRING
        },
        essay: {
                type: Sequelize.TEXT
        },
        curp: {
                type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        middlename: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        school:{
            type:Sequelize.STRING
        },
        entity:{
            type:Sequelize.STRING
        },
        grade:{
            type:Sequelize.INTEGER
        }
    },
    {
        tableName: "students",
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

    Student.beforeCreate(function(user, options) {
        var hashedPw = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);
        user.password = hashedPw;
    });


    function getStudent(id){
            console.log("working in getme model");
            return Student.findById(id);
    }

 
    function createNewStudent(params){
        console.log(User);
        console.log("working here");
            console.log(params);
            return Student.create({username:params.username, password:params.password});
    }

    function getAllStudents(){
        return Student.findAll()
    }

    function deleteStudent(id){
        return Student.destroy({
            where:{
                id:id
            }
        })
    }

    function createNewRegistration(data){
        return Student.create({
            email:data.email,
            name:data.name,
            middlename:data.middleName,
            lastname:data.lastName,
            entity:data.entity,
            password:data.password,
            school:data.school,
            curp:data.curp
        });
    }

    function findByEmail(email){
        return Student.findAll(
            {where:{email:email}}
            )
    }

    return {
        Student,
        getStudent,
        createNewStudent,
        getAllStudents,
        deleteStudent,
        createNewRegistration,
        findByEmail
    };
};
