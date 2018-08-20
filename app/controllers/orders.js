const STATUS_CODES = require('../constants/status-codes');
const Order = require('../models/order');

//Get all orders
exports.getAll = (req, res) => {
    Order.find().sort({ _id: 1 })
        .then(orders => {
            res.status(STATUS_CODES.OK).send(orders);
        })
        .catch(err => {
            res.status(STATUS_CODES.ERROR).send({
                message: err.message || "Error while retrieving orders."
            });
        });
};

// Add a new order
exports.add = (req, res) => {
    const { body } = req;
    const { products, status } = body;

    if (!products || !status) {
        return res.status(STATUS_CODES.BAD_REQUEST).send({
            message: 'Bad request'
        });
    }

    const newOrder = new Order({
        ...body,
        date: Date.now()
    });

    newOrder.save()
        .then(data => {
            res.status(STATUS_CODES.CREATED).send(data);
        })
        .catch(err => {
            res.status(STATUS_CODES.ERROR).send({
                message: err.message
            });
        });
};

// Edit an order identified by the id in the request
exports.edit = (req, res) => {
    const { params, body } = req;
    const { orderId } = params;
    const { status } = body;

    if (!orderId || !status) {
        return res.status(STATUS_CODES.BAD_REQUEST).send({
            message: "Bad request"
        });
    }

    Order.findByIdAndUpdate(orderId, {
        status
    }, { new: true })
        .then(order => {
            if (!order) {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message: `Order with id:${orderId} not found`
                });
            }

            res.status(STATUS_CODES.OK).send(order);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message: `Order with id:${orderId} not found`
                });
            }

            return res.status(STATUS_CODES.ERROR).send({
                message: `Error updating order with id:${orderId}`
            });
        });
};

// Delete a order with the specified id in the request
exports.delete = (req, res) => {
    const { params: { orderId } } = req;

    Order.findByIdAndRemove(orderId)
        .then(order => {
            if (!order) {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message: `Order with id:${orderId} not found`
                });
            }

            res.status(STATUS_CODES.OK).send({ message: "Order deleted successfully!" });
        })
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    message: `Order with id:${orderId} not found`
                });
            }

            return res.status(STATUS_CODES.ERROR).send({
                message: `Error deleting order with id:${orderId}`
            });
        });
};