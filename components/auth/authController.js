const passport = require('../../auth/passport');

exports.showAuthLayout = (req, res) => {
    res.render('auth/authLayout');
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