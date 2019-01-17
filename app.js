const express = require('express');
const passport = require('passport');

const app = express();

// Configuring passport
require('./config/passport')(passport);

// Loading database
require('./startup/database')();

// Loading middlewares
require('./startup/middlewares')(app);

//Loading routes
require('./startup/routes')(app);

// Starting the server
const port = process.env.PORT || '5000';

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});