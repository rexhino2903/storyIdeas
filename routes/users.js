const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

//Loading users model
require('../models/User');
const User = mongoose.model('users');

//Users Routes
router.get('/login', (req, res) => {
    res.render('users/login');
});
router.get('/register', (req, res) => {
    res.render('users/register');
});

// Processing register form
router.post('/register', (req, res) => {
    let errors = [];
    // Register form validation
    if (req.body.password !== req.body.password2) {
        errors.push({ text: 'Passwords do not match!' });
    }
    if (req.body.password.length < 6) {
        errors.push({ text: 'Passwords must be at least 6 characters!' });
    }
    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email
        });
    } else {
           //Checking if user exists.
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                req.flash('error_msg', 'User already registered!');
                res.redirect('/users/register');
            } else {
                // Creating user 
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                // saving user in DB after using bcrypt
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        //Handle error
                        if (err) throw err;
                        // Store hash in your password DB.
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success_msg', 'You are now registerd and can login!')
                            res.redirect('/users/login');
                        }).catch(err => {
                            console.log(err);
                            return;
                        });
                    });  //ending hash function
                });   // Ending generating salt.
            } 
        });
    }
});

// Proccesing login form
router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        failureRedirect: '/users/login',
        successRedirect: '/ideas',
        failureFlash: true
    })(req, res, next);
});

// Implementing logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login');
});

module.exports = router;
