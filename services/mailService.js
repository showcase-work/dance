"use strict";

let mailjet = require ('node-mailjet');
let ejs = require("ejs");
let path = require('path');


module.exports = app => {
    
    mailjet.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)  ;


    function sendRegistrationMail(data){

        ejs.renderFile(path.join(__dirname,"../views/email.ejs"), {data:data}, {}, function(err, str){
            
            /*var request = mailjet
                        .post("send")
                        .request({
                            "FromEmail":"pilot@mailjet.com",
                            "FromName":"Mailjet Pilot",
                            "Subject":"Your email flight plan!",
                            "Text-part":"Dear passenger, welcome to Mailjet! May the delivery force be with you!",
                            "Html-part":str,
                            "Recipients":[{"Email":"passenger@mailjet.com"}]
                        })

            request
                .then(result => {
                    console.log(result.body)
                })
                .catch(err => {
                    console.log(err.statusCode)
                })*/
        });


        console.log("working in sending mail");
        /*var request = mailjet
            .post("send")
            .request({
                "FromEmail":"pilot@mailjet.com",
                "FromName":"Mailjet Pilot",
                "Subject":"Your email flight plan!",
                "Text-part":"Dear passenger, welcome to Mailjet! May the delivery force be with you!",
                "Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
                "Recipients":[{"Email":"passenger@mailjet.com"}]
            })

        request
            .then(result => {
                console.log(result.body)
            })
            .catch(err => {
                console.log(err.statusCode)
            })*/

    }

    return{
        mailjet,
        sendRegistrationMail
    }
}