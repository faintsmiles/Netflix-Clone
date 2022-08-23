const passport = require('passport');

exports.logoutAccount = function (req, res, next) {
    // Clear user's session stored on the server
    req.session.destroy( function (err) {
        // Clear user's cookie stored in the browser
        res.clearCookie('connect.sid', {path: '/'}).status(200).send('Ok.');
    })
}