module.exports = app => {
    const users = require('../controllers/users');

    app.post('/api/users', users.add);
}