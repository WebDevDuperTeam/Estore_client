const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const {models} = require('../models');
const users = models.users;

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
    async function(username, password, done) {
        try {
            const user = await users.findOne({raw:true, where: {EMAIL: username, LaAdmin: 'USER'}});
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!validPassword(user, password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    })
);

function validPassword(user, password) {
    return user.PASS === password;
}

passport.serializeUser(function(user, done) {
    done(null, {userId: user.USER_ID, fullname: (user.TEN + ' ' + user.HO).toString()});
});

passport.deserializeUser(async function(user, done) {
    return done(null, user);
});

/*passport.deserializeUser(async function(id, done) {
    try {
        const user = await users.findOne({raw:true, where: {USER_ID: id}});
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
});*/

module.exports = passport;
