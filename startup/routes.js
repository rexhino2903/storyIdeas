// Load routes
const mainRoutes = require('../routes/main');
const ideasRoutes = require('../routes/ideas');
const usersRoutes = require('../routes/users');

module.exports = (app) => {
    //Using Routes
    app.use('/', mainRoutes);
    app.use('/ideas', ideasRoutes);
    app.use('/users', usersRoutes);
}

