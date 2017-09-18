"use strict";

module.exports = app => {
    let loginController = app.controllers.loginController;


    app.use("/login", app.routes.login);
    app.use("/team", app.routes.team);
    app.use("/essay", app.routes.essay);
    app.use("/main", app.routes.main);
    app.use("/voter", app.routes.voter);

    app.get("/", (req, res, next) => {
        res.render("register");
        //return loginController.handleRoute(req, res, next);
        //
    });

    app.get("/userdashboard", (req,res,next) => {
        res.render("userdashboard");
    })

    app.get("/sendsuccess", (req,res,next) => {
        res.send("success");
    })

    app.get("/senderror", (req,res,next) => {
        res.send("username or password is invalid");
    })

    app.use("/admin", app.routes.admin);

    app.get("/logout", (req,res,next)=> {
        req.logout();
        res.redirect("/");
    })


};