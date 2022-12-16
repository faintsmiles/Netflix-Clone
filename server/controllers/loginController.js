const passport = require('passport');

// The React application expects a JSON response
// so we've overridden default behavior for auth failure and auto set session with req.logIn()
exports.loginAccount = function (req,res,next)  { 
    passport.authenticate('local', function( err, user, info) {
        
        if(err) { return next(err); }

        if(!user) { return res.json({redirectURL: '/login', Message: 'Authorized failed'})} // User does not exist

        
        req.logIn( user, function(err) {
            
            if(err) { return next(err); }
                       
            return res.json({
                redirectURL: '/dashboard',
                Message: 'Login Successful'
            })
        })

    })(req,res,next)
}

