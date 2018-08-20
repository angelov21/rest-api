module.exports = (app, middleware) => {
    const orders = require('../controllers/orders');

    app.post('/api/orders', middleware, orders.add);
    app.get('/api/orders', orders.getAll);
    app.put('/api/orders/:orderId', middleware, orders.edit);
    app.delete('/api/orders/:orderId', middleware, orders.delete);
}