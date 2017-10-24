const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('../models/Doctor');

const authenticateDoctor = (email, password, done) => {
    Doctor.findOne({email: email})
    .then(doctor => {
        if (!doctor) {
            return done(null, false);
        }

        if (!doctor.active) {
            return done(null, false);
        }

        if (!doctor.authenticate(password)) {
            return done(null, false);
        }

        return done(null, doctor);
    });
};

module.exports = () => {    
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, authenticateDoctor));

    passport.serializeUser((doctor, done) => {
        if (!doctor) {
            return done(null, false);
        }
        return done(null, doctor.id);
    });

    passport.deserializeUser((id, done) => {
        Doctor.findById(id).then((doctor) => {
            if (!doctor) {
                return done(null, false)
            }

            return done(null, doctor);
        })
    })
};


