
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
    }
}