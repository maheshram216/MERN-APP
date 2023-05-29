const express = require('express');
const router = express.Router();
const userSchema = require('../model/userModel');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = 'secret';

router.get('/', async (req, res) => {
    try {
        const user = await userSchema.find();
        res.status(200).json({
            status: 'Success',
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            meassage: error.meassage
        });
    };

});

router.post('/register',
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }), async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            };

            let { name, email, password, cpassword } = req.body;

            const user = await userSchema.findOne({ email });

            if (user) {
                return res.status(400).json({
                    status: "Fialed",
                    message: "User Exist"
                });
            };

            if (password != cpassword) {
                return res.status(400).json({
                    status: "Fialed",
                    message: "passowrd not match"
                });
            }
            bcrypt.hash(password, 10, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return res.status(400).json({
                        status: "Not OK",
                        message: err.message
                    });
                };

                const user = await userSchema.create(
                    {
                        name,
                        email,
                        password: hash,
                        cpassword
                    }
                );
                res.status(200).json({
                    status: 'Success',
                    user
                });
            });

        } catch (error) {
            res.status(400).json({
                status: 'Failed',
                meassage: "Catched error"
            });
        };

    });

router.post('/login', body('email').isEmail(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        const { email, password } = req.body;

        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({
                status: "Fialed",
                message: "User not Exist"
            });
        };
        // console.log(user);
        // Load hash from your password DB.

        bcrypt.compare(password, user.password, function (err, result) {
            // result == true
            if (err) {
                res.status(404).json({
                    status: 'Failed',
                    message: err.message
                });
            };
            if (result) {
                const token = jwt.sign({
                    data: user._id
                }, secret, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'Success',
                    message: 'Login Successful',
                    token
                });
            } else {
                res.status(400).json({
                    status: 'Password Enterd Wrong',
                });
            };
        });

    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            meassage: "Catched error"
        });
    };

});
module.exports = router;