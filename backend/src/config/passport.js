const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users')

passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //confirmar si el correo coincide
    const user = await User.findOne({email});

    if (!user){
        return done(null, false, {message: "not user found"});
    } else {
        //comprobación de contraseñas
        const match = await user.validatePassword(password);

        if(match){
            return done(null, user);
        } else {
            return done(null, false, {message: 'incorrect password'});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})