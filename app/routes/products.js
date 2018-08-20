module.exports = (app, middleware) => {
    const products = require('../controllers/products');

    app.post('/api/products', middleware, products.add)
    app.get('/api/products', products.getAll);
    app.put('/api/products/:productId', middleware, products.edit);
    app.delete('/api/products/:productId', middleware, products.delete);
}