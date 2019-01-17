// Load routes
const main = require('./routes/main');
const ideasRoutes = require('./routes/ideas');
const usersRoutes = require('./routes/users');

module.exports = (app) => {
    //Using Routes
    app.use('/', main);
    app.use('/ideas', ideasRoutes);
    app.use('/users', usersRoutes);
}

