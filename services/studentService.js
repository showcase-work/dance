"use strict";

module.exports = app => {

    let Student = app.models.student;

    function checkAndRegisterStudent(data){
        return new Promise((resolve,reject)=>{
            console.log("here");
            Student.createNewRegistration(data).then(data=>{
                console.log("here2");

                console.log(data);
                return resolve(data);
            }).catch(err=>{
                return reject(err);
            })
        })
        
    }

    return{
        checkAndRegisterStudent
    }
}