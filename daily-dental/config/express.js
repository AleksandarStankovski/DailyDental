const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const Clinic = require('mongoose').model('Clinic');
const Doctor = require('mongoose').model('Doctor');
const encryption = require('../utilities/encryption');

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
            Clinic.find({})
            .then(clinics => {
                if (clinics.length === 0) {
                    let clinic = {
                        name: 'Clinic name'
                    }
                    return Clinic.create(clinic)
                    .then(clinic => {
                        return clinic;  
                    })
                }
            })
            .then(() => {
                return Doctor.find()
                .then(doctors => {
                    if (doctors.length === 0) {
                        let salt = encryption.generateSalt();
                        let passwordHash = encryption.hashPassword('admin', salt);
                        let doctor = {
                            firstName: 'Admin',
                            lastName: 'Admin',
                            speciality: 'aesthetic',
                            email: 'admin@admin.com',
                            role: 'admin',
                            salt: salt,
                            passwordHash: passwordHash

                        }
                        return Doctor.create(doctor)
                        .then(doctor => {
                            return doctor;  
                        })
                    }
                })
            })
            .then(doctor => {
                if (doctor) {
                    return Clinic.update(
                        { },
                        { $push: { doctors: doctor._id } }
                    ) 
                }
            })
            .then(() => {})
            .catch(error => {
                console.log(error)
            });

            return res.sendFile(config.rootFolder + '/login/login.html');
        }
        next();
    });

    app.use(express.static(path.join(config.rootFolder, 'dist')));
};
