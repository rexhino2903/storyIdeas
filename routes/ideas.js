const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { authentication } = require('../helper/auth');
// Load Idea Model
require('../models/idea');
const Idea = mongoose.model('ideas');

//Ideas Routes
router.get('/add', authentication, (req, res) => {
    res.render('ideas/add');
});
router.get('/', authentication, (req, res) => {
    Idea.find({ user: req.user.id })
        .sort({ date: 'desc' })
        .then(ideas => res.render('ideas/ideas',
            {
                ideas: ideas
            }
        ));
});
router.get('/edit/:id', authentication, (req, res) => {
    Idea.findById(req.params.id)
        .then(idea => {
            if (idea.user !== req.user.id) {
                req.flash('error_msg', 'Not authenticated');
                res.redirect('/ideas');
            } else {
                res.render('ideas/edit', { idea: idea });
            }
        });
});

// Processing form
router.post('/', authentication, (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({ text: 'Please add a title' })
    }
    if (!req.body.details) {
        errors.push({ text: 'Please add details' })
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newidea = new Idea({
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        });
        newidea.save().then(idea => {
            req.flash('success_msg', 'Video Idea added');
            res.redirect('/ideas');
        });

    }
});

// Updating idea
router.put('/:id', authentication, (req, res) => {
    Idea.findById(req.params.id).then(idea => {
        idea.title = req.body.title;
        idea.details = req.body.details;
        idea.save().then(idea => {
            req.flash('success_msg', 'Video idea updated successfuly');
            res.redirect('/ideas')
        });
    });
});

// Deleting idea
router.delete('/:id', authentication, (req, res) => {
    Idea.findByIdAndRemove(req.params.id).then(() => {
        req.flash('success_msg', 'Video idea removed');
        res.redirect('/ideas');
    });
});

module.exports = router;