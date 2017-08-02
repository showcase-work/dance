"use strict";

module.exports = app =>{
    let studentService = app.services.studentService;

    function checkAndRegisterStudent(req,res,next){
        console.log("working in here");
        studentService.checkAndRegisterStudent(req.body).then(data=>{
            console.log("here3");
            res.send(data);
        }).catch(err=>{
            console.log(err);
        })
    }

    return {
        checkAndRegisterStudent
    }
}