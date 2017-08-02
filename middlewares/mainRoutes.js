"use strict";

module.exports = app => {
    let loginController = app.controllers.loginController;


    app.use("/login", app.routes.login);
    app.use("/student", app.routes.student);
    app.use("/essay", app.routes.essay);

    app.get("/", (req, res, next) => {
        res.render("register");
        //return loginController.handleRoute(req, res, next);
        //
    });



};