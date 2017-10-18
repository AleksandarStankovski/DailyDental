const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

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

    app.post("/login", passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
        } else {
            return res.sendFile(config.rootFolder + '/login/login.html');
        }
        next();
    });

    app.use(express.static(path.join(config.rootFolder, 'dist')));
};
