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
                'FromName': 'Seat México',
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

    return{
        sendEmail,
        sendRegistrationMail
    }
}
