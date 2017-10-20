
const Doctor = require('mongoose').model('Doctor');

module.exports = {
    getUser: (req, res) => { 
        let user = {};
        if (req.user) {
            user._id = res.locals.user._id;
            user.firstName = res.locals.user.firstName;
            user.lastName = res.locals.user.lastName;
            user.egn = res.locals.user.egn;
            user.phone = res.locals.user.phone;
            user.address = res.locals.user.address;
            user.speciality = res.locals.user.speciality;
            user.email = res.locals.user.email;
            user.role = res.locals.user.role;
        }
        res.json(user)
    },

    edit: (req, res) => {
        let newUser = req.body;
        Doctor.findByIdAndUpdate({ _id: newUser._id }, newUser, { upsert: true })
        .then(() => {
            res.json('Success');
        })
        .catch(error => {
            res.status(400).send(error);
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    }
}