const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const bcrypt = require('bcryptjs');


exports.createAccount = [
    body('email', 'Email is required').trim().isLength({min: 5}).isEmail().escape(),
    body('password', 'Password is required').trim().isLength({min: 5}).escape(),
    async function (req,res,next) {
        
        const errors = validationResult(req);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        let user = new User({
            email: req.body.email,
            password: hashedPassword
        });

        if(!errors.isEmpty()) {
            // Handle error inputs.. Most likely send back error to client and display element ??
            return res.json({Error: errors});
        }
        else {
            User.findOne({email: req.body.email}).exec( (err, userFound) => {
                

                if (err) return next(err);

                // TO DO: Implement Message for browser
                if(userFound) return res.json({Message: 'Email is already in use.'}); 

                else {
                    user.save((err) => {

                        if(err) return next(err);
                        
                        // On successful user save, log user in and send appropriate redirect URL.
                        req.login(user, function(err) {
                            if(err) {
                                console.log('An error occured')
                                return res.json({
                                    redirectURL: '/signup',
                                    Message: 'An error occured'
                                })
                            }

                            console.log('Signup Successful')
                            req.session.save()
                            return res.json({
                                redirectURL: '/dashboard',
                                Message: 'Signup Successful'
                            })
                        })
                    })
                }
            })           
        }
    }
]