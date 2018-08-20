
const STATUS_CODES = require('../constants/status-codes');
const Product = require('../models/product');

//Get all products
exports.getAll = (req,res) => {
    Product.find().sort({ _id: 1 })
        .then(products => {
            res.status(STATUS_CODES.OK).send(products);
        })
        .catch(err => {
            res.status(STATUS_CODES.ERROR).send({
                message: err.message || 'Error while retrieving products.'
            });
        });
};

// Add a new product
exports.add = (req, res) => {
    const { body } = req;
    const { name, price, category } = body;

    if(!name || !price || !category) {
        return res.status(STATUS_CODES.BAD_REQUEST).send({
            message: 'Bad request'
        });
    }
    
    const newProduct = new Product(body);

    newProduct.save()
        .then(data => {
            res.status(STATUS_CODES.CREATED).send(data);
        })
        .catch(err => {
            res.status(STATUS_CODES.ERROR).send({
                message: err.message
            });
        });
};

// Edit a product identified by the id in the request
exports.edit = (req, res) => {
    const { params: { productId } } = req;

    if(!productId) {
        return res.status(STATUS_CODES.BAD_REQUEST).send({
            message: 'Invalid id'
        });
    }

    Product.findByIdAndUpdate(productId, {
        name: req.body.name,
        category: req.body.category
    }, { new: true })
        .then(product => {
            if(!product) {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message: `Product with id:${productId} not found`
                });
            }
            res.send(product);
        })
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message:  `Product with id:${productId} not found`
                });                
            }
            return res.status(STATUS_CODES.ERROR).send({
                message: `Error updating product with id:${ productId }`
            });
        });
};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {
    const { params: { productId } } = req;

    Product.findByIdAndRemove(productId)
        .then(product => {
            if(!product) {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message: `Product with id:${productId} not found`
                });
            }

            res.status(STATUS_CODES.OK).send({ message: 'Product deleted successfully!' });
        })
        .catch(err => {
            if(err.name === 'NotFound') {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message: `Product with id:${productId} not found`
                });                
            }
            return res.status(STATUS_CODES.ERROR).send({
                message: `Error deleting product with id:${productId}`
            });
        });
};