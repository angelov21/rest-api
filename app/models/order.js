const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const OrderSchema = mongoose.Schema({
    _id: Number,
    status: String,
    products: [ Number ],
    date: Date
}, { 
    _id: false,
    versionKey: false
});

OrderSchema.plugin(autoIncrement, { id: 'order_seq', inc_field: '_id'});

module.exports = mongoose.model('Order', OrderSchema);
