const bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      passport = require('passport'),
      flash = require('connect-flash'),
      session = require('express-session'),
      exphbs = require('express-handlebars');

module.exports = (app) => {

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
        res.locals.user = req.user || null;
        next();
    });
}