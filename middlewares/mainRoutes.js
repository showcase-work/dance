"use strict";

module.exports = app => {
    let loginController = app.controllers.loginController;


    app.use("/login", app.routes.login);
    app.use("/team", app.routes.team);
    app.use("/essay", app.routes.essay);
    app.use("/main", app.routes.main);

    app.get("/", (req, res, next) => {
        res.render("register");
        //return loginController.handleRoute(req, res, next);
        //
    });

    app.get("/userdashboard", (req,res,next) => {
        res.render("userdashboard");
    })

    app.get("/logout", (req,res,next)=> {
        req.logout();
        res.redirect("/");
    })


};