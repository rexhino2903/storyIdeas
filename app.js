const express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    passport = require('passport');
    flash = require('connect-flash'),
    session = require('express-session');

const app = express();

// Configuring passport
require('./config/passport')(passport);

//Connecting mongoose
mongoose.connect('mongodb://localhost/storyideas', { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//Express-handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method-override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect-flash midleware
app.use(flash());

// Flash global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null ;
    next();
});

// Load routes
const ideasRoutes = require('./routes/ideas');
const usersRoutes = require('./routes/users');

// Main Routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/about', (req, res) => {
    res.render('about');
});

//Using Routes
app.use('/ideas', ideasRoutes);
app.use('/users', usersRoutes);

// Starting the server
app.listen('5000', () => {
    console.log('Server started at port 5000');
});