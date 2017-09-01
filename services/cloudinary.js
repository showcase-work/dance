"use strict";
let cloudinary = require('cloudinary');

module.exports = app => {
    let logger = app.helpers.logger;
    let config = app.config.servicesVariables.cloudinary.config;
    cloudinary.config(config);

    function uploadVideo(video){
        return new Promise((resolve,reject)=>{
            cloudinary.v2.uploader.upload(video.path, 
                    { resource_type: "video" 
                    },
                    function(error, result) {
                        if(error){
                            return reject({"error":error})
                        }
                        else
                        {
                            if(result.duration > 31){

                                cloudinary.uploader.destroy(result.public_id, function(result) {
                                            console.log(result) }, { resource_type: "video" });
                                return reject({"error":"video size cannot be bigger than 30 seconds"});
                            }
                            else if(result.height > result.width){
                                return reject({"error":"Video should be in horizontal orientation"})
                            }
                            else
                            {
                              return resolve(result);  
                            }
                        }
                    });
            });
    }
    return {
        uploadVideo
    };
};