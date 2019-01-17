const express = require('express');
const router = express.Router();


// Main Routes
router.get('/', (req, res) => {
    res.render('home');
});
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;