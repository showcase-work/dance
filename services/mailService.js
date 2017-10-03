"use strict";

let Mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

let ejs = require("ejs");
let path = require('path');


module.exports = app => {

    var sendEmail = Mailjet.post('send');



    function sendRegistrationMail(data){

        ejs.renderFile(path.join(__dirname,"../views/email.ejs"), {user:data}, {}, function(err, str){

            var emailData = {
                'FromEmail': 'experiencia@nuevoibiza.com',
                'FromName': 'SEAT México',
                'Subject': 'Hemos recibido tu registro. ¡Muéstranos tus mejores pasos!',
                'Text-part': '',
                'Html-part': str,
                'Recipients': [{'Email': data.representativeEmail}]
            }

            sendEmail
              .request(emailData)
                .then(function(data){
                    console.log("mail sent working");
                })
                .catch(function(err){
                    console.log("mail sent not wokring");
                    console.log(err);
                });


        });

    }

    function sendMailToVoter(email,name,password){
        ejs.renderFile(path.join(__dirname,"../views/emailForVoters.ejs"), {password:password}, {}, function(err, str){
                var emailData = {
                    'FromEmail': 'experiencia@nuevoibiza.com',
                    'FromName': 'SEAT México',
                    'Subject': 'Your Password to Vote',
                    'Text-part': 'welcome '+name+', Your password to login into SEAT is '+password,
                    'Html-part': str,
                    'Recipients': [{'Email': email}]
                }
                sendEmail
                  .request(emailData)
                    .then(function(data){
                        console.log("mail sent working");
                    })
                    .catch(function(err){
                        console.log("mail sent not wokring");
                        console.log(err);
                    });
        });
    }

    return{
        sendEmail,
        sendRegistrationMail,
        sendMailToVoter
    }
}
