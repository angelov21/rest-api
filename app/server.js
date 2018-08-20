const STATUS_CODES = require('./constants/status-codes');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { url } = require('../config');
const app = express();
const PORT = 8080;
const authMiddleware = require('./utils/auth');
const users = require('./controllers/users.js');

mongoose.Promise = global.Promise;

//Handle deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('Error connecting'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes/orders')(app, authMiddleware);
require('./routes/products')(app, authMiddleware);
require('./routes/users')(app);

app.post('/login', users.authenticate);

app.get('*', function (req, res) { 
    res.status(STATUS_CODES.NOT_FOUND).send('Route not found'); 
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))


