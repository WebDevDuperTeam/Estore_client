const passport = require('../../auth/passport');

exports.showAuthLayout = (req, res) => {
    res.render('auth/authLayout', {wrongPassword: req.query.wrongPassword !== undefined});
}

exports.signIn = (req, res) => {
    console.log('Login Successfully');
    if(req.user){
        res.redirect('/');
    }
    else{
        res.redirect('/auth');
    }
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}