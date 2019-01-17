const mongoose = require('mongoose');
const {url} = require('../config/dbConfig');

module.exports = () => {
    //Connecting mongoose
    mongoose.connect(url, { useNewUrlParser: true })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
}
