const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

module.exports = function (app, config) {
    // This set up which is the parser for the request's data.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // We will use cookies.
    app.use(cookieParser());

    // Session is storage for cookies, which will be de/encrypted with that 'secret' key.
    app.use(session({secret: 's3cr3t5tr1ng', resave: false, saveUninitialized: false}));

    // For user validation we will use passport module.
    app.use(passport.initialize());
    app.use(passport.session());

    // app.use((req, res, next) => {
    //     console.log(req)
    //     if(req.doctor){
    //         res.locals.user = req.doctor;
    //     }

    //     next();
    // });

    app.use(express.static(path.join(config.rootFolder, 'dist')));
};
